import type { Section } from '../types'

export const selfCross: Section = {
  id: 'self-cross',
  title: 'Self-attention and cross-attention',
  scene: 'self-cross',
  focus: 'kinds',
  slide: `## Self-attention and cross-attention

The attention computation is the same in both; what differs is **where** the queries, keys and values come from.

### Self-attention
- Queries, keys and values all come from **one sequence**
- A 12-token note attends over itself: weights **[N, 12, 12]**

### Cross-attention
- Queries from one sequence, keys and values from **another**
- The note's 12 tokens attend over 49 image-patch features: weights **[N, 12, 49]**
- The output keeps the **query** length: [N, 12, 64]

### Reading the shapes
- Scores are always [N, T_query, T_key]
- The padding mask follows the **keys**: here the note in self-attention, the patches in cross`,
  narration:
    "Self-attention and cross-attention run exactly the same computation. What differs is where the queries, keys and values come from. In self-attention all three come from one sequence. A twelve-token inspector note attends over itself, the weights form a twelve by twelve grid for each example, and each token's output mixes in context from the rest of the note. In cross-attention the queries come from one sequence and the keys and values from another. Here the note's twelve tokens attend over forty-nine feature vectors taken from a seven by seven grid of the defect image's patches. The weights are now twelve by forty-nine, and the output has the query's length, twelve tokens, each now carrying information drawn from the image. The keys and values must have the same length as each other, but the queries need not match it. A useful habit is to read every score tensor as batch, query length, key length. The padding mask follows the keys, so in self-attention it marks the note's padding, and in cross-attention it marks any missing patches. In PyTorch it is literally the same module: pass the note three times for self-attention, or the note once and the patches twice for cross-attention.",
}
