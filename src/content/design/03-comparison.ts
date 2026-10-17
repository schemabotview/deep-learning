import type { Section } from '../types'

export const comparison: Section = {
  id: 'comparison',
  title: 'Quality, failure, robustness, and resource comparison',
  scene: 'design-comparison',
  focus: 'table',
  slide: `## Compare on everything the contract names

Quality is one column. Robustness, failure modes and resources sit beside it, against the **declared** budget.

### The table (validation over 3 seeds; test once)
- The MLP, at **0.690** validation, falls **below** the 0.71 baseline
- The small CNN: **0.860**, test 0.85; the fine-tuned ResNet-18: **0.930**, test **0.91**
- Station C: 0.83 vs 0.71; dent recall 0.86 vs 0.74; CPU **28 ms**

### Reading it
- Every model drops on station C: robustness is **not** solved
- Test 0.91 is close to the **0.92** label ceiling
- The sensor-history model is a different task: its evidence stays **separate**

### The recommendation
- The fine-tuned ResNet-18, with station C as a known limit`,
  narration:
    "The comparison covers everything the contract names, not just one quality score. Validation figures are means over three seeds, and test figures come from one final run per model. The MLP on pixels reaches only nought point six nine on validation, below the hand-feature baseline at nought point seven one, so capacity alone did not help. The small convolutional network reaches nought point eight six on validation and nought point eight five on test. The fine-tuned ResNet eighteen reaches nought point nine three on validation and nought point nine one on test. On images from station C, a station held out entirely, every model drops. The ResNet falls to nought point eight three and the small network to nought point seven one. The ResNet also recalls eighty-six percent of dents, against seventy-four for the small network, and at twenty-eight milliseconds per image on the CPU it fits inside the fifty millisecond budget. Two cautions come with the reading. The station C drop shows robustness to new stations is not solved by any candidate. And a test score of nought point nine one is already close to the ceiling set by inspector agreement. The sensor-history model answers a different question, so its evidence is reported separately. The recommendation is the fine-tuned ResNet eighteen, with station C named as a known limit.",
}
