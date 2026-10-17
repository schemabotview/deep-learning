import type { Scene } from '@graphlearning/flow'
import { capacityNoise } from './capacity-noise'
import { regularisers } from './regularisers'
import { augmentation } from './augmentation'
import { searchBudget } from './search-budget'
import { diagnostics } from './diagnostics'
import { baselinesSeeds } from './baselines-seeds'
import { shift } from './shift'
import { limits } from './limits'

// Chapter 5 — Generalisation and Neural Evaluation. Spread into src/scenes/index.ts.
export const generalisationScenes: Scene[] = [capacityNoise, regularisers, augmentation, searchBudget, diagnostics, baselinesSeeds, shift, limits]
