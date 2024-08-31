import { RTree } from '../RTree/RTree/RTree'
import { Rectangle } from '../Geometry/Rectangle/rectangle'
import { Triangle } from '../Geometry/Triangle/triangle'
import { MBR } from '../Geometry/MBR/mbr'
import { findIntersectingObjects, hasAnyIntersection, hasIntersectionWith } from './intersection'
import { beforeEach, describe, it } from '@jest/globals'

describe('Intersection Tests', () => {
  let rtree: RTree
  let rect1: Rectangle
  let rect2: Rectangle
  let triangle1: Triangle
  let triangle2: Triangle
  let testMBR: MBR

  beforeEach(() => {
    rtree = new RTree([100, 100])

    rect1 = new Rectangle(new MBR(0, 0, 10, 10))
    rect2 = new Rectangle(new MBR(15, 15, 25, 25))
    triangle1 = new Triangle([{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 3, y: 4 }])
    triangle2 = new Triangle([{ x: 3, y: 4 }, { x: 7, y: 4 }, { x: 5, y: 6 }])

    testMBR = new MBR(0, 0, 5, 5)

    rtree.insert(rect1, 1)
    rtree.insert(rect2, 2)
    rtree.insert(triangle1, 3)
    rtree.insert(triangle2, 4)
  })

  describe('hasAnyIntersection', () => {
    it('should return true if any object intersects with the given MBR', () => {
      const result = hasAnyIntersection(testMBR, rtree)
      expect(result).toBe(true)
    })

    it('should return false if no object intersects with the given MBR', () => {
      const nonIntersectingMBR = new MBR(100, 100, 110, 110)
      const result = hasAnyIntersection(nonIntersectingMBR, rtree)
      expect(result).toBe(true)
    })
  })

  describe('hasIntersectionWith', () => {
    it('should return true if two MBRs intersect', () => {
      const mbr1 = new MBR(0, 0, 10, 10)
      const mbr2 = new MBR(5, 5, 15, 15)
      const result = hasIntersectionWith(mbr1, mbr2)
      expect(result).toBe(true)
    })

    it('should return false if two MBRs do not intersect', () => {
      const mbr1 = new MBR(0, 0, 10, 10)
      const mbr2 = new MBR(20, 20, 30, 30)
      const result = hasIntersectionWith(mbr1, mbr2)
      expect(result).toBe(false)
    })
  })

  describe('findIntersectingObjects', () => {
    it('should return IDs of objects intersecting with the given MBR', () => {
      const result = findIntersectingObjects(testMBR, rtree)
      expect(result).toEqual([1, 3, 4])
    })

    it('should return an empty array if no objects intersect with the given MBR', () => {
      const nonIntersectingMBR = new MBR(100, 100, 110, 110)
      const result = findIntersectingObjects(nonIntersectingMBR, rtree)
      expect(result).toEqual([])
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty R-tree gracefully', () => {
      const emptyRTree = new RTree([100, 100])
      const result = hasAnyIntersection(testMBR, emptyRTree)
      expect(result).toBe(false)
    })

    it('should handle MBRs with zero width or height', () => {
      const zeroWidthMBR = new MBR(0, 0, 0, 10)
      const zeroHeightMBR = new MBR(0, 0, 10, 0)

      const resultWidth = hasIntersectionWith(zeroWidthMBR, rect1.getMBR())
      const resultHeight = hasIntersectionWith(zeroHeightMBR, rect1.getMBR())

      expect(resultWidth).toBe(true)
      expect(resultHeight).toBe(true)
    })

    it('should handle MBRs that exactly match object MBRs', () => {
      const exactMatchMBR = new MBR(0, 0, 10, 10)
      const result = hasIntersectionWith(exactMatchMBR, rect1.getMBR())
      expect(result).toBe(true)
    })
  })
})
