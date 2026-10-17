import type { Section } from '../types'

export const diagnostics: Section = {
  id: 'diagnostics',
  title: 'Tiny-subset, activation and gradient diagnostics',
  scene: 'diagnostics',
  focus: 'tiny',
  slide: `## Diagnostics before tuning

Before tuning a network, check that it **can learn at all** — and look inside when it cannot.

### The tiny-subset test
- Train on just **32 images** with no regularisation
- A healthy pipeline drives the training loss to **about zero**
- If it stays stuck, the problem is a **bug**, not generalisation — here a stray \`detach()\`
- It takes minutes, and it rules out a whole class of failures

### Look inside the layers
- Per-layer **gradient norms** that shrink toward the input mean gradients are vanishing
- Here fc1 gets **3e-7** while the head gets **1e-1**
- **96 %** of fc1's sigmoid units are saturated: their derivative is near zero
- Remedy: ReLU-family activations, proper initialisation, normalisation — chapters 4 and 6`,
  narration:
    "When a network performs badly, it is tempting to start tuning. A quicker first step is to check whether it can learn at all. Take just thirty-two training images, switch off every regulariser, and train. A healthy model and pipeline will drive the training loss essentially to zero within a few hundred steps, because, as section one showed, a network can memorise a handful of images easily. If the loss stays stuck, the problem is not generalisation, it is a bug, and no amount of tuning will fix it. In the example the cause is a stray detach that stops any gradient reaching the convolutional layers. Other usual suspects are labels in the wrong order, a missing optimiser step, or a learning rate off by orders of magnitude. The test takes minutes and rules out a whole class of failures. Then look inside the layers. The table shows per-layer gradient norms for a deep network built with sigmoid activations. The gradient reaching the first layer is three times ten to the minus seven, against one tenth at the head: it is vanishing on the way back. The reason shows in the activations: ninety-six percent of the first layer's sigmoid units are saturated, where their derivative is nearly zero.",
}
