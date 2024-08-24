import type { MBR } from './MBR/mbr'

export interface Geometry {
  getMBR: () => MBR
}
