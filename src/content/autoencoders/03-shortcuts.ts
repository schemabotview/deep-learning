import type { Section } from '../types'

export const shortcuts: Section = {
  id: 'shortcuts',
  title: 'Denoising, sparsity, and copying shortcuts',
  scene: 'shortcuts',
  focus: 'variants',
  slide: `## Blocking the copying shortcut

An autoencoder with a code as wide as its input can learn the **identity**: near-perfect reconstruction, and nothing useful in z.

### The variants (validation, illustrative)
- Undercomplete, z = 16: MSE **0.018**, probe **0.71**
- Overcomplete, z = 960, no constraint: MSE **0.0003**, probe **0.55**
- The best reconstruction gives the **worst** code for the fault label
- Overcomplete + L1 on z: probe 0.73; denoising: probe **0.76**

### Three ways to make it non-trivial
- **Bottleneck**: fewer numbers in z than in x
- **Sparsity**: a penalty on |z| keeps few units active
- **Denoising**: corrupt the input, keep the **clean** target, so copying is not enough

### The denoising detail
- Noise goes on the **input** only, never on the target`,
  narration:
    "An autoencoder whose code is as wide as its input, or wider, has an easy way out. It can learn something close to the identity, copy the input straight through, and reach near-perfect reconstruction without learning anything useful about the data. These illustrative validation numbers show it on sensor windows. An undercomplete model with a sixteen-number code reconstructs with an error of nought point nought one eight, and a linear probe on its code predicts the fault label with a macro F one of nought point seven one. An overcomplete model with nine hundred and sixty code units and no constraint reconstructs almost perfectly, nought point nought nought nought three, but its code scores only nought point five five. The best reconstruction gives the worst code. Three ideas make reconstruction non-trivial. A bottleneck gives the code fewer numbers than the input. A sparsity penalty on the code's magnitude lets the code be wide but keeps few units active at once, and here reaches nought point seven three. Denoising corrupts the input with noise but keeps the clean window as the target, so copying the input is no longer enough. The model has to learn the structure that lets it remove the noise, and it scores best, at nought point seven six. The noise goes on the input only, never on the target.",
}
