import type { Scene } from '@graphlearning/flow'
import { affineCollapse } from './affine-collapse'
import { xor } from './xor'
import { depthWidth } from './depth-width'
import { heads } from './heads'
import { crossEntropy } from './cross-entropy'
import { stableSoftmax } from './stable-softmax'
import { maskedLoss } from './masked-loss'

// Chapter 2 — Feedforward Networks and Objectives. Spread into src/scenes/index.ts.
export const feedforwardScenes: Scene[] = [affineCollapse, xor, depthWidth, heads, crossEntropy, stableSoftmax, maskedLoss]
