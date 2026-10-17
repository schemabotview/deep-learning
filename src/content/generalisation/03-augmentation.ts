import type { Section } from '../types'

export const augmentation: Section = {
  id: 'augmentation',
  title: 'Label-preserving augmentation and shortcuts',
  scene: 'augmentation',
  focus: 'transforms',
  slide: `## Augmentation and shortcuts

Augmentation creates new training images by transforming old ones — valid only if the transform **keeps the label true**.

### Label-preserving, or not
- Flips, small rotations and brightness changes keep a scratch a scratch
- A **random crop** can cut the scratch out, leaving an image labelled *scratch* that shows none
- **Heavy blur** erases fine scratches: the label silently becomes wrong
- Apply augmentation to **training** images only

### Shortcuts
- Validation on the same stations: **0.91** — looks excellent
- On a new station: **0.62** — dents had been photographed on the grey rework bench
- The model learned the **background**; with it masked, **0.85**
- Test on data that breaks the shortcut: a new station, a new bench, a new camera`,
  narration:
    "Augmentation enlarges the training set by transforming existing images: flip them, rotate them slightly, change the brightness. It works when the transformation keeps the label true. A horizontal flip of a scratched part is still a scratched part. A rotation of ten degrees matches how camera mountings vary. A brightness change matches the lighting. But some common transforms change the label without saying so. A random crop that keeps half the image can cut the scratch out entirely, leaving an image labelled scratch that shows no scratch, and the model is taught that clean metal sometimes means scratched. A heavy blur erases fine scratches in the same way. Augmentation is applied to training images only, never to validation or test. The second half of this section is about shortcuts, which augmentation alone does not fix. Our model scores nought point nine one on validation images from the same stations, which looks excellent. On a newly installed station it scores nought point six two. The reason: in the training data, dented parts had mostly been photographed on the grey rework bench, and the model learned to recognise the bench. With the background masked, it scores nought point eight five. Test on data that breaks the shortcut.",
}
