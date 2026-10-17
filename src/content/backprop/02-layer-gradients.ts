import type { Section } from '../types'

export const layerGradients: Section = {
  id: 'layer-gradients',
  title: 'Affine and activation gradients',
  scene: 'layer-gradients',
  focus: 'trace',
  slide: `## Backward, one layer at a time

Starting from ∂L/∂y, each step multiplies by one local derivative and passes the result back.

### The trace
- ∂L/∂y = y − t = **−1.18**
- Output weights: ∂L/∂W₂ = ∂L/∂y · h = **[−0.118, −1.062]**
- Back into the hidden layer: ∂L/∂h = ∂L/∂y · W₂ = **[−0.826, 0.590]**
- Through ReLU: both z₁ were positive, so the gradient **passes** unchanged
- First-layer weights: ∂L/∂W₁ = ∂L/∂z₁ ⊗ x = **[[−0.826, −1.652], [0.590, 1.180]]**

### Patterns to recognise
- A weight's gradient is **upstream gradient × its input**
- A bias's gradient is the upstream gradient itself
- Every gradient has the **same shape** as its parameter
- A negative z₁ would have **blocked** its unit's gradient to 0`,
  narration:
    "Now run the chain backward. It starts at the loss: the derivative with respect to y is y minus t, minus one point one eight. The output layer's weights each multiplied one hidden value, so their gradients are that upstream gradient times the hidden values: minus nought point one one eight and minus one point zero six two. The output bias was simply added, so its gradient is the upstream gradient itself. To continue into the network we need the gradient with respect to h, which is the upstream gradient times the output weights: minus nought point eight two six and nought point five nine. Next comes ReLU. Both hidden pre-activations were positive, so ReLU's local derivative is one for both, and the gradient passes through unchanged. Had either been negative, its gradient would have been blocked to zero, and that unit's incoming weights would get no update from this example. Finally the first-layer weights: each gradient is the hidden unit's gradient times the input it multiplied, an outer product of the two vectors. Three patterns repeat in every network: a weight's gradient is upstream times input, a bias's gradient is the upstream gradient, and every gradient has the same shape as its parameter.",
}
