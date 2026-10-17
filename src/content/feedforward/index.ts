import type { Course } from '../types'
import { affineCollapse } from './01-affine-collapse'
import { xor } from './02-xor'
import { depthWidth } from './03-depth-width'
import { heads } from './04-heads'
import { crossEntropy } from './05-cross-entropy'
import { stableSoftmax } from './06-stable-softmax'
import { maskedLoss } from './07-masked-loss'

// Chapter 2 — multilayer computation, output heads, and objectives that match them.
export const feedforward: Course = {
  id: 'feedforward',
  title: 'Feedforward Networks and Objectives',
  sections: [affineCollapse, xor, depthWidth, heads, crossEntropy, stableSoftmax, maskedLoss],
}
