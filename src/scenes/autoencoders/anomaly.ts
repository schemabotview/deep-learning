import type { Scene, PlotPoint } from '@graphlearning/flow'
import { normal, defect, blank, threshold, rate } from './numbers'

// §5 — reconstruction error as an anomaly score: 400 normal validation images, 60 defects, 20 blank
// frames. The threshold is the 99th percentile of normal error. COMPUTED from seeded draws.
const strip = (xs: number[], y: number, seed: number): PlotPoint[] => xs.map((v, i) => [v * 1000, y + (((i * 37 + seed) % 23) / 23 - 0.5) * 0.5])
const pct = (v: number) => `${Math.round(v * 100)}%`

export const anomaly: Scene = {
  id: 'anomaly',
  title: 'Reconstruction error as an anomaly score',
  flow: 'TB',
  nodes: [
    {
      id: 'strips',
      kind: 'plot',
      label: 'Reconstruction MSE per image, validation',
      sub: `threshold = 99th percentile of normal = ${(threshold * 1000).toFixed(1)} × 10⁻³`,
      plot: {
        x: { min: 0, max: 80, step: 10, label: 'reconstruction MSE (× 10⁻³)' },
        y: { min: 0, max: 4, step: 1, label: '' },
        axes: 'corner',
        series: [
          { kind: 'scatter', points: strip(normal, 3, 1), color: 'service', size: 3, label: `normal: ${pct(rate(normal))} flagged`, labelAt: [52, 3.5] },
          { kind: 'scatter', points: strip(defect, 2, 5), color: 'warn', size: 4, label: `defects: ${pct(rate(defect))} flagged`, labelAt: [52, 2.5] },
          { kind: 'scatter', points: strip(blank, 1, 9), color: 'network', size: 5, label: `blank frames: ${pct(rate(blank))} flagged`, labelAt: [11, 1.6] },
          { kind: 'segment', from: [threshold * 1000, 0.3], to: [threshold * 1000, 3.7], color: '#e5e7eb', dashed: true },
        ],
      },
    },
    {
      id: 'limits',
      label: 'What a reconstruction score can and cannot say',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-simple', label: 'Simple anomalies', sub: 'blank frame: low error', pattern: 'warn', icon: 'ban' },
        { id: 'l-overlap', label: 'Overlap', sub: `${pct(1 - rate(defect))} of defects pass`, pattern: 'warn', icon: 'merge' },
        { id: 'l-thresh', label: 'Threshold', sub: 'set on normal val only', pattern: 'service', icon: 'ruler' },
        { id: 'l-pair', label: 'Pair with checks', sub: 'e.g. image brightness', pattern: 'service', icon: 'search' },
      ],
    },
  ],
  edges: [{ source: 'strips', target: 'limits', label: 'reading it' }],
}
