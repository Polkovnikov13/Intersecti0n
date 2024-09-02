/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { RTree } from './RTree/RTree/RTree'
import { Rectangle } from './Geometry/Rectangle/rectangle'
import { Triangle } from './Geometry/Triangle/triangle'
import { MBR } from './Geometry/MBR/mbr'
import { findIntersectingObjects, hasAnyIntersection, findObjectsAbove, findObjectsBelow } from './API/intersection'
import { doTrianglesIntersect } from './Geometry/Triangle/triangleUtils'

// Инициализируем R-дерево с картой высот 100x100
const rtree = new RTree([100, 100]) // Передаем начальное количество записей

// Создаем геометрические объекты
const rect1 = new Rectangle(new MBR(0, 0, 10, 10))
const rect2 = new Rectangle(new MBR(15, 15, 25, 25))
const rect3 = new Rectangle(new MBR(5, 5, 15, 15))
const triangle1 = new Triangle([{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 3, y: 4 }])
const triangle2 = new Triangle([{ x: 3, y: 4 }, { x: 7, y: 4 }, { x: 5, y: 6 }])
const triangle3 = new Triangle([{ x: 20, y: 20 }, { x: 22, y: 22 }, { x: 21, y: 25 }])
const triangle4 = new Triangle([{ x: 0, y: 5 }, { x: 0, y: 10 }, { x: 4, y: 7 }])

// Вставляем объекты в R-дерево
rtree.insert(rect1, 1)
console.log(rect1)
rtree.insert(rect2, 2)
rtree.insert(triangle1, 3)
rtree.insert(triangle2, 4)
rtree.insert(triangle3, 5)
rtree.insert(rect3, 6)
rtree.insert(triangle4, 7)

// Пример 1: Использование функции hasAnyIntersection
const queryMBR1 = new MBR(0, 0, 5, 5)
const queryMBR2 = new MBR(5, 5, 10, 10)
const queryMBR3 = new MBR(75, 75, 85, 85)

// Проверяем, пересекается ли какой-либо объект в R-дереве с queryMBR1
const hasIntersection = hasAnyIntersection(queryMBR1, rtree)
console.log(`Есть ли пересечение с MBR1? ${hasIntersection}`)

// Проверяем, пересекается ли какой-либо объект в R-дереве с queryMBR2
const hasIntersection2 = hasAnyIntersection(queryMBR2, rtree)
console.log(`Есть ли пересечение с MBR2? ${hasIntersection2}`)

// Проверяем, пересекается ли какой-либо объект в R-дереве с queryMBR3
const hasIntersection3 = hasAnyIntersection(queryMBR3, rtree)
console.log(`Есть ли пересечение с MBR3? ${hasIntersection3}`)

// Пример 2: Использование функции findIntersectingObjects
const intersectingIds = findIntersectingObjects(queryMBR1, rtree)
console.log(`Идентификаторы пересекающихся объектов MBR1: ${intersectingIds}`)

const intersectingIds2 = findIntersectingObjects(queryMBR2, rtree)
console.log(`Идентификаторы пересекающихся объектов MBR2: ${intersectingIds2}`)

// Пример 3: Использование функции findObjectsAbove
const objectsAbove = findObjectsAbove(rect1, rtree)
console.log(`Идентификаторы объектов выше прямоугольника 1: ${objectsAbove}`)

// Пример 4: Использование функции findObjectsBelow
const objectsBelow = findObjectsBelow(rect2, rtree)
console.log(`Идентификаторы объектов ниже прямоугольника 2: ${objectsBelow}`)

// Пример 5 Проверяем пересечение двух треугольников
const doTrianglesIntersectResult = doTrianglesIntersect(triangle1, triangle2)
console.log(`triangle1 и triangle2 пересекаются: ${doTrianglesIntersectResult}`)
