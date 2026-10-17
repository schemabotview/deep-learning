import type { Course } from '../types'
import { crossCorrelation } from './01-cross-correlation'
import { channelsParams } from './02-channels-params'
import { receptiveField } from './03-receptive-field'
import { pooling } from './04-pooling'
import { residual } from './05-residual'
import { batchnorm } from './06-batchnorm'
import { layernorm } from './07-layernorm'
import { resources } from './08-resources'

// Chapter 6 — convolutional computation and the blocks that make deep networks trainable.
export const convolution: Course = {
  id: 'convolution',
  title: 'Convolution, Residual Blocks, and Normalisation',
  sections: [crossCorrelation, channelsParams, receptiveField, pooling, residual, batchnorm, layernorm, resources],
}
