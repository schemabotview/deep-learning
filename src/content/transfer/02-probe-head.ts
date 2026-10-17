import type { Section } from '../types'

export const probeHead: Section = {
  id: 'probe-head',
  title: 'Frozen features, probes, and head replacement',
  scene: 'probe-head',
  focus: 'options',
  slide: `## Frozen features and new heads

The cheapest adaptation keeps the pretrained body **frozen** and trains only a new **head** on its features.

### Replacing the head
- The source head predicts 1,000 classes; the target needs **3**
- Swap it for nn.Linear(512, 3): **1,539** trainable parameters
- The ResNet-18 body keeps its **11,176,512** weights fixed

### How much to train (600 images, validation)
- **Linear probe**, head only: **0.74**
- **MLP head**, 66,051 parameters: 0.76
- **Last stage + head**, 8.4M parameters: **0.83**
- **Full fine-tune**, 11.2M parameters: **0.85**

### Reading the probe
- A probe score measures what the frozen features **already** separate
- Cheap, fast, hard to overfit with few labels; a strong **baseline**`,
  narration:
    "The cheapest way to adapt a pretrained network is to keep its body frozen and train only a new head on top of its features. The pretrained ResNet eighteen ends in a head that predicts a thousand source classes. For the workshop task that head is replaced with a linear layer from the five hundred and twelve features to three defect classes, one thousand five hundred and thirty-nine trainable parameters. The body's eleven point two million weights stay fixed. Training only that layer is called a linear probe. With six hundred labelled images, it reaches a validation macro F one of nought point seven four. A small two-layer head adds sixty-six thousand parameters and reaches nought point seven six. Unfreezing the last stage of the body as well, about eight point four million parameters, reaches nought point eight three. Fine-tuning everything reaches nought point eight five. A probe score has a clear meaning: it measures what the frozen features already separate, with no chance for the body to adapt. It is cheap, fast, and hard to overfit with few labels, which makes it the right first baseline for any transfer decision. The code is short: switch off gradients for every parameter, then assign a new final layer, whose parameters are trainable by default.",
}
