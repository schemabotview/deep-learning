import type { Scene, PlotPoint } from '@graphlearning/flow'

// Linear warmup for 500 steps, then cosine decay to zero at 5,000 (a common schedule), COMPUTED.
const peak = 1e-3
const lrAt = (s: number) => (s < 500 ? (peak * s) / 500 : (peak * 0.5 * (1 + Math.cos((Math.PI * (s - 500)) / 4500))))
const sched: PlotPoint[] = Array.from({ length: 101 }, (_, i) => {
  const s = i * 50
  return [s, lrAt(s) * 1000]
})
// Global-norm clipping: a gradient of norm 12 scaled to max_norm 1 keeps its direction.
const norm = 12
const maxNorm = 1

// §6 — the schedule, clipping, and the numbers worth logging every step.
export const schedules: Scene = {
  id: 'schedules',
  title: 'Steering the steps',
  flow: 'TB',
  nodes: [
    {
      id: 'lr',
      kind: 'plot',
      label: 'Warmup then cosine decay',
      sub: 'peak 1e-3 at step 500',
      plot: {
        x: { min: 0, max: 5000, step: 1000, label: 'optimiser step' },
        y: { min: 0, max: 1.1, step: 0.25, label: 'learning rate (×1e-3)' },
        axes: 'corner',
        series: [
          { kind: 'line', points: sched, color: 'service' },
          { kind: 'segment', from: [500, 0], to: [500, 1.1], color: '#4b5563', dashed: true, label: 'warmup ends', labelAt: [600, 0.15] },
        ],
      },
    },
    {
      id: 'clip',
      kind: 'table',
      label: 'clip_grad_norm_(params, max_norm=1.0)',
      headers: ['', 'value'],
      values: [
        ['global gradient norm', String(norm)],
        ['scale applied', `${maxNorm} / ${norm} = ${(maxNorm / norm).toFixed(3)}`],
        ['direction', 'unchanged'],
        ['norm after clipping', String(maxNorm)],
      ],
    },
    {
      id: 'logs',
      label: 'Log every step',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'l-loss', label: 'Loss', sub: 'NaN or inf: stop', pattern: 'warn', icon: 'gauge' },
        { id: 'l-norm', label: 'Gradient norm', sub: 'spikes before blow-ups', pattern: 'service', icon: 'barchart' },
        { id: 'l-lr', label: 'Learning rate', sub: 'is the schedule on?', pattern: 'network', icon: 'calendar' },
        { id: 'l-dead', label: 'Dead ReLUs', sub: 'share always zero', pattern: 'external', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'lr', target: 'clip', label: 'and clip' },
    { source: 'clip', target: 'logs' },
  ],
}
