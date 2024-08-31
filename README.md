# Геометрическая Библиотека для Определения Пересечений

## Описание

Эта библиотека предоставляет API для эффективного определения пересечений и положения объектов в двумерном пространстве. Библиотека использует R-дерево для быстрого поиска и управления геометрическими объектами, такими как прямоугольники и треугольники. Основные возможности включают:

- Проверка пересечений между объектами
- Нахождение объектов выше или ниже заданного объекта
- Поиск объектов внутри определенной области

Библиотека предназначена для работы с различными геометрическими фигурами и может обрабатывать большие объемы данных в реальном времени.

## Примеры использования

### Инициализируем R-дерево с картой высот 100x100
```typescript
const rtree = new RTree(4, [100, 100])
```

### Инициализируем R-дерево с картой высот 100x100. Передаем начальное количество записей
```typescript
const rtree = new RTree([100, 100]) 
```

### Создаем геометрические объекты
```typescript
const rect1 = new Rectangle(new MBR(0, 0, 10, 10))
const rect2 = new Rectangle(new MBR(15, 15, 25, 25))
const rect3 = new Rectangle(new MBR(5, 5, 15, 15))
const triangle1 = new Triangle([{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 3, y: 4 }])
const triangle2 = new Triangle([{ x: 3, y: 4 }, { x: 7, y: 4 }, { x: 5, y: 6 }])
const triangle3 = new Triangle([{ x: 20, y: 20 }, { x: 22, y: 22 }, { x: 21, y: 25 }])
const triangle4 = new Triangle([{ x: 0, y: 5 }, { x: 0, y: 10 }, { x: 4, y: 7 }])
```

### Вставляем объекты в R-дерево
```typescript
rtree.insert(rect1, 1)
console.log(rect1)
rtree.insert(rect2, 2)
rtree.insert(triangle1, 3)
rtree.insert(triangle2, 4)
rtree.insert(triangle3, 5)
rtree.insert(rect3, 6)
rtree.insert(triangle4, 7)
``

### Пример 1: Использование функции hasAnyIntersection
```typescript
const queryMBR1 = new MBR(0, 0, 5, 5)
const queryMBR2 = new MBR(5, 5, 10, 10)
const queryMBR3 = new MBR(75, 75, 85, 85)
```

### Проверяем, пересекается ли какой-либо объект в R-дереве с queryMBR1
```typescript
const hasIntersection = hasAnyIntersection(queryMBR1, rtree)
console.log(`Есть ли пересечение с MBR1? ${hasIntersection}`)
```

### Пример 2: Использование функции findIntersectingObjects
```typescript
const intersectingIds = findIntersectingObjects(queryMBR1, rtree)
console.log(`Идентификаторы пересекающихся объектов MBR1: ${intersectingIds}`)
const intersectingIds2 = findIntersectingObjects(queryMBR2, rtree)
console.log(`Идентификаторы пересекающихся объектов MBR2: ${intersectingIds2}`)
```

### Пример 3: Использование функции findObjectsAbove
```typescript
const objectsAbove = findObjectsAbove(rect1, rtree) 
console.log(`Идентификаторы объектов выше прямоугольника 1: ${objectsAbove}`)
```

### Пример 4: Использование функции findObjectsBelow
```typescript
const objectsBelow = findObjectsBelow(rect2, rtree) 
console.log(`Идентификаторы объектов ниже прямоугольника 2: ${objectsBelow}`)
```

### Пример 5 Проверяем пересечение двух треугольников
```typescript
const doTrianglesIntersectResult = doTrianglesIntersect(triangle1, triangle2)
console.log(`triangle1 и triangle2 пересекаются: ${doTrianglesIntersectResult}`) 
```
