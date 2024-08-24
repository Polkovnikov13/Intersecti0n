import type { MBR } from '../Geometry/MBR/mbr'
import type { RTreeNode } from './RTreeNode/RTreeNode'

export interface Entry {
  mbr: MBR
  child?: RTreeNode
  recordId?: number
}
