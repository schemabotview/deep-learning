import type { Scene } from '@graphlearning/flow'
import { tokens, masked, weights, fmt } from './attn'

// §3 — padding + causal mask on the worked trace, and the all-masked row that turns into NaN. COMPUTED.
const m = masked(true)
const w = weights(true)

export const masks: Scene = {
  id: 'masks',
  title: 'Masks before the softmax',
  flow: 'TB',
  nodes: [
    {
      id: 'masked',
      kind: 'table',
      label: 'Scores after padding + causal masks',
      headers: ['query \\ key', ...tokens],
      values: m.map((row, i) => [tokens[i], ...row.map((v) => fmt(v))]),
    },
    {
      id: 'weights',
      kind: 'table',
      label: 'Weights after the row softmax',
      headers: ['query \\ key', ...tokens],
      values: w.map((row, i) => [tokens[i], ...row.map((v) => fmt(v, 3))]),
    },
    {
      id: 'fail',
      kind: 'code',
      filename: 'all_masked.py',
      label: `row = torch.full((4,), float('-inf'))   # an empty note: every key is PAD
row.softmax(-1)          # tensor([nan, nan, nan, nan]) — exp(−∞)/Σ = 0/0
# fixes: drop empty sequences, or keep one valid key (e.g. a [CLS] slot),
# or zero the output: out.masked_fill(~any_valid[..., None], 0.0)`,
    },
  ],
  edges: [
    { source: 'masked', target: 'weights', label: 'softmax per row' },
    { source: 'weights', target: 'fail', label: 'a row with no valid key' },
  ],
}
