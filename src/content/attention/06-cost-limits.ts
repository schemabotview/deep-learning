import type { Section } from '../types'

export const costLimits: Section = {
  id: 'cost-limits',
  title: 'Pairwise compute/memory and interpretation limits',
  scene: 'cost-limits',
  focus: 'memory',
  slide: `## The pairwise bill, and what weights do not tell you

Comparing every token with every other is attention's strength and its cost. Its weights are also easy to **over-read**.

### Pairwise cost
- Scores are [N, h, T, T]: memory and compute grow with **T²**
- One layer, fp32, N = 32, 8 heads: **1.07 GB** of scores at T = 1024, **17.2 GB** at 4096
- The token activations at 4096 take only **0.27 GB**
- Fused kernels avoid storing the grid but still do the **T²** work

### Weights are not importance
- A high weight on a token with a **small value** contributes little
- The residual path carries information **around** attention
- A weight shows where a query looked, not what **caused** the prediction
- To test a claim, **intervene**: remove or replace the token and re-score`,
  narration:
    "Comparing every token with every other token is what makes attention powerful, and it is also what makes it expensive. The score tensor has one entry for every pair of positions in every head, so its memory and compute grow with the square of the sequence length. For one layer in thirty-two bit floats, with a batch of thirty-two and eight heads, the scores take about one gigabyte at a length of one thousand and twenty-four, and seventeen gigabytes at four thousand and ninety-six, while the token activations themselves take about a quarter of a gigabyte. Doubling the length quadruples the score memory. Fused attention kernels avoid storing the full grid, but they still do work proportional to the square of the length. The weights are also easy to over-read. A high weight on a token whose value vector is small contributes little to the output. Several heads and layers are mixed together afterwards, and the residual connection carries information around attention entirely. So a weight shows where a query looked, not what caused the prediction. If you want to claim a token mattered, test it: remove or replace that token, score the example again, and measure the change.",
}
