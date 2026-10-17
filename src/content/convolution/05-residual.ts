import type { Section } from '../types'

export const residual: Section = {
  id: 'residual',
  title: 'Residual connections and shape projections',
  scene: 'residual',
  focus: 'counts',
  slide: `## Residual connections

A residual block computes a correction F(x) and **adds the input back**: output = relu(F(x) + x).

### Why it helps
- If a block has nothing useful to add, it only needs F(x) ≈ 0 — easy to learn
- The skip path gives gradients a **direct route** back to early layers
- Very deep plain stacks train **worse** than shallow ones; residual stacks do not

### When shapes differ
- This block halves resolution and doubles channels: [N, 16, 32, 32] → [N, 32, 16, 16]
- The identity cannot be added, so the shortcut uses a **1×1 conv with stride 2**
- Main path: **13,952** parameters; projection: just **576**
- Add **before** the final ReLU, so the sum can be negative inside the block`,
  narration:
    "Stacking more convolutional layers should, in principle, never hurt: the extra layers could simply learn to pass their input through unchanged. In practice very deep plain networks train worse than shallower ones, because passing a signal through unchanged turns out to be hard to learn. Residual connections fix this by changing what each block has to learn. A residual block computes some correction F of x and adds the input back, then applies ReLU. If the block has nothing useful to add, it only needs F of x to be near zero, which is easy. And the skip path gives gradients a direct route back to early layers, past every nonlinearity. Adding requires matching shapes. The block in the figure halves the resolution and doubles the channels, from sixteen channels at thirty-two pixels square to thirty-two channels at sixteen. The input cannot simply be added to that, so the shortcut becomes a projection: a one-by-one convolution with stride two, followed by batch norm. It is cheap. The main path, two three-by-three convolutions with batch norm, has thirteen thousand nine hundred and fifty-two parameters; the projection only five hundred and seventy-six. The sum happens before the final ReLU.",
}
