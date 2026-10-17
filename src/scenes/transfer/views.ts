import type { Scene } from '@graphlearning/flow'

// §6 — a positive pair must keep what the downstream task needs. For defects, the scratch IS the
// signal: a view that crops or blurs it away teaches the encoder to ignore it.
export const views: Scene = {
  id: 'views',
  title: 'Positive views, false negatives, collapse',
  flow: 'TB',
  nodes: [
    {
      id: 'augs',
      kind: 'table',
      label: 'Does the view keep the defect?',
      headers: ['transformation', 'keeps a 2-pixel scratch?', 'verdict'],
      values: [
        ['horizontal flip', 'yes, mirrored', 'safe'],
        ['rotation ±10°', 'yes', 'safe'],
        ['random 30% crop', 'often cropped out', 'unsafe: positive without the defect'],
        ['Gaussian blur σ = 3', 'erased', 'unsafe: teaches scratch invariance'],
        ['colour jitter', 'yes, but hides discolouring', 'check per defect class'],
      ],
    },
    {
      id: 'failures',
      label: 'Two failures of the signal',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'f-neg', label: 'False negatives', sub: 'two dents, pushed apart', pattern: 'warn', icon: 'swap' },
        { id: 'f-col', label: 'Collapse', sub: 'every z the same', pattern: 'warn', icon: 'merge' },
        { id: 'f-batch', label: 'Batch by group', sub: 'or drop near twins', pattern: 'service', icon: 'boxes' },
        { id: 'f-std', label: 'Watch z.std(0)', sub: 'falls to 0 on collapse', pattern: 'service', icon: 'gauge' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'collapse_check.py',
      label: `z = F.normalize(enc(x_val), dim=1)       # [N, 128], unit length
spread = z.std(dim=0).mean()               # ≈ 1/√128 = 0.088 if spread out
if spread < 0.01: print("collapse: every image maps to (nearly) one point")`,
    },
  ],
  edges: [
    { source: 'augs', target: 'failures', label: 'and beyond views' },
    { source: 'failures', target: 'code', label: 'a cheap check' },
  ],
}
