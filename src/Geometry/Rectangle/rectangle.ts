import type { Geometry } from '../geometry'
import type { MBR } from '../MBR/mbr'

export class Rectangle implements Geometry {
  private readonly mbr: MBR

  constructor (mbr: MBR) {
    this.mbr = mbr
  }

  getMBR (): MBR {
    return this.mbr
  }
}
