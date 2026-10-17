import type { Scene, PlotPoint } from '@graphlearning/flow'

// Activation spread through 10 ReLU layers of width 256, COMPUTED from the variance recursion
// Var_out = n · σ² · Var_in / 2 (the ReLU halves the second moment). Kaiming σ² = 2/n keeps it at 1.
const n = 256
const layers = Array.from({ length: 11 }, (_, i) => i)
const spread = (sigma: number): PlotPoint[] => layers.map((l) => [l, Math.sqrt((n * sigma * sigma) / 2) ** l])
const kaiming = Math.sqrt(2 / n)

// Two hidden units started identical stay identical: equal weights → equal outputs → equal gradients.
const w1 = [0.3, 0.3]
const w2 = 0.5
const x = [1, 2]
const z = w1[0] * x[0] + w1[1] * x[1]
const dy = w2 * 2 * z + 0 - 1 // y = w2·h + w2·h, t = 1, L = ½(y − t)²
const gradRow = x.map((xi) => dy * w2 * xi)

// §5 — symmetry and signal propagation at initialisation.
export const initialisation: Scene = {
  id: 'initialisation',
  title: 'Where training starts matters',
  flow: 'TB',
  nodes: [
    {
      id: 'spread',
      kind: 'plot',
      label: 'Activation std through 10 ReLU layers',
      sub: `width ${n} · exploding curve capped at 3`,
      plot: {
        x: { min: 0, max: 10, step: 1, label: 'layer' },
        y: { min: 0, max: 3, step: 0.5, label: 'activation std' },
        axes: 'corner',
        series: [
          { kind: 'line', points: spread(kaiming), color: 'service', label: 'Kaiming σ = √(2/n): stays 1', labelAt: [3.2, 1.15] },
          { kind: 'line', points: spread(0.01).map(([l, s]) => [l, Math.min(s, 3)] as PlotPoint), color: 'warn', label: 'σ = 0.01: vanishes', labelAt: [1.3, 0.3] },
          { kind: 'line', points: spread(0.1).map(([l, s]) => [l, Math.min(s, 3)] as PlotPoint), color: 'network', label: 'σ = 0.1: explodes', labelAt: [1.8, 2.7] },
        ],
      },
    },
    {
      id: 'symmetry',
      kind: 'table',
      label: 'Two hidden units with identical weights [0.3, 0.3]',
      headers: ['quantity', 'unit 1', 'unit 2'],
      values: [
        ['pre-activation', z.toFixed(2), z.toFixed(2)],
        ['gradient row', gradRow.map((v) => v.toFixed(3)).join(', '), gradRow.map((v) => v.toFixed(3)).join(', ')],
        ['after any number of steps', 'identical', 'identical'],
      ],
    },
  ],
  edges: [{ source: 'spread', target: 'symmetry', label: 'and break symmetry' }],
}
