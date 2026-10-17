import type { Scene } from '@graphlearning/flow'
import { f2 } from '../points'

// Per-example gradients of one weight in a batch of 4 (illustrative), and what each reduction makes of
// them — COMPUTED. Two micro-batches of 2 with mean loss, if simply accumulated, give TWICE the mean.
const g = [0.8, -0.2, 0.5, 0.1]
const mean = g.reduce((a, b) => a + b, 0) / g.length
const sum = g.reduce((a, b) => a + b, 0)
const m1 = (g[0] + g[1]) / 2
const m2 = (g[2] + g[3]) / 2

export const batchScaling: Scene = {
  id: 'batch-scaling',
  title: 'The reduction scales the gradient',
  flow: 'TB',
  nodes: [
    {
      id: 'per-example',
      kind: 'table',
      label: 'One weight’s gradient, example by example',
      headers: ['example', '1', '2', '3', '4'],
      values: [['∂Lᵢ/∂w', ...g.map((v) => f2(v, 1))]],
    },
    {
      id: 'reductions',
      kind: 'table',
      label: 'What .grad holds',
      headers: ['setup', '.grad', 'compared with the mean'],
      values: [
        ["one batch, reduction='mean'", f2(mean, 2), '1×'],
        ["one batch, reduction='sum'", f2(sum, 2), `${sum / mean}×`],
        ['2 micro-batches, mean each, accumulated', f2(m1 + m2, 2), `${f2((m1 + m2) / mean, 0)}× — divide by 2`],
      ],
    },
    {
      id: 'rules',
      label: 'Keep the scale honest',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-lr', label: 'Learning rate', sub: 'tuned for one scale', pattern: 'service', icon: 'gauge' },
        { id: 'r-acc', label: 'Accumulation', sub: 'divide by the steps', pattern: 'warn', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'per-example', target: 'reductions' },
    { source: 'reductions', target: 'rules' },
  ],
}
