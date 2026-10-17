import type { Section } from '../types'

export const sequenceTasks: Section = {
  id: 'sequence-tasks',
  title: 'Sequence task types and information availability',
  scene: 'sequence-tasks',
  focus: 'tasks',
  slide: `## What may the model see?

For ordered data, the central contract is **which steps are visible** when each prediction is made.

### Four task types
- **Sequence classification**: a finished note gets one label — every word may be used
- **Causal forecasting**: from the sensor history up to *t*, predict *t* + 1 — no future steps
- **Tagging**: one output per step — the future is visible only if the input is complete
- **Generation**: produce a sequence left to right — each step sees only the past

### Boundaries for the sensor task
- Split **by time**: train on earlier months, test on later ones
- Split **by machine** too if the claim covers new machines
- Training windows must never **straddle** the split boundary
- Readings that arrive **late** are not available on time`,
  narration:
    "For ordered data, the most important part of the contract is which steps are visible when each prediction is made, and the answer depends on the task. Sequence classification gives one label to a complete sequence: a finished inspector's note, labelled as a dent report or not. Every word exists by the time we predict, so the model may use all of them, in any direction. Causal forecasting is the opposite: from the sensor history up to time t, predict the reading at t plus one. The future has not happened yet, so it must never be visible, in training any more than at prediction time. Tagging gives one output per step, and may use later steps only if the whole input really is available when predictions are made. Generation produces a sequence one step at a time, left to right, so each step sees only what came before. For the sensor task, the boundaries come straight from the Machine Learning course. Split by time, training on earlier months and testing on later ones. Split by machine as well if the claim is about machines the model has never seen. Training windows must not straddle the split. And readings that arrive late are not available at prediction time, even if they are timestamped earlier.",
}
