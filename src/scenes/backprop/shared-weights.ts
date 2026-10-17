import type { Scene } from '@graphlearning/flow'

// A weight used twice: y = w·x₁ + w·x₂, L = ½(y − t)². Its gradient is the SUM of both uses,
// computed: dL/dw = (y − t)(x₁ + x₂). With w = 0.5, x = (2, 3), t = 1: y = 2.5, dL/dw = 1.5 × 5 = 7.5.
const w = 0.5
const x1 = 2
const x2 = 3
const t = 1
const y = w * x1 + w * x2
const dy = y - t
const use1 = dy * x1
const use2 = dy * x2

// §4 — shared parameters add their gradient contributions; so do branches that reuse one activation.
export const sharedWeights: Scene = {
  id: 'shared-weights',
  title: 'Used twice, summed once',
  flow: 'TB',
  nodes: [
    {
      id: 'graph',
      label: 'One weight, two paths',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'w', label: 'w = 0.5', sub: 'one parameter', pattern: 'storage', icon: 'key' },
        {
          id: 'uses',
          label: 'Two uses',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'u1', label: 'w · x₁', sub: `x₁ = ${x1}`, pattern: 'service', icon: 'sigma' },
            { id: 'u2', label: 'w · x₂', sub: `x₂ = ${x2}`, pattern: 'service', icon: 'sigma' },
          ],
        },
        { id: 'y', label: `y = ${y}`, sub: `L = ${0.5 * dy * dy}`, pattern: 'warn', icon: 'gauge' },
      ],
      edges: [
        { source: 'w', target: 'uses' },
        { source: 'uses', target: 'y' },
      ],
    },
    {
      id: 'sum',
      kind: 'table',
      label: 'Gradient contributions to w',
      headers: ['path', 'contribution'],
      values: [
        ['through w · x₁', `(y − t) · x₁ = ${dy} × ${x1} = ${use1}`],
        ['through w · x₂', `(y − t) · x₂ = ${dy} × ${x2} = ${use2}`],
        ['dL/dw (sum)', String(use1 + use2)],
      ],
    },
    {
      id: 'where',
      label: 'Where sharing appears',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's-conv', label: 'Convolution', sub: 'one filter, every place', pattern: 'network', icon: 'boxes' },
        { id: 's-rnn', label: 'Recurrence', sub: 'one cell, every step', pattern: 'user', icon: 'repeat' },
        { id: 's-heads', label: 'Two heads', sub: 'one body, two losses', pattern: 'external', icon: 'gitbranch' },
      ],
    },
  ],
  edges: [
    { source: 'graph', target: 'sum' },
    { source: 'sum', target: 'where' },
  ],
}
