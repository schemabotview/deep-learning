import type { Section } from '../types'

export const maskedLoss: Section = {
  id: 'masked-loss',
  title: 'Weighted, masked and multi-head losses',
  scene: 'masked-loss',
  focus: 'tokens',
  slide: `## Masked and multi-head losses

A loss averages over **something** — and padding, weights and extra heads all change what that is.

### Padding contaminates a mean
- Pad positions are easy to predict, so their losses are tiny: **0.01**
- Averaged over all 6 positions, the loss reads **0.370**
- Averaged over the 4 real tokens, it is **0.550**
- Use \`reduction="none"\` with the mask, or \`ignore_index\` for the pad id
- The unmasked loss **improves** as batches hold more padding

### Several heads, one objective
- A defect head and a scratch-length head can share one network
- Total loss = cross-entropy + 0.5 × length MSE: the **0.5** is a modelling choice
- Losses are for training; report each head's **metric** separately`,
  narration:
    "Every reduced loss is an average over something, and it pays to check what. Here are per-token losses for two text fragments padded to the same length. The second fragment has only one real token; its other two positions are padding. Padding is trivially easy to predict, so the model's loss there is tiny, nought point zero one. Average over all six positions and the loss reads nought point three seven. Average over the four real tokens and it is nought point five five. The unmasked number is not just wrong; it improves whenever batches contain more padding, so it rewards nothing real, and its gradients push effort toward predicting pads. The fix is to compute per-token losses with no reduction, multiply by the mask, and divide by the number of real tokens, or to tell the loss which index to ignore. Weighted and multi-head objectives raise the same question. A network can have a defect-class head and a scratch-length head sharing one body, trained on cross-entropy plus a half times the length error. That half is a modelling choice that trades one task against the other. And the loss is for training: report each head with its own metric, separately.",
}
