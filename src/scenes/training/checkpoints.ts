import type { Scene, PlotPoint } from '@graphlearning/flow'

// Training and validation loss by epoch (illustrative). The checkpoint kept is the one with the best
// VALIDATION score; the test set is not consulted until the choice is final.
const epochs = Array.from({ length: 30 }, (_, i) => i + 1)
const train: PlotPoint[] = epochs.map((e) => [e, 0.15 + 0.9 * Math.exp(-e / 6)])
const valAt = (e: number) => 0.38 + 0.7 * Math.exp(-e / 5) + 0.0009 * (e - 14) ** 2 * (e > 14 ? 1 : 0)
const val: PlotPoint[] = epochs.map((e) => [e, valAt(e)])
const best = epochs.reduce((a, e) => (valAt(e) < valAt(a) ? e : a), 1)

// §3 — choosing a checkpoint on validation, and what the record keeps.
export const checkpoints: Scene = {
  id: 'checkpoints',
  title: 'Keep the best on validation',
  flow: 'TB',
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'Loss by epoch · defect classifier',
      sub: 'illustrative',
      plot: {
        x: { min: 0, max: 30, step: 5, label: 'epoch' },
        y: { min: 0, max: 1.2, step: 0.25, label: 'cross-entropy' },
        axes: 'corner',
        series: [
          { kind: 'line', points: train, color: 'service', label: 'training', labelAt: [22, 0.1] },
          { kind: 'line', points: val, color: 'warn', label: 'validation', labelAt: [22, 0.55] },
          { kind: 'marker', at: [best, valAt(best)], color: 'user', size: 10, label: `best: epoch ${best}`, labelAt: [best + 0.6, valAt(best) - 0.1] },
        ],
      },
    },
    {
      id: 'record',
      kind: 'table',
      label: 'Checkpoint record',
      headers: ['field', 'value'],
      values: [
        ['selected by', `lowest validation loss · epoch ${best}`],
        ['validation loss', valAt(best).toFixed(3)],
        ['saved', 'model, optimiser, schedule, epoch, RNG'],
        ['test set', 'untouched until selection is final'],
      ],
    },
  ],
  edges: [{ source: 'curves', target: 'record' }],
}
