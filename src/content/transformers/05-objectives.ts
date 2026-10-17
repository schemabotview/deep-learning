import type { Section } from '../types'

export const objectives: Section = {
  id: 'objectives',
  title: 'Masked and next-token objectives',
  scene: 'objectives',
  focus: 'next',
  slide: `## Two training objectives

The mask decides what a position may **see**; the objective decides which positions are **scored**, and against what.

### Next-token prediction
- Targets are the inputs **shifted by one**: predict token *t* + 1 from 1 … *t*
- A loss at **every** position: −ln p = 1.204, 0.511, 0.916, 0.693; mean **0.831**
- Needs the **causal** mask, or each position can read its own target

### Masked-token prediction
- Hide some tokens: "scratch [MASK] lid edge"
- Score **only** the masked positions: p(on) = 0.70, loss **0.357**

### Keeping them apart
- Next-token without the causal mask is **leakage**: training loss falls to near 0
- A masked-token model is not a generator; it never learned to **continue**`,
  narration:
    "A transformer's mask decides what each position may see. Its objective decides which positions are scored, and against what target. These are separate choices, and the common objectives pair them in particular ways. Next-token prediction uses the inputs shifted by one as targets: from the tokens up to position t, predict token t plus one. Every position carries a loss. For the note scratch on lid edge, with illustrative probabilities for each correct next token, the losses are one point two, nought point five one, nought point nine two and nought point six nine, a mean cross-entropy of nought point eight three. This objective needs the causal mask, because without it each position could simply read its own target from the next slot. Masked-token prediction hides some tokens, here replacing on with a mask token, and scores only those positions. The model gives on a probability of nought point seven, a loss of nought point three six, and the other positions contribute nothing. Because the hidden token is replaced in the input, this objective can use a bidirectional mask, and the prediction draws on context from both sides. Mixing them up fails in instructive ways. Next-token training without the causal mask is leakage, and its training loss falls towards zero.",
}
