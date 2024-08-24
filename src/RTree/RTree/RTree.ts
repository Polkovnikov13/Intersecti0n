/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type Geometry } from '../../Geometry/geometry'
import { MBR } from '../../Geometry/MBR/mbr'
import { Matrix } from '../../Matrix/matrix'
import { type Entry } from '../entry'
import { RTreeNode } from '../RTreeNode/RTreeNode'

export class RTree {
  root: RTreeNode
  maxEntries: number
  minEntries: number
  heightMap: Matrix<Float32Array> // Поле для карты высот

  constructor (maxEntries: number, heightMapDimensions: [number, number]) {
    this.maxEntries = maxEntries
    this.minEntries = Math.ceil(maxEntries / 2)
    this.root = new RTreeNode(true, this.maxEntries, this.minEntries)

    // Инициализируем карту высот
    this.heightMap = new Matrix(Float32Array, ...heightMapDimensions)
  }

  insert (geometry: Geometry, recordId: number) {
    const newEntry: Entry = { mbr: geometry.getMBR(), recordId }
    const leaf = this.chooseLeaf(this.root, newEntry)
    this.insertInLeaf(leaf, newEntry)

    // Обновляем карту высот
    this.updateHeightMap(geometry)

    if (leaf.isOverflow()) {
      const [left, right] = this.splitNode(leaf)
      this.adjustTree(leaf.parent, left, right)
    } else {
      this.adjustTree(leaf.parent, leaf, null)
    }
  }

  // Пример метода для обновления карты высот
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

  // Пример метода расчета высоты (может быть изменен под задачу)
  calculateHeight (geometry: Geometry): number {
    // Расчет высоты объекта, например, по его координатам или другим параметрам
    return Math.random() * 100 // Замените на нужную логику
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
    // Проверка на случай, если parent равен null
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
        // Передаем родителя родителя, если он есть
        this.adjustTree(parent.parent, newLeft, newRight)
      }
    }
  }

  splitNode (node: RTreeNode): [RTreeNode, RTreeNode] {
    const sortedEntries = node.entries.sort((a, b) => a.mbr.minX - b.mbr.minX)
    const mid = Math.floor(sortedEntries.length / 2)

    const leftNode = new RTreeNode(node.isLeaf, this.maxEntries, this.minEntries, node.parent)
    const rightNode = new RTreeNode(node.isLeaf, this.maxEntries, this.minEntries, node.parent)

    leftNode.entries = sortedEntries.slice(0, mid)
    rightNode.entries = sortedEntries.slice(mid)

    return [leftNode, rightNode]
  }

  delete (mbr: MBR, recordId: number) {
    const node = this.findNode(this.root, mbr, recordId)

    if (!node) return

    this.removeEntry(node, mbr, recordId)
    this.adjustAfterDelete(node)
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

  // Доделать !!!
  adjustAfterDelete (node: RTreeNode) {
    // Реализация процесса корректировки после удаления
  }
}
