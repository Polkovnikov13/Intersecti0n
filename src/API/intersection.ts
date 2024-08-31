import type { MBR } from '../Geometry/MBR/mbr'
import type { RTree } from '../RTree/RTree/RTree'
import { type RTreeNode } from '../RTree/RTreeNode/RTreeNode'
import type { Entry } from '../RTree/entry'
import type { Geometry } from '../Geometry/geometry'

// Функция для проверки наличия пересечения между MBR и всеми объектами в R-дереве
export function hasAnyIntersection (mbr: MBR, rtree: RTree): boolean {
  return searchTree(rtree.root, mbr, () => true).length > 0
}

// Функция для проверки пересечения между двумя MBR
export function hasIntersectionWith (mbr1: MBR, mbr2: MBR): boolean {
  return mbr1.intersects(mbr2)
}

// Функция для поиска всех идентификаторов объектов, пересекающихся с данным MBR
export function findIntersectingObjects (mbr: MBR, rtree: RTree): number[] {
  return searchTree(rtree.root, mbr, entry => entry.mbr.intersects(mbr)).map(entry => entry.recordId!)
}

// Функция для нахождения объектов выше заданного объекта
export function findObjectsAbove(object: Geometry, rtree: RTree): number[] {
  const mbr = object.getMBR();
  const objectId = rtree.findRecordIdByMBR(mbr);
  
  if (objectId === null) {
    return []; // Возвращаем пустой массив, если объект не найден
  }

  return searchTree(rtree.root, mbr, entry => entry.mbr.minY >= mbr.maxY && entry.recordId !== objectId).map(entry => entry.recordId!);
}

// Функция для нахождения объектов ниже заданного объекта
export function findObjectsBelow(object: Geometry, rtree: RTree): number[] {
  const mbr = object.getMBR();
  const objectId = rtree.findRecordIdByMBR(mbr);
  
  if (objectId === null) {
    return []; // Возвращаем пустой массив, если объект не найден
  }

  return searchTree(rtree.root, mbr, entry => entry.mbr.maxY <= mbr.minY && entry.recordId !== objectId).map(entry => entry.recordId!);
}

// Универсальная функция для поиска объектов в дереве с заданным условием
function searchTree(node: RTreeNode, mbr: MBR, condition: (entry: Entry) => boolean): Entry[] {
  const results: Entry[] = [];
  for (const entry of node.entries) {
    if (condition(entry)) {
      if (node.isLeaf) {
        results.push(entry);
      } else if (entry.child) {
        results.push(...searchTree(entry.child, mbr, condition));
      }
    }
  }
  return results;
}
