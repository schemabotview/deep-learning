import type { Section } from '../types'

export const sharedWeights: Section = {
  id: 'shared-weights',
  title: 'Shared and branched parameter contributions',
  scene: 'shared-weights',
  focus: 'sum',
  slide: `## Shared weights add up

When one parameter is used in **several places**, its gradient is the **sum** of the contributions from every use.

### Traced
- y = w·x₁ + w·x₂ with w = 0.5, x = (2, 3), t = 1: y = **2.5**
- Through the first use: 1.5 × 2 = **3**; through the second: 1.5 × 3 = **4.5**
- ∂L/∂w = 3 + 4.5 = **7.5** — the multivariable chain rule, summing over paths

### Where it matters
- A convolution filter is reused at every image position
- A recurrent cell is reused at every time step
- Two heads on one body send **two** gradients into the shared layers
- Autograd sums these automatically; a hand-written backward must too
- Forgetting one path gives a gradient that is plausible and **wrong**`,
  narration:
    "Often a single parameter is used in more than one place, and then its gradient is the sum of the contributions from every use. Take the smallest possible case: one weight w multiplies two different inputs, and the results are added. With w equal to a half and inputs two and three, the output is two and a half, and against a target of one the loss gradient with respect to the output is one and a half. Follow each path back to w. Through the first use, the contribution is one and a half times two, which is three. Through the second, one and a half times three, which is four and a half. The gradient of the loss with respect to w is their sum, seven and a half. This is just the multivariable chain rule: when a variable affects the output along several paths, you add the derivatives along each path. It matters because sharing is everywhere in deep learning. A convolution filter is applied at every position in an image, a recurrent cell at every step of a sequence, and a body with two output heads receives a gradient from each head. Autograd sums all of these automatically. A hand-written backward pass has to as well, or it silently loses information.",
}
