import type { Section } from '../types'

export const regularisers: Section = {
  id: 'regularisers',
  title: 'Dropout, weight penalties and early stopping',
  scene: 'regularisers',
  focus: 'dropout',
  slide: `## Dropout, decay and early stopping

Three standard regularisers, each restraining a network in a different way.

### Dropout, traced
- In train mode, each activation is zeroed with probability p = 0.25
- Survivors are scaled by 1 / 0.75: [1, 2, 3, 4] becomes **[1.33, 0, 4, 5.33]**
- The **expected** value of every element is unchanged
- In eval mode dropout is the identity: [1, 2, 3, 4]

### Compared on the defect CNN
- No regulariser: training **0.99**, validation **0.80** — a gap of 0.19
- Dropout, decay or early stopping each narrow it; together the gap is **0.06**
- These are means of three seeds; differences under 0.01 are **noise**
- Use decoupled decay, as chapter 4 showed`,
  narration:
    "Three regularisers are standard in neural networks, and each restrains the model differently. Dropout is the most distinctive. In training mode, every activation is independently set to zero with some probability, here a quarter, and the survivors are scaled up by one over three quarters. Traced on the vector one, two, three, four with the second element dropped, the output is one point three three, zero, four, and five point three three. The scaling keeps the expected value of every element unchanged, so the next layer sees inputs of the same average size in training and in evaluation. In evaluation mode dropout does nothing at all. Because a unit cannot rely on any particular other unit being present, the network is pushed toward redundant, more robust features. Weight decay shrinks weights toward zero, and as chapter four showed, with Adam it should be decoupled. Early stopping simply halts at the best validation epoch. On the defect CNN, with no regulariser, training macro F1 is nought point nine nine and validation nought point eight, a gap of nought point one nine. Each regulariser narrows the gap, and all three together bring it to six hundredths. These are averages over three seeds, so differences under a hundredth are noise.",
}
