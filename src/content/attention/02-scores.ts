import type { Section } from '../types'

export const scores: Section = {
  id: 'scores',
  title: 'Additive and scaled dot-product scores',
  scene: 'attn-scores',
  focus: 'saturation',
  slide: `## Scoring a query against a key

The score function decides how a query and a key are compared. Two are standard, and the scaled dot product won on **hardware**, not on expressiveness.

### Additive scores
- A small network per pair: vᵀ tanh(W₁q + W₂k)
- Query and key widths **may differ**; extra parameters W₁, W₂, v

### Scaled dot-product scores
- q·k / √d_k: no extra parameters, one **matrix multiply** for all pairs
- With unit-variance entries, q·k has variance **d_k**, so raw scores grow with width
- Large scores push the softmax towards **one-hot**, where its gradients vanish

### The plot, 200 random draws over 8 keys
- Unscaled, the largest weight averages **0.88** at d_k = 64, 0.97 at 512
- Scaled by √d_k it stays near **0.36** at every width`,
  narration:
    "The score function decides how a query is compared with a key, and two forms are standard. Additive attention, from the first recurrent translation models, runs a small network on every pair: it projects the query and the key, adds them, applies a tanh and reads off a score. It allows the query and key to have different widths, at the cost of extra parameters. Scaled dot-product attention simply takes the dot product of query and key and divides by the square root of their width. It has no parameters of its own, and every pair is scored in one matrix multiply, which is why it won. The division matters. If query and key entries have unit variance, their dot product has variance equal to the width, so raw scores grow as the model widens. Large scores push the softmax towards one-hot, where almost all the weight sits on one key and the gradients through the other keys nearly vanish. The plot measures this over two hundred random draws with eight keys. Unscaled, the largest weight averages nought point eight eight at width sixty-four and nought point nine seven at five hundred and twelve. Scaled, it stays near nought point three six at every width, well above uniform attention's one eighth.",
}
