import type { Scene } from '@graphlearning/flow'
import { f2 } from '../points'

// Large logits overflow a naive softmax: exp(1000) is +inf in float32 and float64 alike, so the
// ratio is inf / inf = NaN. Subtracting the max first gives identical maths and finite numbers.
const logits = [1000, 999, 998]
const m = Math.max(...logits)
const shifted = logits.map((z) => z - m)
const e = shifted.map(Math.exp)
const s = e.reduce((a, b) => a + b, 0)
const p = e.map((v) => v / s)
const lse = m + Math.log(s)

// §6 — the overflow, the log-sum-exp fix, and reduction conventions.
export const stableSoftmax: Scene = {
  id: 'stable-softmax',
  title: 'Softmax without overflow',
  flow: 'TB',
  nodes: [
    {
      id: 'overflow',
      kind: 'table',
      label: 'logits [1000, 999, 998]',
      headers: ['step', 'naive', 'max subtracted'],
      values: [
        ['exp(z)', 'inf, inf, inf', e.map((v) => f2(v, 3)).join(', ')],
        ['sum', 'inf', f2(s, 3)],
        ['softmax', 'NaN, NaN, NaN', p.map((v) => f2(v, 3)).join(', ')],
        ['log-sum-exp', 'inf', f2(lse, 3)],
      ],
    },
    {
      id: 'reduction',
      kind: 'table',
      label: 'Reduction: how per-example losses become one number',
      headers: ['reduction', 'value', 'gradient scale'],
      values: [
        ["'mean'", 'average over N', 'independent of N'],
        ["'sum'", 'total over N', 'grows with N'],
        ["'none'", 'one loss per example', 'you reduce it'],
      ],
    },
  ],
  edges: [{ source: 'overflow', target: 'reduction', label: 'and then reduce' }],
}
