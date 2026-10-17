import type { Section } from '../types'

export const caching: Section = {
  id: 'caching',
  title: 'Caching, decoding choices, and context cost',
  scene: 'caching',
  focus: 'cache',
  slide: `## Caching and decoding

A **KV cache** removes repeated work during generation, but it does not make long contexts free: the cache itself grows with every token.

### What the cache saves
- Each step computes k and v for the **new** token only
- 1,024 tokens: **1,024** k/v projections instead of **524,800**
- The new query still attends over **all** cached keys: work per step grows with *t*

### What it costs
- 2 × 6 layers × 512 × 2 bytes = **12.3 KB** per token
- **50 MB** for one sequence at 4,096 tokens
- **1.6 GB** for a batch of 32; memory, not compute, often limits serving

### Choosing the next token
- **Greedy**: the top token; deterministic, often repetitive
- **Temperature, top-k, top-p**: sample, sharpened or truncated`,
  narration:
    "Generation repeats work. At every step the model recomputes keys and values for tokens it has already processed, even though those never change. A key-value cache stores them, so each step computes keys and values for the new token only. Generating a thousand and twenty-four tokens then takes a thousand and twenty-four key and value projections per layer, instead of over half a million. The cache does not make long contexts free. The new token's query still attends over every cached key, so the work per step grows with the context, and the cache itself has to be held in memory. For a six-layer decoder with width five hundred and twelve in sixteen-bit floats, keys and values take twelve point three kilobytes per token. One sequence of four thousand and ninety-six tokens needs fifty megabytes, and a batch of thirty-two needs one point six gigabytes. In serving, that memory, not the arithmetic, is often the limit on batch size and context length. Once the logits are computed, a decoding rule picks the next token. Greedy decoding takes the most likely token, deterministic but often repetitive. Temperature, top-k and top-p sampling draw from a sharpened or truncated distribution. Beam search keeps the best few partial sequences, at several times the compute.",
}
