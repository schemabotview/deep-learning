import type { Scene, PlotPoint } from '@graphlearning/flow'
import { configs, meanSd } from './numbers'

// §6 — a measured comparison: throughput COMPUTED from step time (batch 64), peak memory, and
// validation macro-F1 over three seeds. Illustrative measurements.
const ips = (ms: number) => (64 / ms) * 1000
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length

export const comparison: Scene = {
  id: 'comparison',
  title: 'Measured quality–resource comparisons',
  flow: 'TB',
  nodes: [
    {
      id: 'plot',
      kind: 'plot',
      label: 'Throughput against validation macro-F1, 3 seeds each',
      sub: 'batch 64 · illustrative measurements',
      plot: {
        x: { min: 0, max: 3500, step: 500, label: 'images per second' },
        y: { min: 0.2, max: 1, step: 0.2, label: 'macro-F1' },
        axes: 'corner',
        series: [
          ...configs.map((c, i) => ({
            kind: 'scatter' as const,
            points: c.f1.map((f) => [ips(c.ms), f] as PlotPoint),
            color: i === 3 ? 'warn' : 'service',
            size: 6,
          })),
          { kind: 'marker', at: [ips(configs[0].ms), mean(configs[0].f1)], label: 'fp32', color: 'network' },
          { kind: 'marker', at: [ips(configs[1].ms), mean(configs[1].f1)], label: '+ workers', color: 'service' },
          { kind: 'marker', at: [ips(configs[2].ms), mean(configs[2].f1)], label: 'bf16 autocast', color: 'service' },
          { kind: 'marker', at: [ips(configs[3].ms), mean(configs[3].f1)], label: 'fp16, no scaler', color: 'warn' },
        ],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Each change, measured on the same split and seeds',
      headers: ['configuration', 'step ms', 'images / s', 'peak GB', 'macro-F1 (3 seeds)'],
      values: configs.map((c) => [c.name, c.ms.toFixed(1), ips(c.ms).toFixed(0), c.gb.toFixed(1), meanSd(c.f1)]),
    },
  ],
  edges: [{ source: 'plot', target: 'table', label: 'the measurements' }],
}
