import type { Course } from '../types'
import { learnedFeatures } from './01-learned-features'
import { inductiveBias } from './02-inductive-bias'
import { tensorShapes } from './03-tensor-shapes'
import { broadcasting } from './04-broadcasting'
import { batching } from './05-batching'
import { taskBoundaries } from './06-task-boundaries'
import { shapeAssertions } from './07-shape-assertions'

// Chapter 1 — what networks learn, and the tensor contracts that carry their computation.
export const tensors: Course = {
  id: 'tensors',
  title: 'Neural Functions, Tensors, and Representations',
  sections: [learnedFeatures, inductiveBias, tensorShapes, broadcasting, batching, taskBoundaries, shapeAssertions],
}
