import type { Scene } from '@graphlearning/flow'
import { sigmoid } from '../points'

// One LSTM step with given gate pre-activations (illustrative), COMPUTED:
// f = σ(2.0), i = σ(0.0), g = tanh(1.0), o = σ(1.0); c = f·c_prev + i·g; h = o·tanh(c).
const cPrev = 0.5
const f = sigmoid(2.0)
const i = sigmoid(0.0)
const g = Math.tanh(1.0)
const o = sigmoid(1.0)
const c = f * cPrev + i * g
const h = o * Math.tanh(c)
const n = (v: number) => v.toFixed(3)

// §6 — the gates, one step, and why the cell path helps gradients.
export const lstm: Scene = {
  id: 'lstm',
  title: 'Gates decide what to keep',
  flow: 'TB',
  nodes: [
    {
      id: 'step',
      kind: 'table',
      label: 'One LSTM step · c_prev = 0.5',
      headers: ['gate', 'formula', 'value', 'role'],
      values: [
        ['forget f', 'σ(2.0)', n(f), 'keep 88 % of the old cell'],
        ['input i', 'σ(0.0)', n(i), 'admit half the candidate'],
        ['candidate g', 'tanh(1.0)', n(g), 'proposed new content'],
        ['output o', 'σ(1.0)', n(o), 'expose 73 % of the cell'],
        ['cell c', 'f·c_prev + i·g', n(c), 'additive update'],
        ['hidden h', 'o·tanh(c)', n(h), 'what the next layer sees'],
      ],
    },
    {
      id: 'why',
      label: 'Why gating helps',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-add', label: 'Additive cell', sub: 'gradient path through f', pattern: 'service', icon: 'merge' },
        { id: 'w-forget', label: 'f near 1', sub: 'memory persists', pattern: 'network', icon: 'history' },
        { id: 'w-gru', label: 'GRU', sub: '2 gates, no separate cell', pattern: 'external', icon: 'layers' },
        { id: 'w-cost', label: 'Cost', sub: '4× an RNN’s weights', pattern: 'warn', icon: 'cpu' },
      ],
    },
  ],
  edges: [{ source: 'step', target: 'why' }],
}
