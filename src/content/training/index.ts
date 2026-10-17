import type { Course } from '../types'
import { trainingLoop } from './01-training-loop'
import { evalNograd } from './02-eval-nograd'
import { checkpoints } from './03-checkpoints'
import { optimisers } from './04-optimisers'
import { initialisation } from './05-initialisation'
import { schedules } from './06-schedules'
import { seeds } from './07-seeds'
import { resume } from './08-resume'

// Chapter 4 — the state and boundaries of a full training run, and its common failures.
export const training: Course = {
  id: 'training',
  title: 'Training, Optimisation, and Reproducibility',
  sections: [trainingLoop, evalNograd, checkpoints, optimisers, initialisation, schedules, seeds, resume],
}
