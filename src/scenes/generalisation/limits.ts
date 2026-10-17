import type { Scene } from '@graphlearning/flow'

// §8 — what the defect classifier's evidence supports, and what it does not.
export const limits: Scene = {
  id: 'limits',
  title: 'Claims the evidence supports',
  flow: 'TB',
  nodes: [
    {
      id: 'claims',
      kind: 'table',
      label: 'Defect classifier · supported and unsupported claims',
      headers: ['claim', 'supported?', 'evidence'],
      values: [
        ['macro-F1 ≈ 0.86 on stations A, B', 'yes', 'test batches, 5 seeds'],
        ['works on a new station', 'no', 'station C: 0.71'],
        ['finds dents on dark parts', 'weakly', '95 images, recall 0.48'],
        ['heat map shows the reason', 'no', 'saliency is not causal'],
        ['replaces inspection', 'no', 'routes to manual check only'],
      ],
    },
    {
      id: 'doc',
      label: 'Write down',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'd-scope', label: 'Scope', sub: 'stations, finishes, lenses', pattern: 'service', icon: 'ruler' },
        { id: 'd-labels', label: 'Label quality', sub: '8 % disagreement', pattern: 'network', icon: 'tag' },
        { id: 'd-fail', label: 'Known failures', sub: 'new camera, dark parts', pattern: 'warn', icon: 'bug' },
        { id: 'd-review', label: 'Re-check', sub: 'on any station change', pattern: 'user', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'claims', target: 'doc' }],
}
