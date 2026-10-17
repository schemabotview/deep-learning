import type { Scene } from '@graphlearning/flow'
import { f2 } from '../points'

// Per-token losses for two text fragments padded to length 3. The model predicts PAD easily, so pad
// positions have tiny losses that drag an unmasked mean down. Both means are COMPUTED.
const losses = [
  [0.5, 0.7, 0.6],
  [0.4, 0.01, 0.01],
]
const mask = [
  [1, 1, 1],
  [1, 0, 0],
]
const all = losses.flat()
const unmasked = all.reduce((a, b) => a + b, 0) / all.length
const kept = losses.flat().filter((_, i) => mask.flat()[i] === 1)
const masked = kept.reduce((a, b) => a + b, 0) / kept.length

// §7 — padding contaminating a mean, and a two-head objective with its weights.
export const maskedLoss: Scene = {
  id: 'masked-loss',
  title: 'What the mean is over',
  flow: 'TB',
  nodes: [
    {
      id: 'tokens',
      kind: 'table',
      label: 'Per-token loss · second fragment padded',
      headers: ['fragment', 't0', 't1', 't2', 'mask'],
      values: [
        ...losses.map((row, i) => [String(i), ...row.map((v) => f2(v)), mask[i].join('')]),
        ['mean', `unmasked ${f2(unmasked, 3)}`, `masked ${f2(masked, 3)}`, '', ''],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'two_heads.py',
      label: `tok = F.cross_entropy(logits.transpose(1, 2), y, reduction="none")
tok_loss = (tok * mask).sum() / mask.sum()        # mean over real tokens
# or: F.cross_entropy(..., ignore_index=PAD_ID)

loss = F.cross_entropy(cls_logits, defect) + 0.5 * F.mse_loss(length_pred, length)
# the 0.5 is a choice; report each head's metric separately`,
    },
    {
      id: 'weights',
      label: 'Other ways the average is reshaped',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ignore', label: 'ignore_index', sub: 'skip the PAD id', pattern: 'service', icon: 'ban' },
        { id: 'classw', label: 'Class weights', sub: 'rare dents count more', pattern: 'network', icon: 'scale' },
        { id: 'headw', label: 'Head weights', sub: 'trade task against task', pattern: 'user', icon: 'merge' },
        { id: 'metrics', label: 'Metrics apart', sub: 'one per head', pattern: 'external', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'tokens', target: 'code', label: 'mask it' },
    { source: 'code', target: 'weights' },
  ],
}
