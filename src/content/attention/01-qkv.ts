import type { Section } from '../types'

export const qkv: Section = {
  id: 'qkv',
  title: 'Queries, keys, values, and weighted aggregation',
  scene: 'qkv',
  focus: 'trace',
  slide: `## Queries, keys and values

Attention builds each token's output as a **weighted average** of every token's value, with weights set by how well a query matches each key.

### Three projections
- Score = query · key, scaled by √d_k; a softmax turns the scores into **weights**
- Output = Σ weight × value, so the weights in a row **sum to 1**

### The worked trace
- The note "dent on lid", d_k = 4, so √d_k = **2**
- Query "lid" scores 1.00, 0.50, 1.00 against dent, on, lid
- Softmax gives weights **0.384, 0.233, 0.384**
- Output = 0.384·[2, 0] + 0.233·[0, 1] + 0.384·[1, 2] = **[1.151, 1.000]**

### What changed from recurrence
- Every pair is compared **directly**, and all queries run **at once**`,
  narration:
    "Attention answers a simple question for every token: which other tokens should I draw information from, and how much? Each token is projected three ways. Its query describes what it is looking for, its key describes what it offers, and its value is the information it passes on if chosen. A query is compared with every key by a dot product, divided by the square root of the key width, and a softmax turns those scores into weights that sum to one. The output is the weighted average of the values. Here is the chapter's worked trace, the inspector note dent on lid, with keys four wide, so we divide by two. The query for lid scores one, a half and one against dent, on and lid. The softmax gives weights of nought point three eight four, nought point two three three and nought point three eight four. Multiplying each by its value and adding gives an output of one point one five one, one point nought. Two things change from recurrence. Every pair of tokens is compared directly, however far apart they are, and because no state is carried along, every query can be computed at once, as a single matrix multiply.",
}
