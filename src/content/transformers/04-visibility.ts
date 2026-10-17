import type { Section } from '../types'

export const visibility: Section = {
  id: 'visibility',
  title: 'Causal, bidirectional, and cross-attention visibility',
  scene: 'visibility',
  focus: 'causal',
  slide: `## Who can see whom

A visibility mask is a grid of query × key permissions. Comparing two on the same padded note shows exactly what each hides.

### Bidirectional + padding
- Every real token sees all **four** real tokens: **16** visible pairs
- Right for an encoder reading a **finished** note

### Causal + padding
- Query *i* sees keys 1 … *i*: the upper triangle is hidden
- Visible pairs fall from 16 to **10** (1 + 2 + 3 + 4)
- "scratch" sees only itself; "edge" sees the whole note
- Right for a decoder, where later tokens do **not yet exist**

### Cross-attention
- Every decoder token may see **all** encoder positions
- In PyTorch the causal grid is **triu(…, diagonal=1)**, True meaning hidden`,
  narration:
    "A visibility mask is a grid of permissions, one row for each query and one column for each key. Comparing two of them on the same padded note, scratch on lid edge plus one padding slot, shows exactly what each one hides. With a bidirectional mask and padding, every real token can see all four real tokens, sixteen visible pairs, and only the padding column is hidden. That is what an encoder reading a finished note wants. Add the causal mask and query number i can only see keys one up to i, so the whole upper triangle disappears. The visible pairs fall from sixteen to ten, one plus two plus three plus four. Scratch now sees only itself, while edge, the last token, still sees the whole note. That is right for a decoder, because when it is generating, the later tokens do not exist yet. Cross-attention has its own rule. Every decoder token may look at every encoder position, because the input sequence is complete before decoding starts, and only the encoder's padding is masked. In PyTorch, the causal grid is the upper triangle above the diagonal, built with triu and a diagonal offset of one, where true means hidden.",
}
