# Геометрическая Библиотека для Определения Пересечений

## Описание

Эта библиотека предоставляет API для эффективного определения пересечений и положения объектов в двумерном пространстве. Библиотека использует R-дерево для быстрого поиска и управления геометрическими объектами, такими как прямоугольники и треугольники. Основные возможности включают:

- Проверка пересечений между объектами
- Нахождение объектов выше или ниже заданного объекта
- Поиск объектов внутри определенной области

Библиотека предназначена для работы с различными геометрическими фигурами и может обрабатывать большие объемы данных в реальном времени.

```typescript
import { RTree } from './RTree/RTree/RTree'
import { Rectangle } from './Geometry/Rectangle/rectangle'
import { Triangle } from './Geometry/Triangle/triangle'
import { MBR } from './Geometry/MBR/mbr'
import { findIntersectingObjects, hasAnyIntersection, hasIntersectionWith } from './API/intersection'
import { doTrianglesIntersect } from './Geometry/Triangle/triangleUtils'
```
### Инициализируем R-дерево с картой высот 100x100
```typescript
const rtree = new RTree(4, [100, 100])
```
### Создаем геометрические объекты
```typescript
const rect1 = new Rectangle(new MBR(0, 0, 10, 10))
const rect2 = new Rectangle(new MBR(15, 15, 25, 25))
const triangle1 = new Triangle([{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 3, y: 4 }])
const triangle2 = new Triangle([{ x: 3, y: 4 }, { x: 7, y: 4 }, { x: 5, y: 6 }])
const triangle3 = new Triangle([{ x: 20, y: 20 }, { x: 22, y: 22 }, { x: 21, y: 25 }])
```

### Вставляем объекты в R-дерево
```typescript
rtree.insert(rect1, 1)
rtree.insert(rect2, 2)
rtree.insert(triangle1, 3)
rtree.insert(triangle2, 4)
rtree.insert(triangle3, 5)
```

### Пример 1: Использование функции hasAnyIntersection
### Создаем MBR для проверки пересечений
```typescript
const queryMBR1 = new MBR(0, 0, 5, 5)
```
### Проверяем, пересекается ли какой-либо объект в R-дереве с queryMBR1
```typescript
const hasIntersection = hasAnyIntersection(queryMBR1, rtree)
console.log(`Есть ли пересечение с MBR? ${hasIntersection}`)
```
### Результат: Есть ли пересечение с MBR? true


### Пример 2: Использование функции findIntersectingObjects
### Поиск пересекающихся объектов
### Находим все идентификаторы объектов, пересекающихся с queryMBR2
```typescript
const intersectingIds = findIntersectingObjects(queryMBR1, rtree)
console.log(`Идентификаторы пересекающихся объектов: ${intersectingIds}`)
```
### Результат: Идентификаторы пересекающихся объектов: [1, 3, 4]


### Пример 3: Использование функции hasIntersectionWith
### Определяем два MBR для проверки их пересечения
```typescript
const mbr1 = new MBR(0, 0, 10, 10)
const mbr2 = new MBR(5, 5, 15, 15)
const mbr3 = new MBR(15, 15, 25, 25)
```
### Проверяем, пересекается ли mbr1 с mbr2
```typescript
const intersection1 = hasIntersectionWith(mbr1, mbr2)
console.log(`Пересекаются ли mbr1 и mbr2? ${intersection1}`)
```
### Результат: Пересекаются ли mbr1 и mbr2? true

### Проверяем, пересекается ли mbr1 с mbr3
```typescript
const intersection2 = hasIntersectionWith(mbr2, mbr3)
console.log(`Пересекаются ли mbr1 и mbr3? ${intersection2}`)
```
### Результат: Пересекаются ли mbr1 и mbr3? false


### Пример 3: Использование функции doTrianglesIntersect
### Проверяем пересечение двух треугольников
```typescript
const doTrianglesIntersectResult = doTrianglesIntersect(triangle2, triangle3)
console.log(`triangle1 и triangle2 пересекаются: ${doTrianglesIntersectResult}`) 
```
### Результат: Пересекаются ли triangle1 и triangle2? true
