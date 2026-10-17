import type { Section } from '../types'

export const usefulness: Section = {
  id: 'usefulness',
  title: 'Latent representations versus downstream usefulness',
  scene: 'usefulness',
  focus: 'curves',
  slide: `## Good reconstruction, useful code?

Reconstruction loss rewards whatever makes **most pixels** right. The downstream task may depend on a few.

### The bottleneck sweep (validation, illustrative)
- Defect images; widen z from 8 to 512
- Reconstruction MSE keeps falling: **0.041 → 0.001**
- The probe peaks at **0.72** at width 64, then falls to **0.58** at 512
- Picking the width by reconstruction would pick the **worst** code

### Why: the scratch is small
- A 2 × 30 scratch is **60** of 4,096 pixels: **1.46%** of the image
- Missing it entirely, error 0.5 per pixel, adds only **0.0037** to the MSE
- Background, lighting and texture dominate the loss

### So evaluate the code on the task
- Choose widths and variants by a **probe** on validation labels`,
  narration:
    "Reconstruction loss rewards whatever gets most of the pixels right. The task you actually care about may depend on only a few of them. This illustrative sweep trains autoencoders on the defect images, widening the code from eight numbers to five hundred and twelve, and records two kinds of validation evidence. The reconstruction error keeps falling the whole way, from nought point nought four one to nought point nought nought one. A linear probe on the code, predicting the defect class, peaks at nought point seven two at a width of sixty-four and then falls to nought point five eight. If you picked the width by reconstruction quality, you would pick the worst code for the task. The arithmetic of a scratch shows why. A scratch two pixels wide and thirty long covers sixty of the four thousand and ninety-six pixels in a sixty-four by sixty-four image, under one and a half percent. If the decoder misses it completely, with an error of a half on every scratch pixel, the mean squared error rises by only nought point nought nought three seven. Background, lighting and surface texture dominate the loss instead. So evaluate the code on the task it is meant to serve: choose widths and variants by a probe on labelled validation data, not by reconstruction.",
}
