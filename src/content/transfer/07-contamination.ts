import type { Section } from '../types'

export const contamination: Section = {
  id: 'contamination',
  title: 'Probe/fine-tune evaluation and contamination',
  scene: 'contamination',
  focus: 'scores',
  slide: `## Evaluating transfer honestly

A pretrained encoder can have **seen** the test images, without labels, during pretraining. That still inflates the test score.

### The contaminated test (final-test results)
- The archive used for pretraining held **310** of the 480 test images
- On all 480, the probe scores **0.89** and the fine-tune **0.91**
- On the **170** never-seen images: **0.78** and **0.84**
- The probe gains most, **0.11**: it relies entirely on the pretrained features

### Keeping it clean
- Remove test **batches** from the pretraining pool, by batch id and image hash

### Report both protocols
- **Linear probe**: what the frozen features already separate
- **Fine-tune**: how far the body can adapt; state groups, rates, budget`,
  narration:
    "Self-supervised pretraining uses no labels, so it is tempting to pretrain on every image available, including the test images. But an encoder that has seen the test images has already learned their particular lighting, backgrounds and defects, and that inflates the test score. In this example the camera archive used for pretraining held three hundred and ten of the four hundred and eighty test images. These are final-test results for one encoder and head. On all four hundred and eighty images the linear probe scores nought point eight nine and the fine-tuned model nought point nine one. On the hundred and seventy images that were never in the archive, they score nought point seven eight and nought point eight four. The probe gains most from contamination, eleven points, because it relies entirely on the pretrained features. Keeping it clean means removing the test batches from the pretraining pool before pretraining, by batch identifier and image hash, and checking for near-duplicates, such as the same part photographed twice, not just identical files. The clean score is the result to report. Report both protocols on the same splits. A linear probe shows what the frozen features already separate. A fine-tune shows how far the body can adapt, and needs its parameter groups, rates and budget stated.",
}
