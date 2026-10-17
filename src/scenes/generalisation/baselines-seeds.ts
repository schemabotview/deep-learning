import type { Scene, PlotPoint } from '@graphlearning/flow'

// Validation macro-F1 per seed for four pipelines (illustrative). Means and spreads are COMPUTED.
const runs: [string, number[]][] = [
  ['hand features', [0.71, 0.71, 0.71, 0.71, 0.71]],
  ['CNN, no augmentation', [0.83, 0.81, 0.82, 0.8, 0.82]],
  ['CNN', [0.86, 0.85, 0.87, 0.86, 0.85]],
  ['CNN, no batch norm', [0.85, 0.84, 0.86, 0.85, 0.85]],
]
const stats = runs.map(([n, v]) => {
  const m = v.reduce((a, b) => a + b, 0) / v.length
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1))
  return { n, m, sd }
})
const pts: PlotPoint[] = runs.flatMap(([, v], i) => v.map((y, k) => [i + 1 + (k - 2) * 0.06, y] as PlotPoint))

// §6 — baseline, ablations and seed spread together.
export const baselinesSeeds: Scene = {
  id: 'baselines-seeds',
  title: 'Is the gain bigger than the noise?',
  flow: 'TB',
  nodes: [
    {
      id: 'spread',
      kind: 'plot',
      label: 'Five seeds per pipeline',
      sub: '1 hand features · 2 no aug · 3 CNN · 4 no BN',
      plot: {
        x: { min: 0.5, max: 4.5, step: 1, label: 'pipeline' },
        y: { min: 0.68, max: 0.9, step: 0.04, label: 'validation macro-F1' },
        axes: 'corner',
        series: [{ kind: 'scatter', points: pts, color: 'service', size: 7 }],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Mean ± sd over 5 seeds',
      headers: ['pipeline', 'mean', 'sd', 'vs CNN'],
      values: stats.map((s) => [s.n, s.m.toFixed(3), s.sd.toFixed(3), (s.m - stats[2].m >= 0 ? '+' : '') + (s.m - stats[2].m).toFixed(3)]),
    },
  ],
  edges: [{ source: 'spread', target: 'table' }],
}
