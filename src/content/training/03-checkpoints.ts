import type { Section } from '../types'

export const checkpoints: Section = {
  id: 'checkpoints',
  title: 'Validation, checkpoint selection and protected tests',
  scene: 'checkpoints',
  focus: 'curves',
  slide: `## Choosing a checkpoint

Training loss keeps falling; the checkpoint worth keeping is chosen by **validation**.

### Reading the curves
- Training loss falls every epoch, toward **0.15**
- Validation loss bottoms out at epoch **17** (0.411), then rises as the model overfits
- Keep the epoch-17 weights, not the last ones
- Save whenever validation **improves**

### The boundaries
- The selected epoch is a **choice**: its validation score is selection evidence
- Validation is split **by production batch**, like the test set
- The test set is opened **once**, after the checkpoint, architecture and settings are fixed
- Early stopping is this same choice, made **during** the run
- Save model, optimiser, schedule, epoch and RNG state with the checkpoint`,
  narration:
    "A training run produces a sequence of models, one per epoch, and we have to choose which one to keep. Training loss is no guide: it falls every epoch, heading toward about nought point one five, because the model keeps fitting its training images more closely. Validation loss tells the real story. It falls at first, reaches its lowest point at epoch seventeen, nought point four one one, and then rises as the model starts to memorise the training images instead of learning defects in general. So we keep the epoch-seventeen weights, not the last ones. This is the same selection logic as the Machine Learning course, applied to training time. The chosen epoch is a choice made by looking at validation data, so its validation score is selection evidence and is somewhat optimistic. The validation split must respect the same boundaries as the final test, here split by production batch, or the choice is tuned to batches it has already seen. And the test set is opened exactly once, after the checkpoint, the architecture and every training setting are fixed. When saving the chosen checkpoint, save the full state, model, optimiser, schedule, epoch and random states, which the last section of this chapter shows the reason for.",
}
