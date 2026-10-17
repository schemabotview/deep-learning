import type { Scene } from '@graphlearning/flow'
import { f2 } from '../points'
import { backward } from './net'

const g = backward()
const v = (a: number[]) => `[${a.map((u) => f2(u, 3)).join(', ')}]`

// §3 — why reverse mode: one backward pass gives the gradient for every parameter, because each step
// multiplies an upstream gradient row-vector by a local Jacobian (a vector–Jacobian product).
export const vjp: Scene = {
  id: 'vjp',
  title: 'Reverse accumulation',
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      label: 'Gradient flows back as vector × Jacobian',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'v-L', label: '∂L/∂y', sub: 'a scalar to start', pattern: 'warn', icon: 'gauge' },
        { id: 'v-h', label: '∂L/∂h', sub: '= ∂L/∂y · ∂y/∂h', pattern: 'service', icon: 'merge' },
        { id: 'v-z', label: '∂L/∂z₁', sub: '= ∂L/∂h · ∂h/∂z₁', pattern: 'network', icon: 'merge' },
      ],
      edges: [
        { source: 'v-L', target: 'v-h' },
        { source: 'v-h', target: 'v-z' },
      ],
    },
    {
      id: 'cost',
      kind: 'table',
      label: 'One scalar loss, P parameters',
      headers: ['mode', 'passes for the full gradient', 'stores'],
      values: [
        ['forward mode', 'P (one per parameter)', 'little'],
        ['reverse mode', '1 forward + 1 backward', 'forward activations'],
        ['finite differences', '2P forward passes', 'little, and inexact'],
      ],
    },
    {
      id: 'network',
      kind: 'table',
      label: 'The chapter network, as vector × Jacobian',
      headers: ['step', 'upstream × local', 'result'],
      values: [
        ['∂L/∂y', 'start', f2(g.dy, 3)],
        ['∂L/∂h', '∂L/∂y · W₂', v(g.dh)],
        ['∂L/∂z₁', '∂L/∂h ⊙ relu′(z₁)', v(g.dz1)],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'vjp.py',
      label: `y = f(x)                                   # y: [N, D]
(g,) = torch.autograd.grad(y, x, grad_outputs=v)   # v: [N, D]
# g = vᵀ · ∂y/∂x, without ever forming the Jacobian`,
    },
  ],
  edges: [
    { source: 'chain', target: 'network', label: 'traced' },
    { source: 'network', target: 'cost', label: 'why it is cheap' },
    { source: 'cost', target: 'code', label: 'in PyTorch' },
  ],
}
