import type { Scene } from '@graphlearning/flow'
import { crossCorrelation } from './cross-correlation'
import { channelsParams } from './channels-params'
import { receptiveField } from './receptive-field'
import { pooling } from './pooling'
import { residual } from './residual'
import { batchnorm } from './batchnorm'
import { layernorm } from './layernorm'
import { resources } from './resources'

// Chapter 6 — Convolution, Residual Blocks, and Normalisation. Spread into src/scenes/index.ts.
export const convolutionScenes: Scene[] = [crossCorrelation, channelsParams, receptiveField, pooling, residual, batchnorm, layernorm, resources]
