import type { Scene } from '@graphlearning/flow'
import { sourceTarget } from './source-target'
import { probeHead } from './probe-head'
import { fineTune } from './fine-tune'
import { buffers } from './buffers'
import { signals } from './signals'
import { views } from './views'
import { contamination } from './contamination'
import { provenance } from './provenance'

// Chapter 10 — Transfer and Self-Supervised Representation. Spread into src/scenes/index.ts.
export const transferScenes: Scene[] = [sourceTarget, probeHead, fineTune, buffers, signals, views, contamination, provenance]
