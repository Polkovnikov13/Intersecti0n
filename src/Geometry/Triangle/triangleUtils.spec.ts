import { doTrianglesIntersect } from './triangleUtils'
import { Triangle } from './triangle'
import { describe, expect, test } from '@jest/globals'

describe('doTrianglesIntersect', () => {
  test('should return true for intersecting triangles', () => {
    const triangle1 = new Triangle([{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 0, y: 5 }])
    const triangle2 = new Triangle([{ x: 2, y: 2 }, { x: 7, y: 2 }, { x: 2, y: 7 }])

    expect(doTrianglesIntersect(triangle1, triangle2)).toBe(true)
  })

  test('should return false for non-intersecting triangles', () => {
    const triangle1 = new Triangle([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }])
    const triangle2 = new Triangle([{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }])

    expect(doTrianglesIntersect(triangle1, triangle2)).toBe(false)
  })

  test('should return true when one triangle is completely inside another', () => {
    const outerTriangle = new Triangle([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 10 }])
    const innerTriangle = new Triangle([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }])

    expect(doTrianglesIntersect(outerTriangle, innerTriangle)).toBe(true)
  })

  test('should return true when triangles only touch at edges', () => {
    const triangle1 = new Triangle([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }])
    const triangle2 = new Triangle([{ x: 2, y: 0 }, { x: 4, y: 0 }, { x: 3, y: 1 }])

    expect(doTrianglesIntersect(triangle1, triangle2)).toBe(true)
  })

  test('should return false for disjoint triangles with no intersection or touching', () => {
    const triangle1 = new Triangle([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }])
    const triangle2 = new Triangle([{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 6 }])

    expect(doTrianglesIntersect(triangle1, triangle2)).toBe(false)
  })
})
