import type { Section } from '../types'

export const limits: Section = {
  id: 'limits',
  title: 'Responsible interpretation and documented limits',
  scene: 'limits',
  focus: 'claims',
  slide: `## Claims the evidence supports

The last step is to say exactly which claims the evidence **supports** — and which it does not.

### Supported
- Macro-F1 about **0.86** on stations A and B, from locked test batches and five seeds
- As a **routing** aid: send likely defects to a manual check

### Not supported
- Performance on a **new station** — measured at 0.71
- Reliable dent detection on **dark parts** — 95 images, recall 0.48
- That a saliency **heat map** shows the reason for a decision
- **Replacing** human inspection
- Any claim about parts or stations it was **never** tested on

### Write it down
- Scope, label quality, known failures, and when to **re-check**`,
  narration:
    "The chapter ends by turning evidence into claims, and being exact about which claims the evidence supports. It does support a macro F1 of about nought point eight six on stations A and B, measured on locked test batches and averaged over five seeds, and it supports using the model as a routing aid that sends likely defects to a manual check. It does not support claims about a new station, where performance was measured at nought point seven one. It only weakly supports dent detection on dark-finish parts, based on ninety-five images with recall below a half. It does not support reading a saliency heat map as the reason for a decision: such maps show where the output is sensitive, which is not the same as why the model decided, and the Machine Learning course's cautions about explanations apply. And nothing here supports replacing human inspection. All of that is written down alongside the model: its scope, meaning which stations, finishes and lenses it was evaluated on; the label quality, including the eight percent disagreement; the known failures; and the rule for when to re-check, which is whenever a station, camera or part finish changes.",
}
