import type { Section } from '../types'

export const accumulation: Section = {
  id: 'accumulation',
  title: 'Microbatch accumulation and batch-dependent semantics',
  scene: 'accumulation',
  focus: 'stats',
  slide: `## Microbatches are not a free large batch

Gradient accumulation sums gradients over several small batches before one step. It reproduces the **mean-loss gradient**, but not layers that look **across** the batch.

### What it gets right
- Divide each microbatch loss by 4: four backward passes add up to the batch-64 gradient

### What it changes: BatchNorm
- Over the full 64, one channel's mean is **0.455**, std **0.360**
- The four microbatches see means **0.851, 0.393, 0.186, 0.390**
- The batches came in **station order**, so each microbatch is one station
- Each normalises with its own statistics: a different function from batch 64

### Other batch-dependent semantics
- A contrastive loss gets **15** negatives per anchor, not 63
- Fixes: shuffle, GroupNorm, or synchronised BatchNorm`,
  narration:
    "When a large batch does not fit in memory, gradient accumulation runs several small batches, adds up their gradients, and steps once. It reproduces the gradient of the mean loss exactly, provided each microbatch's loss is divided by the number of microbatches. Four backward passes on sixteen examples then add up to the gradient of a batch of sixty-four, while activation memory is that of sixteen. What it does not reproduce is any layer that looks across the batch. Batch normalisation is the common one. Over the full sixty-four examples, this channel has a mean of nought point four five five and a standard deviation of nought point three six. The four microbatches see means of nought point eight five, nought point three nine, nought point one nine and nought point three nine. These batches were drawn in station order, so each microbatch holds images from one station, and each one is normalised with its own statistics. The network computes a different function than it would with a true batch of sixty-four, and the running statistics it stores for evaluation differ too. Other batch-dependent losses change in the same way: a contrastive loss gets fifteen negatives per anchor instead of sixty-three. Shuffle the data, switch to group normalisation, or synchronise batch norm statistics across microbatches or devices.",
}
