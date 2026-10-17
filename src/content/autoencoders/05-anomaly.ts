import type { Section } from '../types'

export const anomaly: Section = {
  id: 'anomaly',
  title: 'Reconstruction diagnostics and anomaly limitations',
  scene: 'anomaly',
  focus: 'strips',
  slide: `## Reconstruction error as an anomaly score

An autoencoder trained on **normal** images reconstructs them well. A high error suggests something unusual, but a low error does **not** prove normality.

### The validation scores
- Threshold: the 99th percentile of **normal** error, 31.6 × 10⁻³
- Normal images flagged: **1%**, by construction
- Defects flagged: **67%**; a third pass as normal
- Blank frames from a camera fault: **0%** flagged

### Why the blank frame passes
- A uniform image is **easy** to reconstruct: low error
- The score measures how reconstructable an input is, not how **typical**

### Using it carefully
- Set the threshold on normal **validation** data only
- Pair it with simple checks, such as brightness`,
  narration:
    "Train an autoencoder only on normal images and it learns to reconstruct them well, so a high reconstruction error suggests the input is unusual. That makes reconstruction error a popular anomaly score. These are validation results on four hundred normal images, sixty defects, and twenty blank frames produced by a camera fault. The threshold is set at the ninety-ninth percentile of the normal images' error, about thirty-two thousandths. By construction, one percent of normal images are flagged. Two thirds of the defects are flagged, so a third of them pass as normal. And not one of the blank frames is flagged. The blank frames are the most anomalous inputs here, yet they have the lowest errors of all. A uniform image is simply easy to reconstruct. The score measures how reconstructable an input is, not how typical it is, and a model can reconstruct an anomalous input very well. So use it carefully. Set the threshold on normal validation data only, never on the test set, and report what fraction of known defects it misses. Pair it with simple checks that catch the easy failures, such as image brightness or variance, which would flag a blank frame immediately. Treat a low score as an absence of evidence, not as a clean bill of health.",
}
