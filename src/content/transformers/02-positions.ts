import type { Section } from '../types'

export const positions: Section = {
  id: 'positions',
  title: 'Position representations and permutation structure',
  scene: 'positions',
  focus: 'sinusoid',
  slide: `## Position representations

Without position information, a stack of blocks treats a note as a **set** of tokens.

### Sinusoidal encoding
- A fixed vector per position: PE(p, 2i) = sin(p / 10000^(2i/64))
- Periods: **6.3** positions at i = 0, **19.9** at i = 4, **62.8** at i = 8

### Four schemes
- **Learned absolute**: none exists past the trained length
- **Sinusoidal**: defined anywhere, rarely reliable past training
- **Relative bias**: adds a term to each score from the distance i − j
- **Rotary**: rotates q and k by index, so q·k depends on the **offset**

### What stays permutation-free
- Only the position scheme tells "dent on lid" from "lid on dent"`,
  narration:
    "Without position information, a stack of transformer blocks treats a note as a set of tokens, as we saw when reversing dent on lid changed nothing. Order has to be put in on purpose. The original transformer adds a fixed sinusoidal vector to each token's embedding. Each pair of dimensions is a sine and cosine at its own frequency. The lowest dimensions turn quickly, repeating every six point three positions, while higher ones turn slowly, every twenty positions at the fourth pair and every sixty-three at the eighth. Read together, the sixty-four dimensions give every position a distinct pattern, and nearby positions get similar ones. There are four common schemes. Learned absolute embeddings train one vector per index, so a position beyond the training length simply has no vector. Sinusoidal codes are defined at any index, but models rarely use them reliably past what they were trained on. Relative schemes add a bias to each attention score based on the distance between the two positions. Rotary schemes rotate queries and keys by their index, so their dot product depends only on the offset between them. Everything else in the block treats positions identically, so the position scheme is the only thing that distinguishes dent on lid from lid on dent.",
}
