import type { Course } from '../types'
import { memory } from './01-memory'
import { precision } from './02-precision'
import { accumulation } from './03-accumulation'
import { checkpointing } from './04-checkpointing'
import { profiling } from './05-profiling'
import { comparison } from './06-comparison'
import { boundaries } from './07-boundaries'

// Chapter 12 — resource costs, numerical formats, and measured, bounded efficiency changes.
export const compute: Course = {
  id: 'compute',
  title: 'Compute, Precision, and Efficient Execution',
  sections: [memory, precision, accumulation, checkpointing, profiling, comparison, boundaries],
}
