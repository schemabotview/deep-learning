import type { Course } from '../types'
import { sourceTarget } from './01-source-target'
import { probeHead } from './02-probe-head'
import { fineTune } from './03-fine-tune'
import { buffers } from './04-buffers'
import { signals } from './05-signals'
import { views } from './06-views'
import { contamination } from './07-contamination'
import { provenance } from './08-provenance'

// Chapter 10 — bounded adaptation, its state, and the assumptions of self-supervised signals.
export const transfer: Course = {
  id: 'transfer',
  title: 'Transfer and Self-Supervised Representation',
  sections: [sourceTarget, probeHead, fineTune, buffers, signals, views, contamination, provenance],
}
