import type { Scene } from '@graphlearning/flow'
import { f2 } from '../points'

// .grad ACCUMULATES across backward calls. True per-step gradients (illustrative) against what .grad
// holds with and without clearing — the running sums are COMPUTED.
const steps = [0.6, 0.5, 0.45, 0.4]
let run = 0
const rows = steps.map((g, i) => {
  run += g
  return [String(i + 1), f2(g, 2), f2(g, 2), f2(run, 2)]
})

// §7 — the missing zero_grad, and accumulation done on purpose.
export const zeroGrad: Scene = {
  id: 'zero-grad',
  title: 'Gradients add up unless you clear them',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'table',
      label: 'One weight’s .grad over four steps',
      headers: ['step', 'true gradient', 'with zero_grad()', 'without'],
      values: rows,
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'loop.py',
      label: `for i, (x, y) in enumerate(loader):
    loss = F.cross_entropy(model(x), y) / accum   # scale each micro-batch
    loss.backward()                               # .grad += this batch
    if (i + 1) % accum == 0:
        opt.step()                                # use the accumulated sum
        opt.zero_grad(set_to_none=True)           # then clear it`,
    },
    {
      id: 'spot',
      label: 'Spotting it',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-symptom', label: 'Symptom', sub: 'loss jumps, then diverges', pattern: 'warn', icon: 'zap' },
        { id: 's-norm', label: 'Log grad norm', sub: 'it climbs every step', pattern: 'service', icon: 'barchart' },
        { id: 's-none', label: 'set_to_none', sub: 'reuse fails loudly', pattern: 'network', icon: 'ban' },
        { id: 's-scale', label: 'Accumulating?', sub: 'divide the loss', pattern: 'user', icon: 'repeat' }
      ],
    },
  ],
  edges: [
    { source: 'trace', target: 'code', label: 'clear, or accumulate on purpose' },
    { source: 'code', target: 'spot' },
  ],
}
