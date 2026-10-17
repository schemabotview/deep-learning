import type { Section } from '../types'

export const batchnorm: Section = {
  id: 'batchnorm',
  title: 'Batch normalisation and running statistics',
  scene: 'batchnorm',
  focus: 'trace',
  slide: `## Batch normalisation

Batch norm normalises each channel using the **current batch's** statistics in training, and stored **running** statistics in evaluation.

### Traced on one channel
- Batch [2, 4, 6, 8]: mean **5**, variance **5**
- Training output: **[−1.34, −0.45, 0.45, 1.34]** — zero mean, unit variance
- Running mean moves 10 % toward the batch: 0 → **0.50**; running variance 1 → **1.57**
- Eval mode on the **same** batch uses those running stats: **[1.20, 2.80, 4.39, 5.99]**

### Consequences
- Running statistics need **many steps** to warm up
- Train and eval outputs **differ** by design; forgetting \`eval()\` lets validation update them
- Results depend on **batch size**: tiny batches give noisy statistics
- Running statistics are **buffers**, saved with the model`,
  narration:
    "Batch normalisation standardises each channel so that later layers see inputs of a stable scale, and it behaves differently in training and evaluation. Here it is on a single channel with a batch of four values: two, four, six and eight. In training mode it uses the batch's own statistics, a mean of five and a variance of five, and the output is minus one point three four, minus nought point four five, nought point four five and one point three four: zero mean and unit variance. Learned scale and shift parameters then let the network undo that if it helps; here they are at their defaults. At the same time, it updates running statistics, moving them ten percent of the way toward this batch: the running mean goes from zero to a half, the running variance from one to one point five seven. In evaluation mode it uses those running statistics instead of the batch's. Applied to the very same batch, the output is now one point two up to six. That is not a bug: the running statistics simply need many training steps to settle. The consequences are worth remembering. Forgetting eval lets validation batches change the statistics. Tiny batches give noisy statistics. And the running statistics are buffers, saved with the model.",
}
