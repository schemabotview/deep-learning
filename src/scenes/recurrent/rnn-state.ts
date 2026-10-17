import type { Scene } from '@graphlearning/flow'

// A one-unit RNN on four sensor readings, COMPUTED: h_t = tanh(w·h_{t−1} + u·x_t + b), with the SAME
// w = 0.8, u = 1.0, b = 0 at every step, starting from h_0 = 0.
const w = 0.8, u = 1.0, b = 0
const xs = [0.5, 1.0, -0.5, 0.2]
let h = 0
const steps = xs.map((x, t) => {
  const pre = w * h + u * x + b
  const prev = h
  h = Math.tanh(pre)
  return { t: t + 1, x, prev, pre, h }
})

// §4 — recurrent state carried forward with shared parameters.
export const rnnState: Scene = {
  id: 'rnn-state',
  title: 'State carried forward',
  flow: 'LR',
  padding: 0.08, // wide board: let it reach the pane
  nodes: [
    {
      id: 'unrolled',
      label: 'Unrolled in time · one cell, reused',
      pattern: 'group',
      flow: 'TB',
      children: steps.map((s) => ({ id: `cell${s.t}`, label: `step ${s.t}`, sub: `x = ${s.x}, h = ${s.h.toFixed(2)}`, pattern: 'service' as const, icon: 'repeat' })),
      edges: steps.slice(1).map((s) => ({ source: `cell${s.t - 1}`, target: `cell${s.t}`, label: 'h' })),
    },
    {
      id: 'trace',
      kind: 'table',
      label: 'h_t = tanh(0.8·h_{t−1} + 1.0·x_t)',
      headers: ['t', 'x_t', 'h_{t−1}', 'pre-activation', 'h_t'],
      values: steps.map((s) => [String(s.t), String(s.x), s.prev.toFixed(3), s.pre.toFixed(3), s.h.toFixed(3)]),
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'rnn.py',
      label: `rnn = nn.RNN(input_size=4, hidden_size=32,
             batch_first=True)          # tanh by default
out, h_n = rnn(sensor)                  # sensor: [N, 120, 4]
# out: [N, 120, 32], every step's state
# h_n: [1, N, 32], the last step's state`,
    },
  ],
  edges: [
    { source: 'unrolled', target: 'trace', label: 'computed' },
    { source: 'unrolled', target: 'code', label: 'in PyTorch' },
  ],
}
