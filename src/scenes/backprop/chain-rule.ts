import type { Scene } from '@graphlearning/flow'
import { f2 } from '../points'
import { b2, forward, t, W2, x } from './net'

const fw = forward()

// §1 — the network as a computation graph, each edge labelled with its local derivative, over the
// forward values every backward step will reuse.
export const chainRule: Scene = {
  id: 'chain-rule',
  title: 'A graph of local derivatives',
  flow: 'LR',
  nodes: [
    {
      id: 'graph',
      label: 'Forward graph · each edge knows its local derivative',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'g-x', label: 'x, W₁, b₁', sub: 'inputs and parameters', pattern: 'storage', icon: 'database' },
        { id: 'g-z', label: 'z₁ = W₁x + b₁', sub: '∂z₁/∂W₁ = x', pattern: 'service', icon: 'sigma' },
        { id: 'g-h', label: 'h = relu(z₁)', sub: '∂h/∂z₁ = 1 if z₁ > 0', pattern: 'network', icon: 'zap' },
        { id: 'g-y', label: 'y = W₂·h + b₂', sub: '∂y/∂h = W₂', pattern: 'service', icon: 'sigma' },
        { id: 'g-L', label: 'L = ½(y − t)²', sub: '∂L/∂y = y − t', pattern: 'warn', icon: 'gauge' },
      ],
      edges: [
        { source: 'g-x', target: 'g-z' },
        { source: 'g-z', target: 'g-h' },
        { source: 'g-h', target: 'g-y' },
        { source: 'g-y', target: 'g-L' },
      ],
    },
    {
      id: 'values',
      kind: 'table',
      label: 'Forward values, kept for backward',
      headers: ['quantity', 'value'],
      values: [
        ['x', `[${x.join(', ')}]`],
        ['z₁', `[${fw.z1.map((v) => f2(v)).join(', ')}]`],
        ['h', `[${fw.h.map((v) => f2(v)).join(', ')}]`],
        ['W₂, b₂', `[${W2.join(', ')}], ${b2}`],
        ['y', f2(fw.y)],
        ['target t', String(t)],
        ['L', f2(fw.L, 4)],
      ],
    },
  ],
  edges: [{ source: 'graph', target: 'values', label: 'evaluated' }],
}
