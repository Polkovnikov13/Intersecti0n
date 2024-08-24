import { Matrix } from './matrix';
import { beforeEach, describe, expect, it } from "@jest/globals";

describe('Matrix', () => {
  let matrix2D: Matrix<Int32Array>;

  beforeEach(() => {
    matrix2D = new Matrix(Int32Array, 3, 3);
    matrix2D.set(0, 0, 1);
    matrix2D.set(0, 1, 2);
    matrix2D.set(0, 2, 3);
    matrix2D.set(1, 0, 4);
    matrix2D.set(1, 1, 5);
    matrix2D.set(1, 2, 6);
    matrix2D.set(2, 0, 7);
    matrix2D.set(2, 1, 8);
    matrix2D.set(2, 2, 9);
  });

  it('should create a matrix with the correct dimensions and set/get values', () => {
    expect(matrix2D.get(0, 0)).toBe(1);
    expect(matrix2D.get(0, 1)).toBe(2);
    expect(matrix2D.get(0, 2)).toBe(3);
    expect(matrix2D.get(1, 0)).toBe(4);
    expect(matrix2D.get(1, 1)).toBe(5);
    expect(matrix2D.get(1, 2)).toBe(6);
    expect(matrix2D.get(2, 0)).toBe(7);
    expect(matrix2D.get(2, 1)).toBe(8);
    expect(matrix2D.get(2, 2)).toBe(9);
  });

  it('should correctly calculate mapping and iterate values', () => {
    const expectedValues = [1, 4, 7, 2, 5, 8, 3, 6, 9];
    expect(Array.from(matrix2D.values())).toEqual(expectedValues);
  });

  it('should throw an error when setting or getting with incorrect dimensions', () => {
    const matrix = new Matrix(Int32Array, 3, 3);
    expect(() => matrix.get(0)).toThrow(TypeError);
    expect(() => matrix.get(0, 0, 0)).toThrow(TypeError);
    expect(() => matrix.set(0, 0, 0, 1)).toThrow(TypeError);
  });

  it('should support Int16Array', () => {
    const matrixInt16 = new Matrix(Int16Array, 2, 2);

    matrixInt16.set(0, 0, -32768);
    matrixInt16.set(0, 1, 32767);
    matrixInt16.set(1, 0, 12345);
    matrixInt16.set(1, 1, -12345);

    expect(matrixInt16.get(0, 0)).toBe(-32768);
    expect(matrixInt16.get(0, 1)).toBe(32767);
    expect(matrixInt16.get(1, 0)).toBe(12345);
    expect(matrixInt16.get(1, 1)).toBe(-12345);
  });

  it('should support Uint32Array', () => {
    const matrixUint32 = new Matrix(Uint32Array, 2, 2);

    matrixUint32.set(0, 0, 0);
    matrixUint32.set(0, 1, 4294967295);
    matrixUint32.set(1, 0, 123456789);
    matrixUint32.set(1, 1, 987654321);

    expect(matrixUint32.get(0, 0)).toBe(0);
    expect(matrixUint32.get(0, 1)).toBe(4294967295);
    expect(matrixUint32.get(1, 0)).toBe(123456789);
    expect(matrixUint32.get(1, 1)).toBe(987654321);
  });
});

