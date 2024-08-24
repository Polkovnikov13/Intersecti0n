import { type Triangle } from './triangle'

// Функция для проверки пересечения двух треугольников
export function doTrianglesIntersect (triangle1: Triangle, triangle2: Triangle): boolean {
  const triangle1Vertices = triangle1.getVertices()
  const triangle2Vertices = triangle2.getVertices()

  // Функция для проверки пересечения двух отрезков
  function doSegmentsIntersect (p1: { x: number, y: number }, p2: { x: number, y: number }, q1: { x: number, y: number }, q2: { x: number, y: number }): boolean {
    const det = (p2.x - p1.x) * (q2.y - q1.y) - (p2.y - p1.y) * (q2.x - q1.x)
    if (det === 0) return false

    const lambda = ((q2.y - q1.y) * (q2.x - p1.x) + (q1.x - q2.x) * (q2.y - p1.y)) / det
    const gamma = ((p1.y - p2.y) * (q2.x - p1.x) + (p2.x - p1.x) * (q2.y - p1.y)) / det

    return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1)
  }

  // Проверка пересечений сторон треугольников
  const edges1 = [
    { p1: triangle1Vertices[0], p2: triangle1Vertices[1] },
    { p1: triangle1Vertices[1], p2: triangle1Vertices[2] },
    { p1: triangle1Vertices[2], p2: triangle1Vertices[0] }
  ]

  const edges2 = [
    { p1: triangle2Vertices[0], p2: triangle2Vertices[1] },
    { p1: triangle2Vertices[1], p2: triangle2Vertices[2] },
    { p1: triangle2Vertices[2], p2: triangle2Vertices[0] }
  ]

  // Пересечение сторон
  for (const edge1 of edges1) {
    for (const edge2 of edges2) {
      if (doSegmentsIntersect(edge1.p1, edge1.p2, edge2.p1, edge2.p2)) {
        return true
      }
    }
  }

  // Проверка, находится ли вершина одного треугольника внутри другого
  for (const v of triangle1Vertices) {
    if (isPointInTriangle(v.x, v.y, triangle2Vertices[0], triangle2Vertices[1], triangle2Vertices[2])) {
      return true
    }
  }

  for (const v of triangle2Vertices) {
    if (isPointInTriangle(v.x, v.y, triangle1Vertices[0], triangle1Vertices[1], triangle1Vertices[2])) {
      return true
    }
  }

  return false
}

// Функция для проверки, находится ли точка внутри треугольника
function isPointInTriangle (px: number, py: number, v1: { x: number, y: number }, v2: { x: number, y: number }, v3: { x: number, y: number }): boolean {
  const alpha = ((v2.y - v3.y) * (px - v3.x) + (v3.x - v2.x) * (py - v3.y)) /
                ((v2.y - v3.y) * (v1.x - v3.x) + (v3.x - v2.x) * (v1.y - v3.y))
  const beta = ((v3.y - v1.y) * (px - v3.x) + (v1.x - v3.x) * (py - v3.y)) /
               ((v2.y - v3.y) * (v1.x - v3.x) + (v3.x - v2.x) * (v1.y - v3.y))
  const gamma = 1 - alpha - beta

  return (alpha >= 0) && (beta >= 0) && (gamma >= 0)
}
