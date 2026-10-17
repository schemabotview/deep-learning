import type { Section } from '../types'

export const stableSoftmax: Section = {
  id: 'stable-softmax',
  title: 'Stable softmax, log-sum-exp and reductions',
  scene: 'stable-softmax',
  focus: 'overflow',
  slide: `## Stable softmax and reductions

The textbook softmax formula **overflows** on large logits; the stable form gives the same answer without it.

### The overflow
- exp(1000) is **inf** in float32 and float64 alike, so the ratio is inf / inf = **NaN**
- Subtracting the largest logit first changes nothing mathematically
- [0, −1, −2] exponentiate safely: softmax **0.665, 0.245, 0.090**
- Log-sum-exp = max + log Σ exp(z − max) = **1000.408**

### Reductions
- **mean** averages over the batch: the gradient scale does not depend on batch size
- **sum** grows with the batch, so learning rates stop transferring between batch sizes
- **none** returns one loss per example, for masking or weighting
- Built-in losses already use the stable forms: prefer them to hand-written formulas`,
  narration:
    "The softmax formula as usually written exponentiates the logits directly, and that breaks on large values. The exponential of one thousand is far beyond what any floating-point format can hold, so it becomes infinity, and infinity divided by infinity is not a number. One NaN in a loss spreads to every gradient and every weight within a step. The fix costs nothing. Softmax is unchanged if you subtract the same constant from every logit, so subtract the largest one first. Logits of one thousand, nine hundred and ninety-nine and nine hundred and ninety-eight become zero, minus one and minus two, which exponentiate safely and give probabilities of nought point six six five, nought point two four five and nought point zero nine. The log of the denominator, called log-sum-exp, is computed the same way: the maximum plus the log of the shifted sum. Then there is the reduction, how per-example losses become one number. Mean keeps the gradient's scale independent of batch size. Sum makes it grow with the batch, so a learning rate tuned at one batch size no longer fits another. None keeps every example's loss, for masking or weighting. The built-in losses already use the stable forms, which is a good reason to prefer them.",
}
