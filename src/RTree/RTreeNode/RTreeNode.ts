import { type Entry } from '../entry'

export class RTreeNode {
  entries: Entry[]
  isLeaf: boolean
  maxEntries: number
  minEntries: number
  parent: RTreeNode | null

  constructor (isLeaf: boolean, maxEntries: number, minEntries: number, parent: RTreeNode | null = null) {
    this.entries = []
    this.isLeaf = isLeaf
    this.maxEntries = maxEntries
    this.minEntries = minEntries
    this.parent = parent
  }

  addEntry (entry: Entry) {
    this.entries.push(entry)
  }

  isOverflow (): boolean {
    return this.entries.length > this.maxEntries
  }
}
