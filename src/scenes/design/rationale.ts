import type { Scene } from '@graphlearning/flow'
import { candidates, baseline, n } from './candidates'

// §1 — the task contract, and why each candidate is on the list.
export const rationale: Scene = {
  id: 'rationale',
  title: 'Task, architecture, objective, baseline',
  flow: 'TB',
  nodes: [
    {
      id: 'contract',
      label: 'The task contract, fixed before any model',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-in', label: 'Input', sub: 'one image at inspection', pattern: 'storage', icon: 'scanface' },
        { id: 'c-out', label: 'Output', sub: 'ok / scratch / dent', pattern: 'service', icon: 'tag' },
        { id: 'c-split', label: 'Split', sub: 'by production batch', pattern: 'network', icon: 'scissors' },
        { id: 'c-metric', label: 'Metric', sub: 'macro-F1 + dent recall', pattern: 'service', icon: 'barchart' },
        { id: 'c-budget', label: 'Budget', sub: '≤ 50 ms on CPU', pattern: 'warn', icon: 'gauge' },
        { id: 'c-ceiling', label: 'Label ceiling', sub: '92% inspector agreement', pattern: 'warn', icon: 'ruler' },
      ],
    },
    {
      id: 'why',
      kind: 'table',
      label: 'Candidates and the assumption each tests',
      headers: ['candidate', 'parameters', 'objective', 'why it is on the list'],
      values: [
        [baseline.name, n(baseline.params), 'cross-entropy', 'the bar any network must clear'],
        [candidates[0].name, n(candidates[0].params), 'cross-entropy', 'does capacity alone help?'],
        [candidates[1].name, n(candidates[1].params), 'cross-entropy', 'local, repeated patterns'],
        [candidates[2].name, n(candidates[2].params), 'cross-entropy', 'reuse general visual features'],
      ],
    },
  ],
  edges: [{ source: 'contract', target: 'why', label: 'then the candidates' }],
}
