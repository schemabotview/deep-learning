import type { Scene } from '@graphlearning/flow'
import { chainRule } from './chain-rule'
import { layerGradients } from './layer-gradients'
import { vjp } from './vjp'
import { sharedWeights } from './shared-weights'
import { batchScaling } from './batch-scaling'
import { autogradHazards } from './autograd-hazards'
import { zeroGrad } from './zero-grad'
import { finiteDifference } from './finite-difference'

// Chapter 3 — Backpropagation and Automatic Differentiation. Spread into src/scenes/index.ts.
export const backpropScenes: Scene[] = [chainRule, layerGradients, vjp, sharedWeights, batchScaling, autogradHazards, zeroGrad, finiteDifference]
