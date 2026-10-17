import type { Section } from '../types'

export const evalNograd: Section = {
  id: 'eval-nograd',
  title: 'Evaluation mode versus disabling gradients',
  scene: 'eval-nograd',
  focus: 'grid',
  slide: `## Two switches, not one

\`model.eval()\` and \`torch.no_grad()\` look interchangeable. They control **different** things.

### What each does
- \`model.eval()\` changes **layer behaviour**: dropout becomes the identity, batch norm uses running statistics
- \`torch.no_grad()\` stops autograd **recording**: no graph, less memory, no backward possible
- Neither implies the other

### The four combinations
- Train mode with recording: an ordinary **training step**
- Eval mode under no_grad: **validation and inference**
- Eval mode with recording: gradients with respect to inputs, or fine-tuning with frozen statistics
- Train mode under no_grad: the **bug** — dropout still fires and batch-norm statistics drift
- Switch back with \`model.train()\` before training resumes`,
  narration:
    "Two switches are often confused because they are usually flipped together. Calling eval on a model changes how certain layers behave. Dropout, which in training zeroes a random thirty percent of its inputs and scales the rest up to compensate, becomes the identity. Batch normalisation stops using the current batch's statistics and stops updating its running averages, and uses those stored averages instead. Linear layers, convolutions and ReLU are unaffected. The no-grad context does something else entirely: it tells autograd not to record operations, so no graph is built, memory use falls, and backward is impossible. Neither implies the other, so all four combinations exist. Training mode with recording is an ordinary training step. Eval mode under no grad is validation and inference. Eval mode with recording is legitimate too, for example computing gradients with respect to the input image while keeping batch norm frozen. The fourth combination, training mode under no grad, is the classic bug: validation numbers come out noisy because dropout is still active, and worse, every validation batch quietly updates the batch-norm statistics with data the model is supposed to be judged on. And remember to switch back to training mode afterwards.",
}
