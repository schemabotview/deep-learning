import type { Scene, PlotPoint } from '@graphlearning/flow'
import { matmul, matvec, relu, sigmoid } from '../points'

const xs = Array.from({ length: 81 }, (_, i) => -4 + i * 0.1)
const curve = (f: (v: number) => number): PlotPoint[] => xs.map((x) => [x, f(x)])
const gelu = (v: number) => 0.5 * v * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (v + 0.044715 * v ** 3)))

// Two affine layers with no activation collapse to one, COMPUTED:
// W2(W1 x + b1) + b2 = (W2 W1) x + (W2 b1 + b2).
const W1 = [[1, 2], [0, 1]]
const b1 = [1, 0]
const W2 = [[1, -1]]
const b2 = [0.5]
const W = matmul(W2, W1)[0]
const b = matvec(W2, b1)[0] + b2[0]

// §1 — four activations, and the reason one is needed at all.
export const affineCollapse: Scene = {
  id: 'affine-collapse',
  title: 'Why the nonlinearity matters',
  flow: 'TB',
  nodes: [
    {
      id: 'activations',
      kind: 'plot',
      label: 'Common activations',
      plot: {
        x: { min: -4, max: 4, step: 1, label: 'pre-activation z' },
        y: { min: -1.2, max: 4, step: 1, label: 'activation' },
        axes: 'origin',
        series: [
          { kind: 'line', points: curve(relu), color: 'service', label: 'ReLU', labelAt: [2.7, 3.3] },
          { kind: 'line', points: curve(gelu), color: 'network', dashed: true, label: 'GELU', labelAt: [3.2, 2.5] },
          { kind: 'line', points: curve(sigmoid), color: 'user', label: 'sigmoid', labelAt: [2.6, 0.7] },
          { kind: 'line', points: curve(Math.tanh), color: 'warn', label: 'tanh', labelAt: [-3.8, -0.75] },
        ],
      },
    },
    {
      id: 'collapse',
      kind: 'table',
      label: 'Two affine layers, no activation',
      headers: ['term', 'value'],
      values: [
        ['W₁, b₁', '[[1, 2], [0, 1]],  [1, 0]'],
        ['W₂, b₂', '[[1, −1]],  [0.5]'],
        ['W₂W₁', `[[${W.join(', ')}]]`],
        ['W₂b₁ + b₂', String(b)],
        ['result', `one layer: y = [${W.join(', ')}]·x + ${b}`],
      ],
    },
  ],
  edges: [{ source: 'activations', target: 'collapse', label: 'without them' }],
}
