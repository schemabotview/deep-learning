import type { Section } from '../types'

export const rationale: Section = {
  id: 'rationale',
  title: 'Task/architecture/objective rationale and baseline',
  scene: 'rationale',
  focus: 'contract',
  slide: `## Start from the task, not the model

A neural design is justified by the **task contract** it serves. Fix the contract first, then put candidates on the list for a reason.

### The contract
- One image at inspection time → ok, scratch or dent
- Split by **production batch**; metric macro-F1, with dent recall
- Budget: **≤ 50 ms** per image on CPU
- Ceiling: inspectors agree on **92%** of images

### The candidates, each testing an assumption
- **Hand features + logistic**, 39 parameters: the bar to clear
- **MLP on pixels**: does capacity alone help?
- **Small CNN**, 23,779 parameters: local, repeated patterns
- **Fine-tuned ResNet-18**: do general visual features transfer?
`,
  narration:
    "A neural design is justified by the task it serves, so this last chapter starts from the task contract, not from a model. The contract for the workshop is fixed before any training. The input is one image, available at inspection time, and the output is one of three classes: ok, scratch or dent. Data is split by production batch, so no batch contributes to both training and evaluation. The metric is macro F one, with dent recall reported alongside, because dents are the costly miss. The budget is fifty milliseconds per image on the inspection station's CPU. And there is a ceiling: two inspectors agree on only ninety-two percent of images, so scores much above that mean little. Every candidate is on the list because it tests a specific assumption. Hand-made features with logistic regression, thirty-nine parameters, are the baseline that any network must clear. An MLP on raw pixels asks whether capacity alone helps. The small convolutional network from chapter six asks whether local, repeated patterns are the right bias. And a fine-tuned ResNet eighteen, from chapter ten, asks whether general visual features transfer to this camera. All four use cross-entropy, so the comparison isolates the architecture and its starting point, not the objective.",
}
