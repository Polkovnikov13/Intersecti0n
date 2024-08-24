import { RTree } from './RTree'
import { MBR } from '../../Geometry/MBR/mbr'
import { RTreeNode } from '../RTreeNode/RTreeNode'
import { Rectangle } from '../../Geometry/Rectangle/rectangle'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('RTree', () => {
  let rtree: RTree

  beforeEach(() => {
    rtree = new RTree(4, [100, 100])
  })

  test('adjustTree should properly adjust the tree after insertion', () => {
    const root = rtree.root
    const node1 = new RTreeNode(true, rtree.maxEntries, rtree.minEntries)
    const node2 = new RTreeNode(true, rtree.maxEntries, rtree.minEntries)

    root.entries.push({ mbr: new MBR(0, 0, 10, 10), child: node1 })
    root.entries.push({ mbr: new MBR(10, 10, 20, 20), child: node2 })

    rtree.adjustTree(root, node1, node2)

    expect(root.entries.length).toBe(2)
    expect(root.entries[0].child).toBe(node1)
    expect(root.entries[1].child).toBe(node2)
  })

  test('splitNode should properly split the node', () => {
    const node = new RTreeNode(false, rtree.maxEntries, rtree.minEntries)
    for (let i = 0; i < 10; i++) {
      node.addEntry({ mbr: new MBR(i, i, i + 1, i + 1), recordId: i })
    }

    const [left, right] = rtree.splitNode(node)

    expect(left.entries.length).toBe(5)
    expect(right.entries.length).toBe(5)
    expect(left.entries[0].mbr.minX).toBe(0)
    expect(right.entries[0].mbr.minX).toBe(5)
  })

  test('delete should properly remove an entry from the RTree', () => {
    const mbr = new MBR(0, 0, 10, 10)
    const recordId = 1
    rtree.insert(new Rectangle(mbr), recordId)

    rtree.delete(mbr, recordId)

    const entries = rtree.findNode(rtree.root, mbr, recordId)
    expect(entries).toBeNull()
  })
})
