import type { Course } from '../types'
import { chainRule } from './01-chain-rule'
import { layerGradients } from './02-layer-gradients'
import { vjp } from './03-vjp'
import { sharedWeights } from './04-shared-weights'
import { batchScaling } from './05-batch-scaling'
import { autogradHazards } from './06-autograd-hazards'
import { zeroGrad } from './07-zero-grad'
import { finiteDifference } from './08-finite-difference'

// Chapter 3 — derive reverse-mode gradients and keep derivative calculation apart from optimisation.
export const backprop: Course = {
  id: 'backprop',
  title: 'Backpropagation and Automatic Differentiation',
  sections: [chainRule, layerGradients, vjp, sharedWeights, batchScaling, autogradHazards, zeroGrad, finiteDifference],
}
