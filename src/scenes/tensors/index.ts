import type { Scene } from '@graphlearning/flow'
import { learnedFeatures } from './learned-features'
import { inductiveBias } from './inductive-bias'
import { tensorShapes } from './tensor-shapes'
import { broadcasting } from './broadcasting'
import { batching } from './batching'
import { taskBoundaries } from './task-boundaries'
import { shapeAssertions } from './shape-assertions'

// Chapter 1 — Neural Functions, Tensors, and Representations. Spread into src/scenes/index.ts.
export const tensorsScenes: Scene[] = [learnedFeatures, inductiveBias, tensorShapes, broadcasting, batching, taskBoundaries, shapeAssertions]
