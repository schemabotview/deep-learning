import type { Section } from '../types'

export const baselinesSeeds: Section = {
  id: 'baselines-seeds',
  title: 'Classical baselines, ablations and seed variation',
  scene: 'baselines-seeds',
  focus: 'table',
  slide: `## Baselines, ablations and seeds

A neural result means something only next to a **baseline**, an **ablation**, and the **spread** across seeds.

### The comparison, five seeds each
- Hand features + logistic: **0.710**, identical every seed
- The CNN: **0.858 ± 0.008** — a real gain of about 0.15
- Without augmentation: **0.816** — augmentation is worth about **0.04**
- Without batch norm: **0.850** — within one sd: batch norm adds **nothing measurable** here

### Reading it
- An ablation removes **one** component and keeps everything else fixed
- Keeping a component that adds nothing costs compute and **explanation**
- Compare differences with the **seed spread**, not with zero
- Seeds share data and splits, so their sd understates total uncertainty`,
  narration:
    "A single neural score means little on its own. It needs three things beside it: a baseline, ablations, and the spread across seeds. Here every pipeline is run with five seeds on the same batch-split validation folds. The classical baseline, hand features with logistic regression, scores nought point seven one, the same every time because it has no random initialisation. The full CNN averages nought point eight five eight with a standard deviation under a hundredth, a real gain of about fifteen points over the baseline. Then the ablations, each removing exactly one component and keeping everything else fixed. Without augmentation, the CNN drops to nought point eight one six, so augmentation is worth about four points, well beyond the seed noise. Without batch normalisation, it scores nought point eight five, a difference smaller than one standard deviation. Batch norm adds nothing measurable on this task, and the honest report says so rather than keeping it because it is customary. The general rule is to compare differences with the seed spread, not with zero. And remember the seeds all share the same data and splits, so their spread understates the full uncertainty a new dataset would bring.",
}
