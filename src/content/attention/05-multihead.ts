import type { Section } from '../types'

export const multihead: Section = {
  id: 'multihead',
  title: 'Multi-head shapes and position information',
  scene: 'multihead',
  focus: 'perm',
  slide: `## Heads and position

Several smaller attention **heads** run side by side, and some form of **position** has to be added, because attention on its own ignores order.

### Multi-head shapes
- d_model = 64 is split into **8 heads of 8**: [N, T, 64] → [N, 8, T, 8]
- Outputs are concatenated back to [N, T, 64] and mixed by **W_o**

### Attention is order-blind
- Reversed to "lid on dent", "dent" still outputs **[1.320, 0.801]**
- Self-attention is **permutation equivariant**: reorder inputs, outputs reorder the same way

### Adding position
- **Absolute**: add a learned or sinusoidal vector per index
- **Relative**: bias each score by the distance i − j
- **Rotary**: rotate q and k by their index before the dot product`,
  narration:
    "In practice attention runs as several heads side by side. With a model width of sixty-four and eight heads, each projection is reshaped from batch, tokens, sixty-four into batch, eight heads, tokens, eight. Each head computes its own grid of weights, so one head can follow the defect word while another follows the location. The head outputs are concatenated back to width sixty-four and mixed by an output projection. Because each head is narrow, the total cost is about the same as one full-width head. Attention also has a blind spot: it ignores order. Take the worked note and reverse it, lid on dent, without any position information. Every token produces exactly the output it produced before. Dent still gives one point three two, nought point eight, and lid still gives one point one five, one. Self-attention is permutation equivariant: reorder the inputs and the outputs reorder the same way, nothing more. For text or sensor readings that is wrong, so position must be added. Absolute schemes add a learned or sinusoidal vector for each index. Relative schemes add a bias to each score based on the distance between the two positions. Rotary schemes rotate queries and keys by their index. Only genuine sets should go without.",
}
