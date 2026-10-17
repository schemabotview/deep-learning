import type { Scene } from '@graphlearning/flow'

// §5 — what offline evidence leaves open, and what goes to engineering (MLOps) rather than being
// implemented here.
export const handoff: Scene = {
  id: 'handoff',
  title: 'Limitations and engineering handoff',
  flow: 'TB',
  nodes: [
    {
      id: 'open',
      kind: 'table',
      label: 'Unresolved after offline evaluation',
      headers: ['limitation', 'evidence', 'next question', 'owner'],
      values: [
        ['new stations', 'station C: 0.83 vs 0.91 test', 'how much station data fixes it?', 'domain + ML'],
        ['dent recall', '0.86: 1 dent in 7 missed', 'what does a missed dent cost?', 'domain'],
        ['label ceiling', '8% inspector disagreement', 'adjudicate the disputed images?', 'domain'],
        ['live inputs', 'blank frames, lighting change', 'what checks run before predict?', 'MLOps'],
        ['drift over time', 'none yet: offline only', 'what to monitor, when to retrain?', 'MLOps'],
      ],
    },
    {
      id: 'pack',
      label: 'The handoff package',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-model', label: 'Checkpoint', sub: 'and its manifest', pattern: 'storage', icon: 'package' },
        { id: 'p-card', label: 'Evidence card', sub: 'val, test, station C', pattern: 'service', icon: 'barchart' },
        { id: 'p-limits', label: 'Known limits', sub: 'the table above', pattern: 'warn', icon: 'bug' },
        { id: 'p-split', label: 'Split file', sub: 'splits_v3.csv', pattern: 'network', icon: 'scissors' },
        { id: 'p-budget', label: 'Budgets', sub: 'latency, memory', pattern: 'network', icon: 'gauge' },
        { id: 'p-sensor', label: 'Sensor model', sub: 'separate evidence', pattern: 'external', icon: 'waves' },
      ],
    },
  ],
  edges: [{ source: 'open', target: 'pack', label: 'hand over with' }],
}
