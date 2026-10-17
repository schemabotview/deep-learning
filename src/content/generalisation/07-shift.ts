import type { Section } from '../types'

export const shift: Section = {
  id: 'shift',
  title: 'Calibration, subgroup errors and distribution shift',
  scene: 'shift',
  focus: 'slices',
  slide: `## Where it breaks

The Machine Learning course's evaluation tools apply unchanged; what is new is **what shifts** for an image model.

### Slices of the test batches
- Stations A and B: macro-F1 **0.88** and **0.86**, calibration error under 0.05
- New station C: **0.71**, dent recall **0.52**, calibration error **0.12**
- Dark-finish parts: dent recall **0.48**, from only 95 images

### What shifted
- Station C has a **new lens**: the input distribution moved, the labels did not
- On dark parts dents cast **no shadow**, the cue the model relied on
- Under shift the model is **overconfident**: probabilities need re-checking
- Slice by **acquisition** conditions, not only by class
- Recalibrating cannot fix a model that has lost its **cue**`,
  narration:
    "The evaluation tools from the Machine Learning course apply to neural models unchanged: slice the test set, report counts, check calibration. What is specific to an image model is what tends to shift. The table slices the chosen CNN's test batches. Stations A and B, both represented in training, score nought point eight eight and nought point eight six, with calibration errors under five hundredths. The newly installed station C scores nought point seven one, with dent recall falling to about a half and a calibration error of nought point one two. Dark-finish parts are worse still for dents, nought point four eight, though from only ninety-five images. The causes are physical. Station C has a new lens, so the images look different even though the defects are the same: the input distribution moved and the labels did not. On dark-finish parts, dents do not cast the shadow that the model had learned to rely on. Under both shifts the model becomes overconfident, its probabilities no longer matching its accuracy. Recalibration on new-station data can repair the probabilities, but it cannot restore a cue the model has lost; that needs training images from the new conditions.",
}
