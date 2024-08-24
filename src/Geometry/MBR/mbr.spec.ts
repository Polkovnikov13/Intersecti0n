import { describe, expect, test } from '@jest/globals'
import { MBR } from './mbr'

describe('MBR', () => {
  test('intersects should return true for overlapping MBRs', () => {
    const mbr1 = new MBR(0, 0, 5, 5)
    const mbr2 = new MBR(4, 4, 10, 10)

    expect(mbr1.intersects(mbr2)).toBe(true)
  })

  test('intersects should return false for non-overlapping MBRs', () => {
    const mbr1 = new MBR(0, 0, 5, 5)
    const mbr2 = new MBR(6, 6, 10, 10)

    expect(mbr1.intersects(mbr2)).toBe(false)
  })

  test('combine should correctly combine two MBRs', () => {
    const mbr1 = new MBR(0, 0, 5, 5)
    const mbr2 = new MBR(3, 3, 7, 7)

    const combined = MBR.combine(mbr1, mbr2)
    expect(combined.minX).toBe(0)
    expect(combined.minY).toBe(0)
    expect(combined.maxX).toBe(7)
    expect(combined.maxY).toBe(7)
  })

  test('area should correctly calculate the area of an MBR', () => {
    const mbr = new MBR(0, 0, 5, 5)

    expect(MBR.area(mbr)).toBe(25)
  })

  test('equals should return true for identical MBRs', () => {
    const mbr1 = new MBR(0, 0, 5, 5)
    const mbr2 = new MBR(0, 0, 5, 5)

    expect(mbr1.equals(mbr2)).toBe(true)
  })

  test('equals should return false for different MBRs', () => {
    const mbr1 = new MBR(0, 0, 5, 5)
    const mbr2 = new MBR(1, 1, 6, 6)

    expect(mbr1.equals(mbr2)).toBe(false)
  })
})
