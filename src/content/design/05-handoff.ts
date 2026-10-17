import type { Section } from '../types'

export const handoff: Section = {
  id: 'handoff',
  title: 'Unresolved limitations and engineering handoff',
  scene: 'handoff',
  focus: 'open',
  slide: `## What offline evidence leaves open

A recommendation is not readiness. Offline evidence answers some questions and **names** the rest, with an owner for each.

### Still open
- **New stations**: 0.83 on station C against 0.91 on test
- **Dent recall** 0.86: about one dent in seven is missed
- **Label ceiling**: 8% of images disputed
- **Live inputs**: blank frames and lighting changes need checks
- **Drift over time**: no evidence yet; it is not offline

### The handoff package
- Checkpoint and manifest, the evidence card, the split file
- The sensor model with its own, separate evidence

### Owned elsewhere
- Serving, monitoring and retraining belong to **MLOps**`,
  narration:
    "A model recommendation is not the same as operational readiness. Offline evidence answers some questions and should name the rest, each with an owner. Five remain open here. New stations: the model scores nought point eight three on station C against nought point nine one on the test batches, so how much station data would close that gap is a question for the domain and modelling teams. Dent recall: at eighty-six percent, about one dent in seven is missed, and only the domain experts can say what a missed dent costs. The label ceiling: inspectors disagree on eight percent of images, and adjudicating those images might be worth more than any model change. Live inputs: chapter eleven showed that blank frames and lighting changes slip past reconstruction scores, so checks must run before a prediction is trusted. And drift over time: there is no evidence at all yet, because none of it can be gathered offline. The handoff package carries the checkpoint and its manifest, an evidence card with the validation, test and station C results, the split file, the budgets, and the table of known limits. The sensor model goes with its own separate evidence. Serving, monitoring and retraining are then implemented by the MLOps side, which is where the companion course picks up.",
}
