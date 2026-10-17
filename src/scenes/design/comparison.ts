import type { Scene } from '@graphlearning/flow'
import { candidates, baseline, mean, spread, budget } from './candidates'

// §3 — the three predictors on quality, robustness, failure and resources, against the declared
// budget. Sensor-sequence evidence is a different task and is not mixed into this table.
const pm = (xs: number[]) => `${mean(xs).toFixed(3)} ± ${spread(xs).toFixed(3)}`

export const designComparison: Scene = {
  id: 'design-comparison',
  title: 'Quality, robustness and resources',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Defect predictors · same split, seeds and budget',
      headers: ['model', 'val macro-F1 (3 seeds)', 'test', 'station C', 'dent recall', 'CPU ms'],
      values: [
        [baseline.name, baseline.val.toFixed(3), baseline.test.toFixed(2), baseline.stationC.toFixed(2), '—', '0.1'],
        ...candidates.map((c) => [c.name, pm(c.val), c.test.toFixed(2), c.stationC.toFixed(2), c.dentRecall.toFixed(2), String(c.cpuMs)]),
      ],
    },
    {
      id: 'reading',
      label: 'Reading the table',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-mlp', label: 'MLP', sub: 'below the baseline', pattern: 'warn', icon: 'ban' },
        { id: 'r-gap', label: 'Station C gap', sub: 'all three drop', pattern: 'warn', icon: 'building' },
        { id: 'r-ceiling', label: 'Near the ceiling', sub: `test 0.91 vs ${budget.labelCeiling}`, pattern: 'network', icon: 'ruler' },
        { id: 'r-budget', label: 'Within budget', sub: `28 ms ≤ ${budget.cpuMs} ms`, pattern: 'service', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'reading', label: 'what it says' }],
}
