import type { Course } from '../types'
import { qkv } from './01-qkv'
import { scores } from './02-scores'
import { masks } from './03-masks'
import { selfCross } from './04-self-cross'
import { multihead } from './05-multihead'
import { costLimits } from './06-cost-limits'

// Chapter 8 — attention computations, masking, and the limits of reading attention weights.
export const attention: Course = {
  id: 'attention',
  title: 'Attention Mechanisms',
  sections: [qkv, scores, masks, selfCross, multihead, costLimits],
}
