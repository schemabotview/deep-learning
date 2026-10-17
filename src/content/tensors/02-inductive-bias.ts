import type { Section } from '../types'

export const inductiveBias: Section = {
  id: 'inductive-bias',
  title: 'Inductive bias and classical baselines',
  scene: 'inductive-bias',
  focus: 'scores',
  slide: `## Inductive bias and baselines

Every model family assumes something about the data — its **inductive bias** — and the right assumption matters more than size.

### Reading the comparison
- The majority class scores **0.27** macro-F1: the floor
- Twelve hand features with logistic regression reach **0.71** with 39 parameters
- An MLP on raw pixels reaches only **0.69** with 393,347
- A small CNN reaches **0.86** with about 24,000

### What that says
- The MLP has no notion of **nearby pixels**: a scratch shifted by one pixel is a new input
- The CNN assumes local, repeated patterns, which fits defects
- A neural approach is a **hypothesis**: it has to beat the baseline on the same split
- These are **validation** scores on a split by production batch`,
  narration:
    "Every model family builds in an assumption about the data, called its inductive bias, and on this task the assumption matters far more than the parameter count. The table compares four candidates on the same validation split, made by production batch, scored by macro-averaged F1 across the three classes. Always predicting the most common class gives nought point two seven: the floor. Twelve hand-designed features with logistic regression reach nought point seven one, with only thirty-nine parameters. The fully connected network on raw pixels, with nearly four hundred thousand parameters, does slightly worse, nought point six nine. Its bias is a poor fit: it treats every pixel as an unrelated input, so a scratch shifted by one pixel looks like a completely new pattern, and it has to learn the same scratch at every position separately. A small convolutional network, about twenty-four thousand parameters, reaches nought point eight six, because it assumes that useful patterns are local and repeat across the image, which is exactly what defects do. Chapter six explains how. The lesson for now is that a neural approach is a hypothesis to be tested against a baseline, on the same split, not a default.",
}
