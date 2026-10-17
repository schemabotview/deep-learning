import type { Scene } from '@graphlearning/flow'
import { qkv } from './qkv'
import { scoresScene } from './scores'
import { masks } from './masks'
import { selfCross } from './self-cross'
import { multihead } from './multihead'
import { costLimits } from './cost-limits'

// Chapter 8 — Attention Mechanisms. Spread into src/scenes/index.ts.
export const attentionScenes: Scene[] = [qkv, scoresScene, masks, selfCross, multihead, costLimits]
