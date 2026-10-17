import type { Scene, PlotPoint } from '@graphlearning/flow'
import { relu } from '../points'

// A 2-2-1 ReLU network that computes XOR, traced exactly:
// h1 = relu(x1 + x2), h2 = relu(x1 + x2 − 1), y = h1 − 2·h2. Parameters: (2·2 + 2) + (2·1 + 1) = 9.
const inputs: PlotPoint[] = [[0, 0], [0, 1], [1, 0], [1, 1]]
const trace = inputs.map(([a, b]) => {
  const h1 = relu(a + b)
  const h2 = relu(a + b - 1)
  return { a, b, h1, h2, y: h1 - 2 * h2 }
})
const params = 2 * 2 + 2 + (2 * 1 + 1)

// §2 — XOR: no line separates it in input space; one hidden layer makes it separable.
export const xor: Scene = {
  id: 'xor',
  title: 'XOR, one hidden layer',
  flow: 'TB',
  nodes: [
    {
      id: 'space',
      kind: 'plot',
      label: 'XOR in input space',
      sub: 'no single line separates the classes',
      plot: {
        x: { min: -1.2, max: 2.2, step: 0.5, label: 'x₁' },
        y: { min: -0.5, max: 1.5, step: 0.5, label: 'x₂' },
        axes: 'corner',
        equal: true,
        series: [
          { kind: 'scatter', points: trace.filter((t) => t.y === 0).map((t) => [t.a, t.b] as PlotPoint), color: 'network', size: 12, label: 'XOR = 0', labelAt: [-0.4, -0.35] },
          { kind: 'scatter', points: trace.filter((t) => t.y === 1).map((t) => [t.a, t.b] as PlotPoint), color: 'warn', size: 12, label: 'XOR = 1', labelAt: [1.08, -0.1] },
        ],
      },
    },
    {
      id: 'forward',
      kind: 'table',
      label: `Forward pass · ${params} parameters`,
      headers: ['x₁', 'x₂', 'h₁ = relu(x₁+x₂)', 'h₂ = relu(x₁+x₂−1)', 'y = h₁ − 2h₂'],
      values: trace.map((t) => [t.a, t.b, t.h1, t.h2, t.y].map(String)),
    },
  ],
  edges: [{ source: 'space', target: 'forward', label: 'traced exactly' }],
}
