import type { Scene } from '@graphlearning/flow'
import { rationale } from './rationale'
import { configuration } from './configuration'
import { designComparison } from './comparison'
import { contract } from './contract'
import { handoff } from './handoff'
import { practice } from './practice'

// Chapter 13 — Integrated Neural Design and Handoff. Spread into src/scenes/index.ts.
export const designScenes: Scene[] = [rationale, configuration, designComparison, contract, handoff, practice]
