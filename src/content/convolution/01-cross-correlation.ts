import type { Section } from '../types'

export const crossCorrelation: Section = {
  id: 'cross-correlation',
  title: 'Locality, sharing and cross-correlation',
  scene: 'cross-correlation',
  focus: 'output',
  slide: `## One filter, every position

A convolution layer slides one small **filter** across the image, computing the same weighted sum at every position.

### Traced on a scratch
- A 5×5 patch with a bright vertical scratch in column 2
- A 3×3 vertical-edge filter: −1 left, 0 centre, +1 right
- Each output is Σ window ⊙ filter: **+24** just left of the scratch, **0** on it, **−24** just right
- The filter **detects** edges of that orientation wherever they occur

### Two assumptions built in
- **Locality**: each output depends only on a small neighbourhood
- **Weight sharing**: the same 9 weights everywhere — a scratch is a scratch at any position
- PyTorch's "convolution" is a **cross-correlation**: the filter is not flipped
- For learned filters the flip **does not matter**`,
  narration:
    "A convolutional layer slides one small filter across the image and computes the same weighted sum at every position. Here is the computation on a five-by-five grey patch with a bright vertical scratch in its middle column, and a three-by-three filter that is minus one on the left, zero in the centre and plus one on the right. At each position, multiply the filter element by element with the window of pixels under it and add everything up. In the first column of the output, the window's right edge falls on the scratch, so the plus-ones meet bright pixels and the sum is twenty-four. Centred on the scratch, left and right cancel and the output is zero. Just past it, the minus-ones meet the scratch and the sum is minus twenty-four. The filter is a vertical-edge detector, and it fires wherever such an edge occurs. Two assumptions are built in. Locality: each output depends only on a small neighbourhood. And weight sharing: the same nine weights are used everywhere, which says a scratch is a scratch whatever its position. One convention to know: what PyTorch calls convolution is mathematically a cross-correlation, without flipping the filter. For learned filters it makes no difference; for filters copied from a textbook it can.",
}
