/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { MBR } from '../Geometry/MBR/mbr'
import type { RTree } from '../RTree/RTree/RTree'
import { type RTreeNode } from '../RTree/RTreeNode/RTreeNode'
import type { Entry } from '../RTree/entry'

// Функция для проверки наличия пересечения между MBR и всеми объектами в R-дереве
// +++
export function hasAnyIntersection (mbr: MBR, rtree: RTree): boolean {
  return searchTree(rtree.root, mbr).length > 0
}

// Функция для проверки пересечения между двумя MBR
export function hasIntersectionWith (mbr1: MBR, mbr2: MBR): boolean {
  return mbr1.intersects(mbr2)
}

// Функция для поиска всех идентификаторов объектов, пересекающихся с данным MBR
export function findIntersectingObjects (mbr: MBR, rtree: RTree): number[] {
  return searchTree(rtree.root, mbr).map(entry => entry.recordId!)
}

// Вспомогательная функция для поиска пересекающихся записей в дереве
function searchTree (node: RTreeNode, mbr: MBR): Entry[] {
  const intersectingEntries: Entry[] = []

  for (const entry of node.entries) {
    if (entry.mbr.intersects(mbr)) {
      if (node.isLeaf) {
        intersectingEntries.push(entry)
      } else if (entry.child) {
        intersectingEntries.push(...searchTree(entry.child, mbr))
      }
    }
  }

  return intersectingEntries
}
