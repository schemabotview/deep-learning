import type { Section } from '../types'

export const optimisers: Section = {
  id: 'optimisers',
  title: 'SGD, momentum, Adam and decoupled weight decay',
  scene: 'optimisers',
  focus: 'step',
  slide: `## Optimisers and weight decay

The optimiser turns a gradient into a **step**; different rules give different steps from the same gradient.

### One weight, one step
- **SGD**: w − lr·g = **0.9500**
- **Adam** divides by a running gradient scale, so its first step is about lr: **0.9000**
- **Momentum** averages recent gradients, smoothing noisy directions
- Adam keeps **two** extra numbers per weight: memory, chapter 12

### Weight decay is not one thing
- In SGD, L2 penalty and weight decay coincide: **0.9490**
- In Adam, L2 is added to the gradient, then **normalised away**: still **0.9000**
- **AdamW** applies decay directly to the weight: **0.8990**
- Adam with L2 and AdamW are **not interchangeable**: settings do not transfer
- Biases and norm weights: usually **no** decay`,
  narration:
    "The optimiser decides how a gradient becomes a step. Take one weight equal to one, a gradient of a half, a learning rate of nought point one and a decay strength of one hundredth, and compute a single step under each rule. Plain stochastic gradient descent subtracts the learning rate times the gradient: nought point nine five. Momentum, not shown, would also blend in recent gradients, smoothing out noisy directions. Adam keeps running estimates of each weight's gradient and squared gradient, and divides one by the square root of the other, so its step size is roughly the learning rate regardless of the gradient's scale. On the first step that gives exactly nought point nine. Now weight decay, where the subtlety lies. For plain SGD, adding an L2 penalty to the loss and shrinking the weights directly are the same thing: nought point nine four nine. For Adam they are not. Adding L2 means adding lambda times w to the gradient, and Adam then normalises the whole gradient, so on this first step the decay disappears entirely: still nought point nine. AdamW decouples the decay, shrinking the weight directly, and gives nought point eight nine nine. So Adam with L2 and AdamW are not interchangeable, and a decay setting tuned for one does not transfer to the other.",
}
