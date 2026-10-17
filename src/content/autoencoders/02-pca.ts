import type { Section } from '../types'

export const pca: Section = {
  id: 'pca',
  title: 'Linear autoencoder–PCA relationship and qualifications',
  scene: 'ae-pca',
  focus: 'compare',
  slide: `## Linear autoencoders and PCA

With **linear** layers, **squared** loss and **centred** data, an autoencoder's best code spans the same subspace as PCA's top components.

### The worked comparison
- 80 centred 2-D points; PCA's first direction **[0.833, 0.553]**
- A 2 → 1 → 2 linear AE, trained by gradient descent, ends at the same direction, within **0.02°**
- Reconstruction MSE: **0.0369** for both

### The qualifications
- Same **subspace**, not the same **basis**: the encoder ends at norm **1.71**, the decoder at **0.59**
- Only their product is fixed, 1.71 × 0.59 = **1.00**; any rescaling fits equally well
- With k > 1 codes, the AE's directions are any **mix** of PCA's, neither orthogonal nor ordered

### Why it matters
- PCA is the right **baseline** for a linear AE: a closed form, no training`,
  narration:
    "There is a precise link between autoencoders and principal component analysis. With linear layers, squared error and centred data, the best possible autoencoder code spans the same subspace as the top principal components. The plot shows it on eighty centred two-dimensional points. PCA's first direction is nought point eight three three, nought point five five three. A linear autoencoder with a one-number code, trained by ordinary gradient descent, ends up pointing the same way, within two hundredths of a degree, and the reconstruction errors match exactly at nought point nought three six nine. The qualifications matter as much as the match. The autoencoder finds the same subspace, not the same basis. Its encoder weights end with a length of one point seven one and its decoder with nought point five nine. Only their product is pinned down, at one, so any rescaling between the two fits equally well. With more than one code dimension, the learned directions can be any mixture of the principal components, neither orthogonal nor ordered by variance. And once you add a nonlinearity, a different loss, or uncentred data, the equivalence no longer holds. So for a linear autoencoder, PCA is the baseline to beat. It has a closed form and needs no training at all.",
}
