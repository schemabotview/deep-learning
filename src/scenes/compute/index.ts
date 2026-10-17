import type { Scene } from '@graphlearning/flow'
import { memory } from './memory'
import { precision } from './precision'
import { accumulation } from './accumulation'
import { checkpointing } from './checkpointing'
import { profiling } from './profiling'
import { comparison } from './comparison'
import { boundaries } from './boundaries'

// Chapter 12 — Compute, Precision, and Efficient Execution. Spread into src/scenes/index.ts.
export const computeScenes: Scene[] = [memory, precision, accumulation, checkpointing, profiling, comparison, boundaries]
