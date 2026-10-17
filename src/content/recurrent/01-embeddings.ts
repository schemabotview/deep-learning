import type { Section } from '../types'

export const embeddings: Section = {
  id: 'embeddings',
  title: 'Tokens, vocabularies and embeddings',
  scene: 'embeddings',
  focus: 'lookup',
  slide: `## Tokens become vectors

Ordered data comes in two forms: **tokens** from a vocabulary, and **continuous** readings at each step.

### Token sequences
- A vocabulary maps each token to an **id**: *scratch* 2, *on* 4, *lid* 5
- Words never seen in training map to **UNK**: *hinge* → 1
- Ids are **labels**: id 5 is not "more" than id 2
- An **embedding** table has one learned row per id; embedding is a **row lookup**
- \`nn.Embedding(7, 4, padding_idx=0)\` keeps the PAD row at zero, unlearned

### Continuous sequences
- The sensor history is already numbers: **[N, T = 120, 4]**
- It needs scaling, with statistics from **training** months only
- The vocabulary, like any learned state, is built from **training** text only`,
  narration:
    "Ordered data arrives in two forms, and this chapter uses both. Text arrives as tokens. Short notes written by the inspectors, such as scratch on lid, are split into tokens, and a vocabulary maps each token to an integer id: scratch is two, on is four, lid is five. A word the vocabulary has never seen, like hinge here, maps to a reserved unknown id. The ids themselves are just labels, with no meaningful size or order, so the network converts each into a vector using an embedding table: a matrix with one learned row per id, here four numbers long. Embedding a token is nothing more than looking up its row, and those rows are trained like any other weights, so tokens used in similar ways drift toward similar vectors. The padding id gets a row fixed at zero that is never updated. The second form is continuous: the workshop's sensor history is already numbers, four sensor readings at each of a hundred and twenty time steps, so it needs no lookup, only scaling, with means and spreads computed from the training months. And the same rule as every chapter applies to the vocabulary: it is learned state, built from training text only.",
}
