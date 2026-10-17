import type { Section } from '../types'

export const bptt: Section = {
  id: 'bptt',
  title: 'Backpropagation through time and truncation',
  scene: 'bptt',
  focus: 'decay',
  slide: `## Gradients through time

Training an RNN backpropagates through the **unrolled** sequence — so its gradients multiply through every step.

### Vanishing and exploding
- The influence of a state *k* steps back is a product of *k* factors w·(1 − h²)
- At a typical factor of **0.7**, twenty steps back the gradient is about **8e-4**: it vanishes
- At **1.1**, it grows to about **6.7**: it explodes
- So plain RNNs struggle to learn dependencies more than a few dozen steps long

### Truncated backpropagation
- Process long histories in chunks of, say, **32 steps**
- Carry the state forward, but **detach** it at each chunk boundary
- Gradients then reach back at most 32 steps: a deliberate, stated limit
- Clipping (chapter 4) controls the exploding case`,
  narration:
    "Training a recurrent network means backpropagating through the unrolled sequence, which is called backpropagation through time. Because the same weights are applied at every step, the gradient flowing back to an earlier step is multiplied by a local factor at each step it crosses, and for the simple network that factor is the recurrent weight times the derivative of tanh. The plot shows what a product of many such factors does. If the typical factor is nought point seven, then twenty steps back the gradient is less than one thousandth of its original size, so an early reading has almost no influence on learning. If the factor is one point one, twenty steps back it is nearly seven times larger, and longer sequences blow up. That is why plain recurrent networks struggle with dependencies more than a few dozen steps long. Long sensor histories also cost memory, since every step's activations are stored for backward. The standard compromise is truncated backpropagation through time: process the history in chunks of, say, thirty-two steps, carry the hidden state forward from chunk to chunk, but detach it at each boundary. The state still remembers, but gradients reach back at most thirty-two steps, a limit you choose and state. Clipping handles the exploding case.",
}
