import type { Section } from '../types'

export const recon: Section = {
  id: 'recon',
  title: 'Encoder/bottleneck/decoder and reconstruction loss',
  scene: 'recon',
  focus: 'trace',
  slide: `## Encoder, bottleneck, decoder

An autoencoder learns to **reproduce its input** through a narrow code. No labels are needed: the input is its own target.

### The shape
- A sensor window [120 × 4] = 480 numbers → **16** → 480
- Loss: mean squared error between window and reconstruction

### The smallest trace, 3 → 1 → 3
- Unit direction u = [0.6, 0, 0.8]; input x = [0.9, 0.2, 0.4]
- Encode z = u·x = **0.860**; decode x̂ = z·u = **[0.516, 0, 0.688]**
- Error [0.384, 0.200, −0.288]; loss = **0.0901**
- The middle channel is lost entirely: u gives it **no** weight

### What the bottleneck forces
- 16 numbers cannot hold every detail of 480
- Training keeps what lowers the loss **most**, on average`,
  narration:
    "An autoencoder learns to reproduce its input after squeezing it through a narrow code. It needs no labels, because the input is its own target. For a sensor window of a hundred and twenty steps across four sensors, the encoder maps four hundred and eighty numbers down to sixteen, the bottleneck, and the decoder maps those sixteen back to four hundred and eighty, reshaped into the original window. The loss is the mean squared difference between the window and its reconstruction. The smallest possible case makes the mechanics visible: three channel means, a one-number code, and three outputs, with the encoder and decoder sharing one unit direction, nought point six, nought, nought point eight. The input is nought point nine, nought point two, nought point four. Encoding takes the dot product, giving a code of nought point eight six. Decoding multiplies the direction by that code, giving nought point five one six, nought, nought point six eight eight. The errors are nought point three eight, nought point two and minus nought point two nine, and the mean squared loss is nought point nought nine. The middle channel is lost entirely, because the direction gives it no weight. That is what a bottleneck forces. Sixteen numbers cannot hold every detail of four hundred and eighty, so training keeps whatever lowers the average loss the most.",
}
