import type { Scene } from '@graphlearning/flow'
import { f2 } from '../points'
import { backward } from './net'

const g = backward()
const vec = (v: number[], d = 3) => `[${v.map((u) => f2(u, d)).join(', ')}]`

// §2 — the full backward trace of the chapter network, each line the chain rule applied once.
export const layerGradients: Scene = {
  id: 'layer-gradients',
  title: 'Backward, one layer at a time',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'table',
      label: 'Backward pass · computed from the forward values',
      headers: ['gradient', 'rule', 'value'],
      values: [
        ['∂L/∂y', 'y − t', f2(g.dy, 3)],
        ['∂L/∂W₂', '∂L/∂y · h', vec(g.dW2)],
        ['∂L/∂b₂', '∂L/∂y', f2(g.db2, 3)],
        ['∂L/∂h', '∂L/∂y · W₂', vec(g.dh)],
        ['∂L/∂z₁', '∂L/∂h ⊙ [z₁ > 0]', vec(g.dz1)],
        ['∂L/∂W₁', '∂L/∂z₁ ⊗ x', `[${g.dW1.map((r) => vec(r)).join(', ')}]`],
        ['∂L/∂b₁', '∂L/∂z₁', vec(g.db1)],
      ],
    },
    {
      id: 'patterns',
      label: 'Patterns that repeat in every network',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-weight', label: 'Weight gradient', sub: 'upstream × input', pattern: 'service', icon: 'merge' },
        { id: 'p-bias', label: 'Bias gradient', sub: 'just the upstream', pattern: 'network', icon: 'sigma' },
        { id: 'p-relu', label: 'ReLU', sub: 'passes or blocks', pattern: 'user', icon: 'zap' },
        { id: 'p-shape', label: 'Same shape', sub: 'as the parameter', pattern: 'external', icon: 'ruler' },
      ],
    },
  ],
  edges: [{ source: 'trace', target: 'patterns' }],
}
