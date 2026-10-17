import type { Scene } from '@graphlearning/flow'

// Dropout on one activation vector, COMPUTED: p = 0.25, survivors scaled by 1/(1 − p) so the
// expected value of every element is unchanged.
const h = [1, 2, 3, 4]
const mask = [1, 0, 1, 1]
const p = 0.25
const out = h.map((v, i) => (mask[i] * v) / (1 - p))

// §2 — dropout's mechanism, and the regularisers compared on the defect CNN (illustrative).
export const regularisers: Scene = {
  id: 'regularisers',
  title: 'Three ways to hold a network back',
  flow: 'TB',
  nodes: [
    {
      id: 'dropout',
      kind: 'table',
      label: 'Dropout(p = 0.25) in train mode',
      headers: ['', 'h₁', 'h₂', 'h₃', 'h₄'],
      values: [
        ['activation', ...h.map(String)],
        ['random mask', ...mask.map(String)],
        ['× mask / 0.75', ...out.map((v) => v.toFixed(2))],
        ['in eval mode', ...h.map(String)],
      ],
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Defect CNN · macro-F1 · mean of 3 seeds',
      headers: ['regulariser', 'training', 'validation', 'gap'],
      values: [
        ['none', '0.99', '0.80', '0.19'],
        ['dropout 0.3', '0.95', '0.84', '0.11'],
        ['decoupled decay 5e-4', '0.96', '0.84', '0.12'],
        ['early stopping', '0.93', '0.85', '0.08'],
        ['all three', '0.92', '0.86', '0.06'],
      ],
    },
  ],
  edges: [{ source: 'dropout', target: 'compare', label: 'on the real task' }],
}
