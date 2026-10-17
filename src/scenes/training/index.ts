import type { Scene } from '@graphlearning/flow'
import { trainingLoop } from './training-loop'
import { evalNograd } from './eval-nograd'
import { checkpoints } from './checkpoints'
import { optimisers } from './optimisers'
import { initialisation } from './initialisation'
import { schedules } from './schedules'
import { seeds } from './seeds'
import { resume } from './resume'

// Chapter 4 — Training, Optimisation, and Reproducibility. Spread into src/scenes/index.ts.
export const trainingScenes: Scene[] = [trainingLoop, evalNograd, checkpoints, optimisers, initialisation, schedules, seeds, resume]
