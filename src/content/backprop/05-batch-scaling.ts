import type { Section } from '../types'

export const batchScaling: Section = {
  id: 'batch-scaling',
  title: 'Batch and reduction scaling',
  scene: 'batch-scaling',
  focus: 'reductions',
  slide: `## The reduction scales the gradient

A batch gradient is built from per-example gradients, and the **reduction** decides its size.

### Four examples, one weight
- Per-example gradients: 0.8, −0.2, 0.5, 0.1
- With **mean** reduction, .grad is their average: **0.30**
- With **sum**, it is **1.20** — four times larger, and it grows with the batch
- The mean keeps the gradient's scale **independent** of batch size

### Accumulating micro-batches
- Two micro-batches of 2, each with a mean loss, accumulate to **0.60**: twice the true mean
- Divide each micro-batch loss by the number of accumulation steps
- A learning rate tuned for one gradient scale is **wrong** for another
- Check the scale whenever batch size or accumulation changes`,
  narration:
    "A batch's gradient is assembled from the gradients of its individual examples, and the loss reduction decides how. Take one weight and a batch of four examples whose separate gradients are nought point eight, minus nought point two, nought point five and nought point one. With the default mean reduction, the loss is the average over the batch, so the weight's gradient is the average of the four: nought point three. With sum reduction, it is their total, one point two, four times larger, and it would be eight times larger with a batch of eight. That matters because the learning rate multiplies the gradient. A learning rate tuned with mean reduction is far too large under sum, and a sum-based setup does not transfer between batch sizes. The same trap appears with gradient accumulation, where a large batch is processed as several smaller micro-batches. Split our four examples into two micro-batches of two, compute a mean loss on each, and call backward on both without clearing: the accumulated gradient is nought point six, twice the true mean. The fix is to divide each micro-batch's loss by the number of accumulation steps. Whenever batch size or accumulation changes, check the gradient's scale.",
}
