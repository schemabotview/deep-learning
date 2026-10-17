import type { Scene } from '@graphlearning/flow'
import { recon } from './recon'
import { pca } from './pca'
import { shortcuts } from './shortcuts'
import { usefulness } from './usefulness'
import { anomaly } from './anomaly'
import { latentModels } from './latent-models'

// Chapter 11 — Autoencoders and Reconstruction Learning. Spread into src/scenes/index.ts.
export const autoencodersScenes: Scene[] = [recon, pca, shortcuts, usefulness, anomaly, latentModels]
