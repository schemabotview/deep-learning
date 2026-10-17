import type { Section } from '../types'

export const resume: Section = {
  id: 'resume',
  title: 'Resume state, and optimiser versus generalisation failures',
  scene: 'resume',
  focus: 'curve',
  slide: `## Resuming, and naming the failure

A run resumed with only the model weights is **not** the same run.

### Resuming correctly
- Restored with optimiser and schedule state, the loss continues **smoothly**
- With weights only, Adam's moments restart at zero: the first steps are mis-scaled, and the loss **spikes**
- The schedule restarts too: warmup again, or the wrong learning rate
- Save and restore model, optimiser, schedule, step, and RNG state **together**

### Optimisation or generalisation?
- Training loss **will not fall**: an optimisation failure — learning rate, initialisation, gradients, data pipeline
- Training falls but validation **does not**: a generalisation failure — chapter 5
- The remedies differ, so name the failure **before** changing anything`,
  narration:
    "Long runs get interrupted, and resuming one correctly needs all of its state. The plot shows a run stopped at step two thousand and resumed two ways. Restored with the model, optimiser and schedule state, the training loss carries on as if nothing had happened. Restored with only the model weights, the loss jumps. Adam's running moment estimates have been reset to zero, so its first steps after the restart are scaled as if training had just begun, and the schedule may restart its warmup or sit at the wrong learning rate. The model recovers eventually, but it is no longer the same run, and any comparison with an uninterrupted run is muddied. The fix is to save and restore everything together: model, optimiser, schedule, the step count and the random states. The second half of this section is about naming failures correctly, because their remedies differ. If training loss will not fall, it is an optimisation failure, and the suspects are the learning rate, initialisation, the gradients themselves, or a broken data pipeline. If training loss falls but validation loss does not, it is a generalisation failure, the subject of the next chapter. Changing the regulariser will not fix an optimiser problem, and the reverse.",
}
