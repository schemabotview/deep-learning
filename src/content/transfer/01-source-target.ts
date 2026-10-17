import type { Section } from '../types'

export const sourceTarget: Section = {
  id: 'source-target',
  title: 'Source/target objectives and negative transfer',
  scene: 'source-target',
  focus: 'curves',
  slide: `## Source and target

Transfer reuses an encoder trained on a **source** task for a **target** task. It helps only as far as the two share what the target needs.

### The learning curves (validation evidence)
- From scratch, the small CNN needs data: **0.52** at 600 images, **0.87** at 2,400
- Pretrained on general photos and fine-tuned: **0.85** at 600, **0.93** at 2,400
- Pretrained on clean CAD renders: ahead at 150 images, then flat at **0.84**

### Negative transfer
- At 2,400 images starting from renders **loses** to scratch, 0.84 against 0.87
- Renders share part **shape**, but carry no scratches, dents or texture

### Ask before transferring
- Does transfer still win at the **full** labelled budget?`,
  narration:
    "Transfer learning reuses an encoder trained on one task, the source, as the starting point for another, the target. It helps exactly as far as the two tasks share what the target needs. These learning curves are validation evidence on the workshop defect task, split by production batch. The small convolutional network from scratch needs data: it reaches nought point five two with six hundred labelled images and nought point eight seven with all two thousand four hundred. An encoder pretrained on a large set of general photographs, then fine-tuned, reaches nought point eight five with only six hundred images, and nought point nine three at the full budget. Its source objective, naming objects, rewarded features for edges, texture and lighting, which defect detection needs. The third curve starts from an encoder trained on clean computer renders of the parts. It is ahead at a hundred and fifty images, then stalls at nought point eight four, below the model trained from scratch. That is negative transfer. The renders share the parts' shape, but contain no scratches, dents or surface texture, so their features are a poor starting point. Before transferring, ask what the source objective rewarded, how close its images are to the target camera, and whether transfer still wins at the full labelled budget.",
}
