import type { Scene } from '@graphlearning/flow'

// §1 — one compact pre-norm encoder block, d_model = 64, 8 heads, FFN width 256. Parameter counts
// COMPUTED from the layer shapes.
export const d = 64, ff = 256
const lin = (i: number, o: number) => i * o + o
export const blockParams = {
  attn: 4 * lin(d, d), // W_q, W_k, W_v, W_o
  ffn: lin(d, ff) + lin(ff, d),
  norm: 2 * 2 * d, // two LayerNorms, γ and β
}
export const blockTotal = blockParams.attn + blockParams.ffn + blockParams.norm
const n = (v: number) => v.toLocaleString('en-GB')

export const block: Scene = {
  id: 'block',
  title: 'One transformer block',
  flow: 'TB',
  nodes: [
    {
      id: 'stack',
      label: 'Pre-norm block · x: [N, T, 64] in and out',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'sub-attn',
          label: '1 · mix across tokens',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'b-ln1', label: 'LayerNorm', sub: 'per token', pattern: 'service', icon: 'scale' },
            { id: 'b-att', label: 'Multi-head attn', sub: '8 heads of 8', pattern: 'network', icon: 'share' },
            { id: 'b-add1', label: 'x + attn', sub: 'residual add', pattern: 'service', icon: 'merge' },
          ],
          edges: [
            { source: 'b-ln1', target: 'b-att' },
            { source: 'b-att', target: 'b-add1' },
          ],
        },
        {
          id: 'sub-ffn',
          label: '2 · transform each token',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'b-ln2', label: 'LayerNorm', sub: 'per token', pattern: 'service', icon: 'scale' },
            { id: 'b-ffn', label: 'Feedforward', sub: '64 → 256 → 64', pattern: 'network', icon: 'layers' },
            { id: 'b-add2', label: 'x + ffn', sub: 'residual add', pattern: 'service', icon: 'merge' },
          ],
          edges: [
            { source: 'b-ln2', target: 'b-ffn' },
            { source: 'b-ffn', target: 'b-add2' },
          ],
        },
      ],
    },
    {
      id: 'params',
      kind: 'table',
      label: 'Parameters in one block',
      headers: ['part', 'shapes', 'parameters'],
      values: [
        ['attention', '4 × (64×64 + 64)', n(blockParams.attn)],
        ['feedforward', '64×256 + 256 + 256×64 + 64', n(blockParams.ffn)],
        ['2 LayerNorms', '2 × (64 + 64)', n(blockParams.norm)],
        ['block total', '', n(blockTotal)],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'block.py',
      label: `class Block(nn.Module):
    def __init__(self, d=64, h=8, ff=256):
        super().__init__()
        self.ln1, self.ln2 = nn.LayerNorm(d), nn.LayerNorm(d)
        self.attn = nn.MultiheadAttention(d, h, batch_first=True)
        self.ffn = nn.Sequential(nn.Linear(d, ff), nn.GELU(), nn.Linear(ff, d))
    def forward(self, x, pad=None):
        a = self.ln1(x)
        x = x + self.attn(a, a, a, key_padding_mask=pad)[0]
        return x + self.ffn(self.ln2(x))`,
    },
  ],
  edges: [
    { source: 'stack', target: 'params', label: 'count' },
    { source: 'params', target: 'code', label: 'in PyTorch' },
  ],
}
