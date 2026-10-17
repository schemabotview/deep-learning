import type { Section } from '../types'

export const batching: Section = {
  id: 'batching',
  title: 'Batching, padding and data contracts',
  scene: 'batching',
  focus: 'padded',
  slide: `## Batching and the data contract

Networks process **batches**, and a batch must be a rectangle — so ragged inputs are resized or padded.

### Padding text fragments
- Three fragments of length 3, 5 and 1 are padded to **[3, 5]** with a PAD id
- A **mask** marks real tokens with 1 and padding with 0
- Every later step that sums or averages must **use the mask**
- Images are resized to one shape instead, which is itself a **choice**
- Resizing can **blur** a fine scratch

### The contract every batch meets
- Shape, dtype and value range stated and checked
- One fixed **label map**: ok 0, scratch 1, dent 2
- Shuffle **within** training only
- Normalisation statistics computed on **training** data only
- The contract travels with the model to prediction time`,
  narration:
    "Neural networks process data in batches, and a batch is a single tensor, so it has to be a rectangle. Ragged inputs therefore need a rule. For text fragments, the rule is padding. Here three fragments of three, five and one tokens are padded with a special PAD token to a batch of shape three by five, and alongside them goes a mask, one for real tokens and zero for padding. The padding is a convenience for storage; it carries no information, so every later step that sums or averages over tokens has to use the mask, or the padding silently contaminates the result. Chapter two shows exactly that failure in a loss. For images, the rule is usually to resize every image to one shape, here sixty-four by sixty-four, and that is a modelling choice too, because resizing can blur a fine scratch. Together these rules make up a data contract that every batch must meet: the shape, the dtype and the value range, one fixed mapping from label names to indices, and normalisation statistics such as the mean pixel value, computed on training data only. The contract is not just for training. The same rules have to hold at prediction time.",
}
