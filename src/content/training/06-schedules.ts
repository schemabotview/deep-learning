import type { Section } from '../types'

export const schedules: Section = {
  id: 'schedules',
  title: 'Schedules, clipping and numerical diagnostics',
  scene: 'schedules',
  focus: 'lr',
  slide: `## Schedules, clipping and diagnostics

The learning rate need not be constant, and individual steps can be kept from blowing up.

### Learning-rate schedules
- **Warmup** raises the rate over the first 500 steps, while Adam's moment estimates settle
- **Cosine decay** then lowers it smoothly toward zero
- The schedule is part of the setup: changing total steps changes it

### Gradient clipping
- Clipping by global norm rescales the whole gradient when its norm exceeds a limit
- A norm of **12** clipped to **1** is scaled by **0.083**; its direction is unchanged
- Clipping hides symptoms too: log how often it fires

### Diagnostics worth logging
- Loss (stop on NaN or inf), gradient norm, current learning rate, share of **dead** ReLU units`,
  narration:
    "Two tools shape the steps beyond the optimiser's own rule. The first is the learning-rate schedule. A common pattern starts with warmup, raising the learning rate linearly from zero over the first five hundred steps, which gives Adam's running moment estimates time to settle before large steps are taken. Then cosine decay lowers the rate smoothly toward zero by the end of training, so the final steps are small and refine rather than disrupt. The schedule is part of the experiment's setup, and because it is defined over the total number of steps, changing the training length changes the schedule too. The second tool is gradient clipping. Clipping by global norm measures the size of the entire gradient across all parameters and, if it exceeds a limit, rescales it. A gradient of norm twelve, clipped to one, is multiplied by one twelfth; every component shrinks by the same factor, so the direction is unchanged and only the step length is capped. Clipping protects against a single bad batch, but it can also hide a real problem, so log how often it fires. In general, log the loss and stop on NaN, the gradient norm, the learning rate actually in use, and the share of ReLU units that never activate.",
}
