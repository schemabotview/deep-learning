import type { Course } from '../types'
import { capacityNoise } from './01-capacity-noise'
import { regularisers } from './02-regularisers'
import { augmentation } from './03-augmentation'
import { searchBudget } from './04-search-budget'
import { diagnostics } from './05-diagnostics'
import { baselinesSeeds } from './06-baselines-seeds'
import { shift } from './07-shift'
import { limits } from './08-limits'

// Chapter 5 — neural-specific generalisation evidence and diagnostics, on ML's evaluation footing.
export const generalisation: Course = {
  id: 'generalisation',
  title: 'Generalisation and Neural Evaluation',
  sections: [capacityNoise, regularisers, augmentation, searchBudget, diagnostics, baselinesSeeds, shift, limits],
}
