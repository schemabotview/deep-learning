import type { Section } from '../types'

export const teacherForcing: Section = {
  id: 'teacher-forcing',
  title: 'Teacher forcing, temporal evaluation and long-range failures',
  scene: 'teacher-forcing',
  focus: 'horizon',
  slide: `## Trained on the truth, tested on itself

**Teacher forcing** trains each step on the **true** previous values — but at prediction time the model must use its **own**.

### The gap
- One-step error, with true history fed in: **0.8 °C** at every horizon
- Feeding its own predictions back, errors **compound**: about **4 °C** twelve steps ahead
- A one-step validation score overstates a twelve-step forecast

### Evaluate as deployed
- Train **Jan–Jun**, choose on **Jul**, test once on **Aug**
- Score at the **horizons** the decision needs, free-running
- Never shuffle windows across the time cut

### Long-range limits
- Dependencies beyond the truncation window, or past what the state can hold, are **lost** — chapter 8`,
  narration:
    "Sequence models that generate their own future, a forecast several steps ahead or a continued note, are usually trained with teacher forcing: at each training step, the model is fed the true previous value, not its own earlier prediction. That makes training fast and stable. But at prediction time the true future values do not exist, so the model has to feed its own predictions back in, and any error it makes becomes part of its next input. The plot shows the consequence for the sensor forecast. Measured one step at a time with the true history supplied, the error is about nought point eight degrees at every horizon. Run free, feeding its own predictions back, the errors compound, reaching about four degrees twelve steps ahead. A one-step validation score badly overstates a twelve-step forecast. So the evaluation has to imitate deployment. Train on January to June, choose the checkpoint and settings on July, and test once on August, running the model free at the horizons the decision actually needs. Never shuffle windows across that time cut. And note the remaining limit: dependencies longer than the truncation window, or than the state can hold, are simply lost, which is the problem attention addresses next.",
}
