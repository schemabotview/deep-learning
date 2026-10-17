import type { Scene } from '@graphlearning/flow'

// §4 — two visibility masks over the same five tokens (● visible, · hidden), plus cross-attention.
const toks = ['scratch', 'on', 'lid', 'edge', 'PAD']
const vis = (causal: boolean) => toks.map((q, i) => [q, ...toks.map((_, j) => (j === 4 || (causal && j > i) ? '·' : '●'))])
const count = (causal: boolean) => vis(causal).slice(0, 4).reduce((a, r) => a + r.slice(1).filter((c) => c === '●').length, 0)
export const visible = { bi: count(false), causal: count(true) }

export const visibility: Scene = {
  id: 'visibility',
  title: 'Who can see whom',
  flow: 'TB',
  nodes: [
    {
      id: 'bi',
      kind: 'table',
      label: `Bidirectional + padding: ${visible.bi} visible pairs`,
      headers: ['query \\ key', ...toks],
      values: vis(false),
    },
    {
      id: 'causal',
      kind: 'table',
      label: `Causal + padding: ${visible.causal} visible pairs`,
      headers: ['query \\ key', ...toks],
      values: vis(true),
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'masks.py',
      label: `T = 5
causal = torch.triu(torch.ones(T, T, dtype=torch.bool), diagonal=1)  # True = hidden
pad = tokens == PAD                                                  # [N, T]
enc(x, src_key_padding_mask=pad)                                     # bidirectional
dec(y, mem, tgt_mask=causal, tgt_key_padding_mask=pad_y,
    memory_key_padding_mask=pad)                     # cross: every decoder token sees all of mem`,
    },
  ],
  edges: [
    { source: 'bi', target: 'causal', label: 'hide the future' },
    { source: 'causal', target: 'code' },
  ],
}
