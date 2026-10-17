import type { Section } from '../types'

export const views: Section = {
  id: 'views',
  title: 'Positive views, false negatives, and collapse',
  scene: 'views',
  focus: 'augs',
  slide: `## What the views teach

A contrastive encoder learns to **ignore** whatever differs between two positive views. Choose views that change only what the task does not care about.

### Views that remove the defect
- Flips and small rotations keep a 2-pixel scratch: **safe**
- A random 30% crop often cuts the scratch out: the positive pair no longer **shares** the defect
- A strong blur erases it: the encoder learns that scratches **do not matter**

### False negatives
- Two images of similar dents in one batch are pushed **apart**

### Collapse
- Mapping every image to one point makes all views agree **trivially**
- Watch z.std(0): ≈ **0.088** when spread out, near **0** on collapse`,
  narration:
    "A contrastive encoder learns to ignore whatever differs between the two views of a positive pair. So the views must change only what the downstream task does not care about. For defect images that rules out some familiar augmentations. Horizontal flips and small rotations keep a two-pixel scratch, so they are safe. A random crop of thirty percent of the image often cuts the scratch out entirely, so the two views no longer share the defect, and the encoder is rewarded for matching a scratched view to a clean one. A strong blur erases fine scratches and teaches the encoder that scratches do not matter, the opposite of what inspection needs. Colour jitter keeps scratches, but it can hide discolouring, so check it per defect class. Two other failures come from the signal itself. False negatives arise when two images of very similar dents land in one batch: the loss pushes them apart even though they belong together. Group the batches, or drop near-duplicates from each other's negatives. Collapse is the extreme case: if every image maps to the same point, all views agree trivially. A cheap check is the standard deviation of the embeddings across a batch. For spread-out unit vectors in a hundred and twenty-eight dimensions it sits near nought point nought nine; falling towards zero means collapse.",
}
