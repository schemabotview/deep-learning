import type { Course } from '../types'
import { recon } from './01-recon'
import { pca } from './02-pca'
import { shortcuts } from './03-shortcuts'
import { usefulness } from './04-usefulness'
import { anomaly } from './05-anomaly'
import { latentModels } from './06-latent-models'

// Chapter 11 — reconstruction objectives, their link to PCA, and the limits of latents and scores.
export const autoencoders: Course = {
  id: 'autoencoders',
  title: 'Autoencoders and Reconstruction Learning',
  sections: [recon, pca, shortcuts, usefulness, anomaly, latentModels],
}
