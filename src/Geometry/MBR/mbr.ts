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
  }

  intersects (other: MBR): boolean {
    return this.minX <= other.maxX &&
         this.maxX >= other.minX &&
         this.minY <= other.maxY &&
         this.maxY >= other.minY
  }

  static combine (mbr1: MBR, mbr2: MBR): MBR {
    return new MBR(
      Math.min(mbr1.minX, mbr2.minX),
      Math.min(mbr1.minY, mbr2.minY),
      Math.max(mbr1.maxX, mbr2.maxX),
      Math.max(mbr1.maxY, mbr2.maxY)
    )
  }

  static area (mbr: MBR): number {
    return (mbr.maxX - mbr.minX) * (mbr.maxY - mbr.minY)
  }

  equals (other: MBR): boolean {
    return this.minX === other.minX &&
           this.minY === other.minY &&
           this.maxX === other.maxX &&
           this.maxY === other.maxY
  }
}
