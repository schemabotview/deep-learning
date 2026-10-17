import type { Scene } from '@graphlearning/flow'

// §4 — the output head is decided by the target, and the loss by the head. One workshop example per row.
export const heads: Scene = {
  id: 'heads',
  title: 'Match the head to the target',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Output head · loss · target, in PyTorch',
      headers: ['task', 'output', 'loss', 'target'],
      values: [
        ['regression', '1 value', 'MSELoss', 'float [N, 1]'],
        ['binary', '1 logit', 'BCEWithLogitsLoss', 'float 0/1 [N, 1]'],
        ['multiclass', 'K logits', 'CrossEntropyLoss', 'int64 class [N]'],
        ['multilabel', 'K logits', 'BCEWithLogitsLoss', 'float 0/1 [N, K]'],
      ],
    },
    {
      id: 'examples',
      label: 'The same workshop, four questions',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'e-reg', label: 'Regression', sub: 'scratch length, mm', pattern: 'service', icon: 'ruler' },
        { id: 'e-bin', label: 'Binary', sub: 'any defect at all?', pattern: 'network', icon: 'circlecheck' },
        { id: 'e-multi', label: 'Multiclass', sub: 'ok, scratch or dent', pattern: 'user', icon: 'tag' },
        { id: 'e-label', label: 'Multilabel', sub: 'scratch and dent both', pattern: 'external', icon: 'boxes' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'examples' }],
}
