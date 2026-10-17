import type { Section } from '../types'

export const masks: Section = {
  id: 'masks',
  title: 'Softmax, padding/causal masks, and all-masked failure',
  scene: 'masks',
  focus: 'masked',
  slide: `## Masks go in before the softmax

A mask sets forbidden scores to **−∞**, so the softmax gives them weight exactly **0** and the remaining weights still sum to 1.

### Two masks on the worked trace
- **Padding**: key 4 is PAD, so its column is −∞ for every query
- **Causal**: query *i* may not see keys after *i*, so the upper triangle is −∞
- "dent" now sees only itself: weight **1.000**
- "on" splits **0.378 / 0.622** between dent and itself

### Why −∞, not 0
- A score of 0 still gets **positive** weight; zeroing after the softmax breaks the row sum

### The all-masked row
- An empty note has every key masked: exp(−∞) / Σ = **0/0 = NaN**
- Drop empty sequences, keep one always-valid slot, or **zero** the output`,
  narration:
    "Masks decide which keys a query may see, and they belong before the softmax. A masked score is set to minus infinity, so its exponential is exactly zero and the remaining weights still sum to one. The worked trace uses two masks at once. The padding mask removes the PAD key for every query. The causal mask stops each query from seeing keys after its own position, which is what a model predicting the next token needs. Now dent can only see itself, so its weight is one. On splits its attention, nought point three seven eight on dent and nought point six two two on itself. Lid is unchanged, because there was no later real token for it to lose. Two shortcuts break this. Setting weights to zero after the softmax leaves rows that no longer sum to one, and setting a score to zero rather than minus infinity still gives that key positive weight. The sharper failure is a row where every key is masked, such as an empty note in the batch. The softmax then computes nought over nought, which is not a number, and one NaN spreads through the next multiply into the loss. Drop empty sequences, keep one slot that is always valid, or zero those outputs explicitly.",
}
