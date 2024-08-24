/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { RTree } from './RTree/RTree/RTree'
import { Rectangle } from './Geometry/Rectangle/rectangle'
import { Triangle } from './Geometry/Triangle/triangle'
import { MBR } from './Geometry/MBR/mbr'
import { findIntersectingObjects, hasAnyIntersection } from './API/intersection'
import { doTrianglesIntersect } from './Geometry/Triangle/triangleUtils'
import { findObjectsAbove, findObjectsBelow, findObjectsWithin } from './API/positionInterSection'

// Инициализируем R-дерево с картой высот 100x100
const rtree = new RTree(4, [100, 100])

// Создаем геометрические объекты
const rect1 = new Rectangle(new MBR(0, 0, 10, 10))
const rect2 = new Rectangle(new MBR(15, 15, 25, 25))
const triangle1 = new Triangle([{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 3, y: 4 }])
const triangle2 = new Triangle([{ x: 3, y: 4 }, { x: 7, y: 4 }, { x: 5, y: 6 }])
const triangle3 = new Triangle([{ x: 20, y: 20 }, { x: 22, y: 22 }, { x: 21, y: 25 }])

// Вставляем объекты в R-дерево
rtree.insert(rect1, 1)
rtree.insert(rect2, 2)
rtree.insert(triangle1, 3)
rtree.insert(triangle2, 4)
rtree.insert(triangle3, 5)

// Создаем объект для проверки пересечений
const testMBR = new MBR(0, 0, 5, 5)

// Проверяем наличие пересечений с объектами в дереве
const intersectionExists = hasAnyIntersection(testMBR, rtree)
console.log(`Есть пересечения: ${intersectionExists}`) // true

// Находим все идентификаторы объектов, пересекающихся с testMBR
const intersectingObjects = findIntersectingObjects(testMBR, rtree)
console.log(`Идентификаторы пересекающихся объектов: ${intersectingObjects}`)

// Проверяем пересечение двух треугольников
const doTrianglesIntersectResult = doTrianglesIntersect(triangle1, triangle2)
console.log(`triangle1 и triangle2 пересекаются: ${doTrianglesIntersectResult}`) // true

// Находим объекты выше и ниже заданного прямоугольника
const objectsAbove = findObjectsAbove(rect2, rtree)
console.log(`Объекты выше rect2: ${objectsAbove}`)

const objectsBelow = findObjectsBelow(rect2, rtree)
console.log(`Объекты ниже rect2: ${objectsBelow}`)

// Находим все объекты внутри определенной области
const objectsWithin = findObjectsWithin(testMBR, rtree)
console.log(`Объекты внутри testMBR: ${objectsWithin}`)
