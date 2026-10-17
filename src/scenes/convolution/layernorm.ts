import type { Scene } from '@graphlearning/flow'

// The same [2 examples × 3 features] tensor normalised two ways, COMPUTED (biased variance, no ε shown):
// batch norm per FEATURE across the batch; layer norm per EXAMPLE across features.
const X = [
  [1, 2, 3],
  [4, 6, 8],
]
const norm = (v: number[]) => {
  const m = v.reduce((a, b) => a + b, 0) / v.length
  const s = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length)
  return v.map((u) => (u - m) / s)
}
const ln = X.map(norm)
const cols = [0, 1, 2].map((j) => norm(X.map((r) => r[j])))
const bn = X.map((_, i) => cols.map((c) => c[i]))
const row = (v: number[]) => v.map((u) => u.toFixed(2)).join(', ')

// §7 — two normalisations, two axes.
export const layernorm: Scene = {
  id: 'layernorm',
  title: 'Which axis is normalised?',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'X = [[1, 2, 3], [4, 6, 8]] · examples × features',
      headers: ['example', 'input', 'batch norm (per feature)', 'layer norm (per example)'],
      values: X.map((r, i) => [String(i), r.join(', '), row(bn[i]), row(ln[i])]),
    },
    {
      id: 'when',
      label: 'Choosing between them',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-bn', label: 'Batch norm', sub: 'CNNs, large batches', pattern: 'service', icon: 'boxes' },
        { id: 'w-ln', label: 'Layer norm', sub: 'sequences, transformers', pattern: 'network', icon: 'layers' },
        { id: 'w-same', label: 'LN: same', sub: 'in train and eval', pattern: 'user', icon: 'circlecheck' },
        { id: 'w-order', label: 'Order', sub: 'pre- or post-norm', pattern: 'external', icon: 'sortarrows' },
      ],
    },
  ],
  edges: [{ source: 'compare', target: 'when' }],
}
