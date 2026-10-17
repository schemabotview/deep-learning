import type { Scene } from '@graphlearning/flow'

// §3 — which image transformations preserve the defect label, and a background shortcut exposed by
// testing on a station the training data never saw (illustrative scores).
export const augmentation: Scene = {
  id: 'augmentation',
  title: 'Transform the image, keep the label',
  flow: 'TB',
  nodes: [
    {
      id: 'transforms',
      kind: 'table',
      label: 'Augmentations for scratch / dent / ok',
      headers: ['transform', 'label kept?', 'why'],
      values: [
        ['horizontal flip', 'yes', 'defects have no handedness'],
        ['rotate ± 10°', 'yes', 'camera mounting varies'],
        ['brightness ± 20 %', 'yes', 'lighting varies'],
        ['random crop 50 %', 'NO', 'can cut the scratch out'],
        ['heavy blur', 'NO', 'erases fine scratches'],
      ],
    },
    {
      id: 'shortcut',
      kind: 'table',
      label: 'A background shortcut · macro-F1',
      headers: ['evaluated on', 'score', 'reading'],
      values: [
        ['validation, same stations', '0.91', 'looks excellent'],
        ['new station C', '0.62', 'dents were shot on the grey rework bench'],
        ['background masked', '0.85', 'the defect, not the bench'],
      ],
    },
    {
      id: 'breakers',
      label: 'Tests that break a shortcut',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'b-station', label: 'New station', sub: 'held out entirely', pattern: 'service', icon: 'building' },
        { id: 'b-mask', label: 'Mask background', sub: 'does the score hold?', pattern: 'network', icon: 'scissors' },
        { id: 'b-balance', label: 'Balance benches', sub: 'every class, every bench', pattern: 'user', icon: 'scale' },
        { id: 'b-errors', label: 'Read the errors', sub: 'what do misses share?', pattern: 'external', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'transforms', target: 'shortcut', label: 'and check what it learned' },
    { source: 'shortcut', target: 'breakers' },
  ],
}
