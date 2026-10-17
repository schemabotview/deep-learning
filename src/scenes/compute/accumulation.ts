import type { Scene } from '@graphlearning/flow'
import { full, micro } from './numbers'

// §3 — gradient accumulation reproduces a mean-loss gradient, but not batch-dependent layers. One
// BatchNorm channel over a batch of 64 (seeded; batches drawn in station order), whole vs 4 × 16.
export const accumulation: Scene = {
  id: 'accumulation',
  title: 'Microbatches and batch-dependent layers',
  flow: 'TB',
  nodes: [
    {
      id: 'stats',
      kind: 'table',
      label: 'One BatchNorm channel: the statistics it normalises with',
      headers: ['batch', 'examples', 'mean', 'std'],
      values: [
        ['full batch', '64', full.mu.toFixed(3), full.sd.toFixed(3)],
        ...micro.map((m, k) => [`microbatch ${k + 1}`, '16', m.mu.toFixed(3), m.sd.toFixed(3)]),
      ],
    },
    {
      id: 'same',
      label: 'Accumulating 4 × 16 instead of 64',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-grad', label: 'Mean-loss grad', sub: 'same, if loss / 4', pattern: 'service', icon: 'sigma' },
        { id: 's-bn', label: 'BatchNorm stats', sub: 'per 16, not per 64', pattern: 'warn', icon: 'scale' },
        { id: 's-con', label: 'Contrastive loss', sub: '15 negatives, not 63', pattern: 'warn', icon: 'copy' },
        { id: 's-fix', label: 'GroupNorm', sub: 'or SyncBN, or shuffle', pattern: 'service', icon: 'boxes' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'accumulate.py',
      label: `accum = 4
for i, (x, y) in enumerate(loader):              # loader batch = 16
    loss = loss_fn(model(x), y) / accum          # mean over 64, not a sum of 4 means
    loss.backward()                              # gradients add up in .grad
    if (i + 1) % accum == 0:
        opt.step(); opt.zero_grad()`,
    },
  ],
  edges: [
    { source: 'stats', target: 'same', label: 'what differs' },
    { source: 'same', target: 'code', label: 'the loop' },
  ],
}
