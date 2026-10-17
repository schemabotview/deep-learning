import type { Section } from '../types'

export const checkpointing: Section = {
  id: 'checkpointing',
  title: 'Checkpoint/recomputation trade-offs',
  scene: 'checkpointing',
  focus: 'table',
  slide: `## Checkpointing: memory for compute

**Activation checkpointing** keeps only some activations in forward and rebuilds the rest during backward. Memory falls; compute rises.

### 12 transformer blocks
- Each block keeps **0.40 GB** of internals for backward; its input is **0.05 GB**
- Store everything: 12 × 0.40 = **4.80 GB**
- Checkpoint every block: 12 inputs + one block rebuilt at a time = **1.00 GB**
- Every 2 blocks: **1.10 GB**; every 4: **1.75 GB**

### The cost
- Every rebuilt activation is computed **twice**
- About one extra forward pass: backward ≈ 2 forwards, so **+33%** compute

### The detail that breaks it
- Recomputed **dropout** must draw the same mask: PyTorch restores the RNG state by default`,
  narration:
    "Activation checkpointing trades compute for memory. In the forward pass it keeps only some activations, typically the input to each block, and throws the rest away. During backward it runs each block's forward again to rebuild the activations it needs, then computes the gradients. Take a stack of twelve transformer blocks, where each block keeps nought point four gigabytes of internals for backward and takes an input of nought point nought five gigabytes. Storing everything takes twelve times nought point four, four point eight gigabytes. Checkpointing every block keeps only the twelve inputs, plus one block's internals while it is being rebuilt, one gigabyte in all, under a quarter of the original. Checkpointing every two blocks needs one point one gigabytes, and every four, one point seven five, because more blocks must be rebuilt at once. The price is that every rebuilt activation is computed twice. In total that is about one extra forward pass, and since backward costs roughly two forwards, about a third more compute per step. That is worth paying when memory, not compute, is what limits the batch size or the sequence length. One detail can break it: any dropout inside a block must draw the same mask on recomputation, and PyTorch restores the random state by default to make that so.",
}
