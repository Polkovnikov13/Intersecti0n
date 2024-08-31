type TypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array
  | BigUint64Array
  | BigInt64Array

export class Matrix<T extends TypedArray> {
  private data: T
  private readonly dimensions: number[]

  constructor (TypedArray: new (size: number) => T, ...dimensions: number[]) {
    this.dimensions = dimensions
    const totalSize = dimensions.reduce((acc, dim) => acc * dim, 1)
    this.data = new TypedArray(totalSize)
  }

  get (...indices: number[]): T extends BigUint64Array | BigInt64Array ? bigint : number {
    this.checkIndices(indices)
    const flatIndex = this.toFlatIndex(indices)
    return this.data[flatIndex] as any
  }

  set (value: T extends BigUint64Array | BigInt64Array ? bigint : number, ...indices: number[]): void {
    this.checkIndices(indices)
    const flatIndex = this.toFlatIndex(indices)
    this.data[flatIndex] = value as any
  }

  private checkIndices (indices: number[]): void {
    if (indices.length !== this.dimensions.length) {
      throw new Error(`Expected ${this.dimensions.length} indices but got ${indices.length}`)
    }
    indices.forEach((index, i) => {
      if (index < 0 || index >= this.dimensions[i]) {
        throw new Error(`Index ${index} out of bounds for dimension ${i}`)
      }
    })
  }

  private toFlatIndex (indices: number[]): number {
    return indices.reduce((acc, index, i) => acc * this.dimensions[i] + index, 0)
  }

  getDimensions (): number[] {
    return [...this.dimensions]
  }

  values (): IterableIterator<number> {
    return this.data[Symbol.iterator]() as IterableIterator<number>
  }
}
