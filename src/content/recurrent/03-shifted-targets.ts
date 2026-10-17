import type { Section } from '../types'

export const shiftedTargets: Section = {
  id: 'shifted-targets',
  title: 'Shifted autoregressive targets and masks',
  scene: 'shifted-targets',
  focus: 'shift',
  slide: `## Predict the next token

An **autoregressive** objective turns one sequence into many training examples: at each position, predict the next token.

### Shifting by one
- Inputs are tokens[:−1]; targets are tokens[1:]
- From BOS, predict *scratch*; from *scratch*, predict *on*; … from *lid*, predict **EOS**
- The model at position *t* must see only inputs up to *t*
- One sequence of length T gives **T − 1** training targets at once

### Masking the padding
- Per-position loss is −ln p(target): **0.916, 0.693, 1.204, 0.511**
- The PAD target is easy: p = 0.98, a loss of only 0.02
- Mean over the 4 **valid** positions: **0.831**
- Including the PAD position drags it to **0.669** — chapter 2's padding bug again
- Pass \`ignore_index=PAD_ID\` to the loss`,
  narration:
    "An autoregressive objective turns a single sequence into many training examples. At every position, the model predicts the next token. In practice that is done by shifting: the inputs are the sequence without its last token, and the targets are the sequence without its first. So from the beginning-of-sequence marker, predict scratch; from scratch, predict on; from on, predict lid; and from lid, predict the end marker. Every position trains at once, which is why this objective is so data-efficient, but it only makes sense if the prediction at position t depends on inputs up to t and no further. A recurrent network satisfies that by construction; chapter nine shows how transformers enforce it with a mask. Our fragment was padded to six tokens, so the last target is padding, and that position must not count. The table shows the model's probability for each true target and the loss, minus its logarithm: nought point nine one six, nought point six nine three, one point two zero four and nought point five one one. Predicting padding after the end marker is trivially easy, a loss of two hundredths. Averaged over the four valid positions, the loss is nought point eight three one. Include the padding and it drops to nought point six six nine, a better number for a meaningless reason.",
}
