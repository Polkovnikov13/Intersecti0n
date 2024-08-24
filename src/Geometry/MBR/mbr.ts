export class MBR {
  minX: number
  minY: number
  maxX: number
  maxY: number

  constructor (minX: number, minY: number, maxX: number, maxY: number) {
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
    // console.log(`MBR создан: [${this.minX}, ${this.minY}, ${this.maxX}, ${this.maxY}]`)
  }

  intersects (other: MBR): boolean {
    const result = !(this.minX > other.maxX || this.maxX < other.minX ||
                     this.minY > other.maxY || this.maxY < other.minY)
    // console.log(`MBR [${this.minX}, ${this.minY}, ${this.maxX}, ${this.maxY}] пересекается с [${other.minX}, ${other.minY}, ${other.maxX}, ${other.maxY}]? ${result}`)
    return result
  }

  static combine (mbr1: MBR, mbr2: MBR): MBR {
    const combined = new MBR(
      Math.min(mbr1.minX, mbr2.minX),
      Math.min(mbr1.minY, mbr2.minY),
      Math.max(mbr1.maxX, mbr2.maxX),
      Math.max(mbr1.maxY, mbr2.maxY)
    )
    // console.log(`Комбинированный MBR: [${combined.minX}, ${combined.minY}, ${combined.maxX}, ${combined.maxY}]`)
    return combined
  }

  static area (mbr: MBR): number {
    const area = (mbr.maxX - mbr.minX) * (mbr.maxY - mbr.minY)
    // console.log(`Площадь MBR: ${area}`)
    return area
  }

  equals (other: MBR): boolean {
    const result = this.minX === other.minX && this.minY === other.minY &&
                   this.maxX === other.maxX && this.maxY === other.maxY
    // console.log(`MBR [${this.minX}, ${this.minY}, ${this.maxX}, ${this.maxY}] равен [${other.minX}, ${other.minY}, ${other.maxX}, ${other.maxY}]? ${result}`)
    return result
  }
}
