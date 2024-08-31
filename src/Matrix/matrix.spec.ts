import { Matrix } from './matrix'
import { beforeEach, describe, expect, it } from '@jest/globals'

describe('Matrix', () => {
  let matrix2D: Matrix<Int32Array>

  beforeEach(() => {
    matrix2D = new Matrix(Int32Array, 3, 3)
    matrix2D.set(1, 0, 0)
    matrix2D.set(2, 0, 1)
    matrix2D.set(3, 0, 2)
    matrix2D.set(4, 1, 0)
    matrix2D.set(5, 1, 1)
    matrix2D.set(6, 1, 2)
    matrix2D.set(7, 2, 0)
    matrix2D.set(8, 2, 1)
    matrix2D.set(9, 2, 2)
  })

  it('should create a matrix with the correct dimensions and set/get values', () => {
    expect(matrix2D.get(0, 0)).toBe(1)
    expect(matrix2D.get(0, 1)).toBe(2)
    expect(matrix2D.get(0, 2)).toBe(3)
    expect(matrix2D.get(1, 0)).toBe(4)
    expect(matrix2D.get(1, 1)).toBe(5)
    expect(matrix2D.get(1, 2)).toBe(6)
    expect(matrix2D.get(2, 0)).toBe(7)
    expect(matrix2D.get(2, 1)).toBe(8)
    expect(matrix2D.get(2, 2)).toBe(9)
  })

  it('should correctly calculate mapping and iterate values', () => {
    const expectedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    expect(Array.from(matrix2D.values())).toEqual(expectedValues)
  })

  it('should throw an error when setting or getting with incorrect dimensions', () => {
    const matrix = new Matrix(Int32Array, 3, 3)
    expect(() => matrix.get(0)).toThrow(Error)
    expect(() => matrix.get(0, 0, 0)).toThrow(Error)
    expect(() => { matrix.set(0, 0, 0, 1) }).toThrow(Error)
  })

  it('should support Int16Array', () => {
    const matrixInt16 = new Matrix(Int16Array, 2, 2)

    matrixInt16.set(-32768, 0, 0)
    matrixInt16.set(32767, 0, 1)
    matrixInt16.set(12345, 1, 0)
    matrixInt16.set(-12345, 1, 1)

    expect(matrixInt16.get(0, 0)).toBe(-32768)
    expect(matrixInt16.get(0, 1)).toBe(32767)
    expect(matrixInt16.get(1, 0)).toBe(12345)
    expect(matrixInt16.get(1, 1)).toBe(-12345)
  })

  it('should support Uint32Array', () => {
    const matrixUint32 = new Matrix(Uint32Array, 2, 2)

    matrixUint32.set(0, 0, 0)
    matrixUint32.set(4294967295, 0, 1)
    matrixUint32.set(123456789, 1, 0)
    matrixUint32.set(987654321, 1, 1)

    expect(matrixUint32.get(0, 0)).toBe(0)
    expect(matrixUint32.get(0, 1)).toBe(4294967295)
    expect(matrixUint32.get(1, 0)).toBe(123456789)
    expect(matrixUint32.get(1, 1)).toBe(987654321)
  })
})
