import type { Section } from '../types'

export const crossEntropy: Section = {
  id: 'cross-entropy',
  title: 'Logits, cross-entropy and likelihood',
  scene: 'cross-entropy',
  focus: 'trace',
  slide: `## Logits and cross-entropy

**Logits** are raw scores; softmax turns them into probabilities that sum to 1; cross-entropy scores the probability of the true class.

### One image, traced
- Logits [2.0, 0.5, −1.0] give probabilities **0.786, 0.175, 0.039**
- If the label is *ok*, the loss is −ln 0.786 = **0.241**
- If the label is *scratch*, it is **1.741**; if *dent*, **3.241**
- Only the true class's probability enters the loss

### What it means
- Cross-entropy is the **negative log-likelihood** of the labels under the model
- Minimising it pushes probabilities to match observed frequencies
- \`F.cross_entropy\` takes **logits** and applies log-softmax itself
- Softmaxing first and passing that in applies softmax **twice**`,
  narration:
    "A multiclass head outputs logits, one raw score per class, which can be any real numbers. Softmax turns them into probabilities: exponentiate each, then divide by the total, so they are positive and add up to one. Take one image with logits two, nought point five and minus one, for ok, scratch and dent. Softmax gives nought point seven eight six, nought point one seven five and nought point zero three nine. Cross-entropy looks only at the probability assigned to the true class and takes minus its logarithm. If this image really is ok, the loss is nought point two four one, small, because the model was fairly confident and right. If it is actually scratched, the loss is one point seven four. If it is dented, three point two four, because the model gave that class under four percent. Averaged over a batch, this is the negative log-likelihood of the labels under the model, the probability theory belonging to the statistics course, and minimising it pushes the predicted probabilities toward the frequencies seen in the data. In PyTorch, the cross-entropy function takes logits and applies its own log-softmax internally. Passing in probabilities you have already softmaxed applies softmax twice, which runs, and quietly trains worse.",
}
