/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Geometry } from '../../Geometry/geometry'
import { MBR } from '../../Geometry/MBR/mbr'
import { Matrix } from '../../Matrix/matrix'
import { type Entry } from '../entry'
import { RTreeNode } from '../RTreeNode/RTreeNode'

function getTypedArrayForDimensions (dimensions: [number, number]): new (size: number) => Float32Array | Uint16Array {
  const [width, height] = dimensions
  return (width * height > 10000) ? Float32Array : Uint16Array
}

export class RTree {
  root: RTreeNode
  maxEntries: number
  minEntries: number
  heightMap: Matrix<Float32Array | Uint16Array>
  objectCount: number = 0

  constructor (heightMapDimensions: [number, number]) {
    this.maxEntries = 16
    this.minEntries = Math.ceil(this.maxEntries / 2)
    this.root = new RTreeNode(true, this.maxEntries, this.minEntries)
    const TypedArray = getTypedArrayForDimensions(heightMapDimensions)
    this.heightMap = new Matrix(TypedArray as any, ...heightMapDimensions)
  }

  updateEntries () {
    this.maxEntries = Math.max(16, Math.ceil(Math.log2(this.objectCount + 1)))
    this.minEntries = Math.ceil(this.maxEntries / 2)
    this.root.maxEntries = this.maxEntries
    this.root.minEntries = this.minEntries
  }

  insert (geometry: Geometry, recordId: number) {
    this.objectCount++
    this.updateEntries()
    const newEntry: Entry = { mbr: geometry.getMBR(), recordId }
    const leaf = this.chooseLeaf(this.root, newEntry)
    this.insertInLeaf(leaf, newEntry)
    this.updateHeightMap(geometry)
    if (leaf.isOverflow()) {
      const [left, right] = this.splitNode(leaf)
      this.adjustTree(leaf.parent, left, right)
    }
  }

  updateHeightMap (geometry: Geometry) {
    const mbr = geometry.getMBR()
    const height = this.calculateHeight(geometry)
    const [minX, minY, maxX, maxY] = [mbr.minX, mbr.minY, mbr.maxX, mbr.maxY]
    for (let x = Math.floor(minX); x <= Math.ceil(maxX); x++) {
      for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
        this.heightMap.set(x, y, height)
      }
    }
  }

  calculateHeight (geometry: Geometry): number {
    const height = Math.random() * 100
    return height
  }

  chooseLeaf (node: RTreeNode, entry: Entry): RTreeNode {
    if (node.isLeaf) {
      return node
    }
    const bestChild = node.entries.reduce((best, current) => {
      const bestArea = MBR.area(best.mbr)
      const currentArea = MBR.area(current.mbr)
      const enlargedMBR = MBR.combine(best.mbr, entry.mbr)
      const bestEnlargedArea = MBR.area(enlargedMBR) - bestArea
      const enlargedCurrent = MBR.combine(current.mbr, entry.mbr)
      const currentEnlargedArea = MBR.area(enlargedCurrent) - currentArea
      if (bestEnlargedArea < currentEnlargedArea ||
        (bestEnlargedArea === currentEnlargedArea && bestArea < currentArea)) {
        return best
      }
      return current
    }).child!

    return this.chooseLeaf(bestChild, entry)
  }

  insertInLeaf (leaf: RTreeNode, entry: Entry) {
    leaf.addEntry(entry)
  }

  adjustTree (parent: RTreeNode | null, left: RTreeNode, right: RTreeNode | null) {
    if (!parent) {
      const newRoot = new RTreeNode(false, this.maxEntries, this.minEntries)
      if (left.entries.length > 0) {
        newRoot.addEntry({ mbr: MBR.combine(left.entries[0].mbr, right ? right.entries[0].mbr : left.entries[0].mbr), child: left })
      }
      if (right && right.entries.length > 0) {
        newRoot.addEntry({ mbr: MBR.combine(left.entries[0].mbr, right.entries[0].mbr), child: right })
      }
      this.root = newRoot
    } else {
      if (right) {
        if (left.entries.length > 0 && right.entries.length > 0) {
          parent.addEntry({ mbr: MBR.combine(left.entries[0].mbr, right.entries[0].mbr), child: left })
          parent.addEntry({ mbr: MBR.combine(left.entries[0].mbr, right.entries[0].mbr), child: right })
        }
      } else {
        if (left.entries.length > 0) {
          parent.addEntry({ mbr: MBR.combine(left.entries[0].mbr, left.entries[0].mbr), child: left })
        }
      }

      if (parent.isOverflow()) {
        const [newLeft, newRight] = this.splitNode(parent)
        this.adjustTree(parent.parent, newLeft, newRight)
      }
    }
  }

  splitNode (node: RTreeNode): [RTreeNode, RTreeNode] {
    const entries = node.entries
    const numEntries = entries.length

    const sortedByX = [...entries].sort((a, b) => a.mbr.minX - b.mbr.minX)
    const mid = Math.floor(numEntries / 2)

    const leftNode = new RTreeNode(node.isLeaf, this.maxEntries, this.minEntries, node.parent)
    const rightNode = new RTreeNode(node.isLeaf, this.maxEntries, this.minEntries, node.parent)

    leftNode.entries = sortedByX.slice(0, mid)
    rightNode.entries = sortedByX.slice(mid)
    return [leftNode, rightNode]
  }

  delete (mbr: MBR, recordId: number) {
    const node = this.findNode(this.root, mbr, recordId)
    if (!node) return
    this.removeEntry(node, mbr, recordId)
    this.adjustAfterDelete(node)
    this.objectCount--
    this.updateEntries()
  }

  findNode (node: RTreeNode, mbr: MBR, recordId: number): RTreeNode | null {
    if (node.isLeaf) {
      return node.entries.find(entry => entry.mbr.equals(mbr) && entry.recordId === recordId) ? node : null
    }

    for (const entry of node.entries) {
      if (entry.child && entry.mbr.intersects(mbr)) {
        const found = this.findNode(entry.child, mbr, recordId)
        if (found) return found
      }
    }

    return null
  }

  removeEntry (node: RTreeNode, mbr: MBR, recordId: number) {
    node.entries = node.entries.filter(entry => !(entry.mbr.equals(mbr) && entry.recordId === recordId))
  }

  adjustAfterDelete (node: RTreeNode) {
    // Доделать
  }

  findRecordIdByMBR (mbr: MBR): number | null {
    const found = this.searchTree(this.root, mbr, entry => entry.mbr.equals(mbr))
    return found.length > 0 ? found[0].recordId || null : null
  }

  private searchTree (node: RTreeNode, mbr: MBR, condition: (entry: Entry) => boolean): Entry[] {
    const results: Entry[] = []
    for (const entry of node.entries) {
      if (condition(entry)) {
        if (node.isLeaf) {
          results.push(entry)
        } else if (entry.child) {
          results.push(...this.searchTree(entry.child, mbr, condition))
        }
      }
    }
    return results
  }
}
