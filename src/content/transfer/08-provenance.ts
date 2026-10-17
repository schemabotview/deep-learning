import type { Section } from '../types'

export const provenance: Section = {
  id: 'provenance',
  title: 'Provenance, data suitability, and bounded adaptation choices',
  scene: 'provenance',
  focus: 'choice',
  slide: `## Provenance and bounded adaptation

A pretrained checkpoint is a dependency. Record where it came from, then choose the **smallest** adaptation the evidence supports.

### Record with the checkpoint
- **Source data**: what it was, when it was collected, under what licence
- **Preprocessing**: input size and the normalisation mean and std it expects
- **Weights hash**, an **overlap check** against test batches, and **use terms**

### A bounded choice
- ~150 labels, close source: start with a **linear probe**
- ~600 labels: **last stage + head**; go further only if per-layer rates win on validation
- 2,400 labels: compare **full fine-tune** with scratch on the same split
- Unclear or unlicensed source: train **from scratch** until resolved
`,
  narration:
    "A pretrained checkpoint is a dependency like any other, and it brings assumptions with it. Record where it came from before you build on it. That means the source data, what it contained, when it was collected and under what licence. The objective it was trained with, supervised labels or a particular self-supervised signal. The preprocessing it expects, the input size and the normalisation mean and standard deviation, since feeding it differently scaled images quietly degrades every feature. The exact weights file, by hash. An overlap check against your test batches. And the terms that say whether it may be used for this purpose at all. With that recorded, choose the smallest adaptation the evidence supports. With about a hundred and fifty labels and a close source, start with a linear probe. With about six hundred, train the last stage and the head, and go further only if per-layer rates beat that on validation. With all two thousand four hundred, compare full fine-tuning against training from scratch on the same split, because transfer is no longer guaranteed to win. If the source is unclear or its licence does not allow this use, train from scratch until that is resolved. Finally, record whether the batch norm statistics were frozen or adapted, because that changes the model too.",
}
