import type { Section } from '../types'

export const fineTune: Section = {
  id: 'fine-tune',
  title: 'Partial/full fine-tuning and layer-specific rates',
  scene: 'fine-tune',
  focus: 'curves',
  slide: `## Fine-tuning, layer by layer

Fine-tuning updates the pretrained body too. **How fast** each layer moves decides whether the pretrained features are refined or overwritten.

### Three choices on 600 images (validation)
- Frozen body + probe: **0.74**, quickly and stably
- One rate of 1e-3 everywhere: drops to **0.50** in epoch 0, recovers only to **0.67**
- Per-layer rates: **0.85**, the best of the three

### Why per-layer rates
- Early layers hold **generic** edges and textures: change them least
- Later layers hold **source-specific** features: let them move more
- The new head starts from random: give it the **largest** rate

### Partial versus full
- Full fine-tuning can win with enough labels, but **overfits** sooner with few`,
  narration:
    "Fine-tuning goes further than a probe: it updates the pretrained body as well as the new head. How fast each layer is allowed to move decides whether the pretrained features are refined or overwritten. These three validation curves all start from the same pretrained body, with six hundred labelled images. The frozen body with a linear probe climbs quickly and settles at nought point seven four. A single learning rate of one in a thousand for every layer is the common mistake. Large updates driven by a random new head wreck the pretrained features in the first epoch, the score drops to about a half, and it recovers only to nought point six seven. Per-layer learning rates reach nought point eight five, the best of the three. The reasoning follows the network's depth. Early layers hold generic edges and textures that transfer well, so they change least, or stay frozen. Later layers hold more source-specific features, so they are allowed to move more. The new head starts from random weights and gets the largest rate. In PyTorch this is a list of parameter groups, each with its own rate. Freezing more layers trains faster and stores fewer gradients. Full fine-tuning can win when labels are plentiful, but with few labels it overfits sooner.",
}
