import type { Scene } from '@graphlearning/flow'
import { tokens, Q, K, V, scores, weights, outputs, fmt } from './attn'

// §1 — one query ("lid", row 3) scoring every key, then a weighted average of the values. COMPUTED.
const i = 2
const w = weights(false)[i]
const out = outputs(weights(false))[i]

export const qkv: Scene = {
  id: 'qkv',
  title: 'Queries, keys and values',
  flow: 'TB',
  nodes: [
    {
      id: 'roles',
      label: 'Three projections of every token',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-q', label: 'Query', sub: 'what this token seeks', pattern: 'service', icon: 'search' },
        { id: 'r-k', label: 'Key', sub: 'what each token offers', pattern: 'network', icon: 'key' },
        { id: 'r-v', label: 'Value', sub: 'what gets passed on', pattern: 'storage', icon: 'package' },
      ],
    },
    {
      id: 'trace',
      kind: 'table',
      label: `query "lid" = [${Q[i].join(', ')}] against each key`,
      headers: ['key token', 'key vector', 'q·k / √4', 'weight', 'value'],
      values: [
        ...tokens.slice(0, 3).map((t, j) => [t, `[${K[j].join(', ')}]`, fmt(scores[i][j]), fmt(w[j], 3), `[${V[j].join(', ')}]`]),
        ['output', '', '', `Σ = ${fmt(w.reduce((a, b) => a + b, 0), 2)}`, `[${out.map((v) => fmt(v, 3)).join(', ')}]`],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'attend.py',
      label: `q, k, v = W_q(x), W_k(x), W_v(x)          # x: [N, T, d_model]
scores = q @ k.transpose(-2, -1) / d_k ** 0.5   # [N, T, T]
weights = scores.softmax(dim=-1)              # each row sums to 1
out = weights @ v                             # [N, T, d_v]`,
    },
  ],
  edges: [
    { source: 'roles', target: 'trace', label: 'one query' },
    { source: 'trace', target: 'code', label: 'every query at once' },
  ],
}
