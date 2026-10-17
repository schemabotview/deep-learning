import type { Section } from '../types'

export const block: Section = {
  id: 'block',
  title: 'Attention, feedforward, residual, and normalisation blocks',
  scene: 'block',
  focus: 'stack',
  slide: `## One transformer block

A transformer is a stack of identical blocks. Each one **mixes across tokens**, then **transforms each token**, and keeps the shape [N, T, 64].

### Two sublayers
- **Attention** mixes information between positions
- The **feedforward** network, 64 → 256 → 64, works on each token separately
- Each sublayer is wrapped in a **residual** add: x + f(x)
- Pre-norm: a **LayerNorm** goes before each sublayer, normalising each token's 64 features

### Counting one block
- Attention: 4 projections × (64×64 + 64) = **16,640**
- Feedforward: 64×256 + 256 + 256×64 + 64 = **33,088**
- Two LayerNorms: **256**; block total **49,984**

### Why the residual and norm
- The residual path lets gradients reach early blocks **unchanged**`,
  narration:
    "A transformer is a stack of identical blocks, and each block does two things. First an attention sublayer mixes information between positions. Then a small feedforward network transforms each token on its own, here widening its sixty-four features to two hundred and fifty-six and back. Each sublayer is wrapped in a residual connection, so the block adds a correction to its input rather than replacing it, and in the pre-norm arrangement shown here a layer normalisation sits before each sublayer, rescaling each token's sixty-four features. The input and output shapes are the same, batch by tokens by sixty-four, which is what lets blocks stack. Counting parameters makes the balance clear. The four attention projections, for queries, keys, values and output, each have sixty-four by sixty-four weights plus a bias, sixteen thousand six hundred and forty in all. The feedforward network has thirty-three thousand and eighty-eight. The two layer norms add two hundred and fifty-six, for a block total of forty-nine thousand nine hundred and eighty-four, two thirds of it in the feedforward part. The residual path is what lets gradients reach the earliest blocks, the same idea as the residual blocks of chapter six, and putting the norm first keeps deep stacks stable.",
}
