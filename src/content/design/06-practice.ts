import type { Section } from '../types'

export const practice: Section = {
  id: 'practice',
  title: 'Continued architecture/application practice',
  scene: 'practice',
  focus: 'habits',
  slide: `## Keep practising

The course used one workshop, but the habits carry to any problem. Practise them on examples you have **not** seen.

### Six habits
- **Trace shapes** on paper before running anything
- Fit a **baseline** first, then ask what a network adds
- **Split by group**: batch, machine, customer or time
- Check **visibility**: masks, state, leaks
- Measure **quality and resources** together, over seeds
- **Label the evidence**: training, validation or final test

### Where the deferred topics live
- Maths courses: derivatives and optimisation theory
- Machine Learning: evaluation, calibration, responsible use
- MLOps: serving, monitoring, retraining
- Specialists: detection, generative models, RL, graphs`,
  narration:
    "This course worked through one fictional workshop, but the habits it built carry to any problem, and the way to keep them is to practise on examples you have not seen before. Six habits matter most. Trace shapes on paper before running anything, because most bugs show up as a shape that cannot be right. Fit a baseline first, and then ask what a network actually adds over it. Split by group, whether that is production batch, machine, customer or time, so evaluation reflects what the model will face. Check visibility: what each position may see through its masks, what carried state leaks between sequences, and what preprocessing has seen the test data. Measure quality and resources together, over several seeds, changing one thing at a time. And label every number with the evidence it is: a training observation, a validation result or a final test. Several topics were deferred on purpose. The derivations behind backpropagation and optimisation belong to the maths courses. General evaluation, calibration and responsible use are covered in the Machine Learning course. Serving, monitoring and retraining belong to MLOps. And detection, segmentation, generative models, reinforcement learning and graph networks each have their own specialist courses. Take the habits with you into each one.",
}
