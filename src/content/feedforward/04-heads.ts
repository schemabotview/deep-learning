import type { Section } from '../types'

export const heads: Section = {
  id: 'heads',
  title: 'Regression, binary, multiclass and multilabel heads',
  scene: 'heads',
  focus: 'table',
  slide: `## Choosing the output head

The **target** decides the output head, and the head decides the loss — get any pair wrong and training still runs.

### Four heads
- **Regression**: one raw value, squared error — scratch length in mm
- **Binary**: one logit, \`BCEWithLogitsLoss\` — any defect at all?
- **Multiclass**: K logits, \`CrossEntropyLoss\` with int64 class indices — ok, scratch *or* dent
- **Multilabel**: K logits, a sigmoid each — scratch *and* dent can both be true

### Contract mismatches that run silently
- Multiclass targets as one-hot floats where indices are expected, or the reverse
- Applying sigmoid or softmax **before** a loss that expects logits
- A [N] target against an [N, 1] output — chapter 1's broadcast bug`,
  narration:
    "The output layer of a network is called its head, and choosing it is not a matter of taste: the target decides the head, and the head decides the loss. The same workshop can ask four different questions. How long is the scratch, in millimetres? That is regression: one raw output and a squared-error loss. Is there any defect at all? That is binary: one logit, and the binary cross-entropy loss that takes logits directly. Is the part ok, scratched or dented? That is multiclass, exactly one class per image: three logits and cross-entropy, with the targets given as integer class indices. Could a part be both scratched and dented? That is multilabel: three logits, each with its own sigmoid, each answered independently, again with binary cross-entropy but now against a row of zeros and ones. The dangerous part is that mismatches often run without error. Pass one-hot float targets where indices are expected, apply a softmax or sigmoid yourself before a loss that already does it, or give a target of shape N against an output of shape N by one, and training proceeds, the loss goes down, and the model learns something other than you intended.",
}
