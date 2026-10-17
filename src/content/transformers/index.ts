import type { Course } from '../types'
import { block } from './01-block'
import { positions } from './02-positions'
import { patterns } from './03-patterns'
import { visibility } from './04-visibility'
import { objectives } from './05-objectives'
import { parallelGeneration } from './06-parallel-generation'
import { caching } from './07-caching'
import { reliability } from './08-reliability'

// Chapter 9 — transformer computation, masks versus objectives, and inference trade-offs.
export const transformers: Course = {
  id: 'transformers',
  title: 'Transformers and Sequence Objectives',
  sections: [block, positions, patterns, visibility, objectives, parallelGeneration, caching, reliability],
}
