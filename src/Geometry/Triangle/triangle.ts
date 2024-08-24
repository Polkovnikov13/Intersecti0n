import { MBR } from '../MBR/mbr'
import type { Geometry } from '../geometry'

export class Triangle implements Geometry {
  private readonly vertices: Array<{ x: number, y: number }>
  private readonly mbr: MBR

  constructor (vertices: Array<{ x: number, y: number }>) {
    if (vertices.length !== 3) {
      throw new Error('Triangle must have exactly 3 vertices')
    }
    this.vertices = vertices

    // Вычисление MBR для треугольника
    const minX = Math.min(...vertices.map(v => v.x))
    const minY = Math.min(...vertices.map(v => v.y))
    const maxX = Math.max(...vertices.map(v => v.x))
    const maxY = Math.max(...vertices.map(v => v.y))
    this.mbr = new MBR(minX, minY, maxX, maxY)
  }

  getMBR (): MBR {
    return this.mbr
  }

  getVertices (): Array<{ x: number, y: number }> {
    return this.vertices
  }
}
