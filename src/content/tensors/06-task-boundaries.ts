import type { Section } from '../types'

export const taskBoundaries: Section = {
  id: 'task-boundaries',
  title: 'Neural tasks and prediction-time boundaries',
  scene: 'task-boundaries',
  focus: 'contract',
  slide: `## The task contract

Neural models need the **same prediction contract** as any model — and images make some leaks easy to miss.

### The defect task
- Unit: one part, photographed **before packing**; input: the image only
- Target: ok, scratch or dent, as labelled by an inspector
- Two inspectors disagree on **8 %** of images: the labels are uncertain, so record it

### Boundaries that leak
- Images from one **production batch** share lighting, camera and lot: split by batch
- Burst photos of one part are **near-duplicates** across a random split
- Rework notes and returns arrive **later** and must not become inputs
- A random image split here overstates performance on new batches`,
  narration:
    "A neural model needs exactly the same prediction contract as any model from the Machine Learning course, and image data makes some of the leaks especially easy to miss. The unit is one part, photographed at the inspection station before it is packed, and the only input is that image, because the prediction has to be made at that moment. The target is ok, scratch or dent, as labelled by an inspector, and the decision it supports is whether to route the part for a manual check. The labels are not perfect: when two inspectors labelled the same images, they disagreed on eight percent, and that uncertainty belongs in the contract, because no model can be more reliable than the labels it is scored against. Then the boundaries. Images from one production batch share lighting, camera position and material lot, so if images from the same batch land on both sides of a split, the model can recognise the batch rather than the defect. The split is therefore by batch. The station also takes burst photos, near-duplicates of the same part, which a random split would scatter across training and test. And rework notes or customer returns arrive later, so they can never be inputs.",
}
