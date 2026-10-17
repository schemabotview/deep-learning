import type { Section } from '../types'

export const parallelGeneration: Section = {
  id: 'parallel-generation',
  title: 'Parallel training versus sequential generation',
  scene: 'parallel-generation',
  focus: 'compare',
  slide: `## Parallel training, sequential generation

A causal decoder is fast to **train** and slow to **use**, for the same reason: the causal mask.

### Training: one pass
- The whole true note goes in at once: "<bos> scratch on lid"
- So **all four** next-token losses come from **one** forward pass

### Generation: one pass per token
- 4 tokens need **4** forward passes; only the last position's logits are used
- Inputs are the model's **own** choices, not the true note

### What that difference costs
- Training never sees its own mistakes; this is **teacher forcing** again
- An early wrong token conditions **every** later one
- Each pass re-reads the whole prefix, unless it is **cached**`,
  narration:
    "A causal decoder is fast to train and slow to use, and both facts come from the causal mask. During training, the whole true note goes in at once, beginning-of-sequence, scratch, on, lid. The causal mask stops each position seeing the token it has to predict, so the model produces all four next-token predictions, and all four losses, from a single forward pass. The work is parallel over both the batch and the positions, which is the big practical advantage over a recurrent network. Generation cannot do that. Each new token depends on the token chosen just before it, so a four-token note needs four forward passes, and each pass uses only the logits at the last position. The inputs are now the model's own choices rather than the true note. That gap is teacher forcing again, from chapter seven. During training the model never conditions on its own mistakes, but during generation an early wrong token becomes part of the context for every later one. The table sets the two modes side by side. One last cost is visible in the loop: each pass reads the whole prefix again, recomputing keys and values for tokens it has already processed. Removing that repeated work is what the next section's cache is for.",
}
