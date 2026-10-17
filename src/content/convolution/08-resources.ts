import type { Section } from '../types'

export const resources: Section = {
  id: 'resources',
  title: 'Depth and resource comparisons, and 1D convolution',
  scene: 'resources',
  focus: 'compare',
  slide: `## Parameters are not compute

The CNN has far fewer parameters than the MLP — and does far **more arithmetic**.

### Counted per image
- MLP: **393,347** parameters, about **393,000** multiply-adds — each weight used once
- CNN: **23,779** parameters, about **11.2 million** multiply-adds — each weight used at every position
- conv2 and conv3 account for **84 %** of the CNN's arithmetic
- Memory for **activations** also scales with resolution × channels

### Convolution along time
- The sensor history is [N, 4 sensors, 120 steps]
- \`Conv1d(4, 16, kernel_size=5)\` has **336** parameters and outputs 116 steps
- Same assumptions, now in time: **local** patterns, shared across positions
- A non-causal kernel sees the **future** within its window: chapter 7 deals with that`,
  narration:
    "A last comparison corrects a common intuition: fewer parameters does not mean less computation. The MLP has three hundred and ninety-three thousand parameters and does about the same number of multiply-adds per image, because each weight is used exactly once. The CNN has under twenty-four thousand parameters, yet does about eleven point two million multiply-adds per image, because every filter weight is reused at every position of its feature map. The per-layer table shows where that arithmetic goes: the second and third convolutions account for about eighty-four percent of it, since they apply many channels at fairly high resolution. Memory follows the same pattern: the activations that must be kept for backward scale with resolution times channels, which chapter twelve measures. Convolution is not only for images. The workshop's sensor history is a sequence of four sensor readings over a hundred and twenty time steps. A one-dimensional convolution with sixteen filters of length five has three hundred and thirty-six parameters and produces a hundred and sixteen output steps. The assumptions are the same, now in time: patterns are local and look the same wherever they occur. One caution carries into the next chapter: an ordinary kernel centred on a time step also sees the future within its window.",
}
