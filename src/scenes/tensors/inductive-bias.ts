import type { Scene } from '@graphlearning/flow'

// §2 — the defect task's candidates on one grouped validation split (illustrative macro-F1), and the
// structural assumption each family brings. A neural approach is a hypothesis to test against the
// baseline, not a default.
export const inductiveBias: Scene = {
  id: 'inductive-bias',
  title: 'What each model assumes',
  flow: 'TB',
  nodes: [
    {
      id: 'scores',
      kind: 'table',
      label: 'Defect classes ok / scratch / dent · 2,400 images · validation',
      headers: ['model', 'input', 'macro-F1', 'parameters'],
      values: [
        ['majority class', '—', '0.27', '0'],
        ['hand features + logistic', '12 features', '0.71', '39'],
        ['MLP on pixels', '12,288 pixels', '0.69', '393,347'],
        ['small CNN', 'image grid', '0.86', '24,000'],
      ],
    },
    {
      id: 'biases',
      label: 'Inductive bias: the assumption built in',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'b-lin', label: 'Linear', sub: 'effects add up', pattern: 'service', icon: 'ruler' },
        { id: 'b-mlp', label: 'MLP', sub: 'no notion of space', pattern: 'warn', icon: 'layers' },
        { id: 'b-cnn', label: 'CNN', sub: 'local, repeated patterns', pattern: 'network', icon: 'boxes' },
        { id: 'b-attn', label: 'Attention', sub: 'pairwise relations', pattern: 'external', icon: 'share' },
      ],
    },
  ],
  edges: [{ source: 'scores', target: 'biases', label: 'why they differ' }],
}
