import type { Scene } from '@graphlearning/flow'
import { block } from './block'
import { positions } from './positions'
import { patterns } from './patterns'
import { visibility } from './visibility'
import { objectives } from './objectives'
import { parallelGeneration } from './parallel-generation'
import { caching } from './caching'
import { reliability } from './reliability'

// Chapter 9 — Transformers and Sequence Objectives. Spread into src/scenes/index.ts.
export const transformersScenes: Scene[] = [block, positions, patterns, visibility, objectives, parallelGeneration, caching, reliability]
