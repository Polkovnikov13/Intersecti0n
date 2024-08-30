// /* eslint-disable @typescript-eslint/strict-boolean-expressions */
// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import type { MBR } from '../Geometry/MBR/mbr'
// import type { RTree } from '../RTree/RTree/RTree'
// import { type RTreeNode } from '../RTree/RTreeNode/RTreeNode'
// import type { Entry } from '../RTree/entry'
// import type { Geometry } from '../Geometry/geometry'

// // Функция для нахождения объектов выше заданного объекта
// export function findObjectsAbove (object: Geometry, rtree: RTree): number[] {
//   const mbr = object.getMBR()
//   return searchTreeAbove(rtree.root, mbr).map(entry => entry.recordId!)
// }

// // Функция для нахождения объектов ниже заданного объекта
// export function findObjectsBelow (object: Geometry, rtree: RTree): number[] {
//   const mbr = object.getMBR()
//   return searchTreeBelow(rtree.root, mbr).map(entry => entry.recordId!)
// }

// // Функция для нахождения всех объектов внутри заданного MBR
// export function findObjectsWithin (mbr: MBR, rtree: RTree): number[] {
//   return searchTree(rtree.root, mbr).map(entry => entry.recordId!)
// }

// // Вспомогательная функция для поиска объектов выше
// function searchTreeAbove (node: RTreeNode, mbr: MBR): Entry[] {
//   const intersectingEntries: Entry[] = []
//   for (const entry of node.entries) {
//     if (entry.mbr.maxY > mbr.minY) {
//       if (node.isLeaf) {
//         intersectingEntries.push(entry)
//       } else if (entry.child) {
//         intersectingEntries.push(...searchTreeAbove(entry.child, mbr))
//       }
//     }
//   }
//   return intersectingEntries
// }

// // Вспомогательная функция для поиска объектов ниже
// function searchTreeBelow (node: RTreeNode, mbr: MBR): Entry[] {
//   const intersectingEntries: Entry[] = []
//   for (const entry of node.entries) {
//     if (entry.mbr.minY < mbr.maxY) {
//       if (node.isLeaf) {
//         intersectingEntries.push(entry)
//       } else if (entry.child) {
//         intersectingEntries.push(...searchTreeBelow(entry.child, mbr))
//       }
//     }
//   }
//   return intersectingEntries
// }

// // Вспомогательная функция для поиска объектов внутри MBR
// function searchTree (node: RTreeNode, mbr: MBR): Entry[] {
//   const intersectingEntries: Entry[] = []
//   for (const entry of node.entries) {
//     if (entry.mbr.intersects(mbr)) {
//       if (node.isLeaf) {
//         intersectingEntries.push(entry)
//       } else if (entry.child) {
//         intersectingEntries.push(...searchTree(entry.child, mbr))
//       }
//     }
//   }
//   return intersectingEntries
// }
