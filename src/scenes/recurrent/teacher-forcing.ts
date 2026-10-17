import type { Scene, PlotPoint } from '@graphlearning/flow'

// Sensor-forecast error against horizon (illustrative): trained with teacher forcing, a model fed its
// own predictions at test time accumulates error faster than its one-step score suggests.
const hs = Array.from({ length: 12 }, (_, i) => i + 1)
const oneStep: PlotPoint[] = hs.map((h) => [h, 0.8])
const freeRun: PlotPoint[] = hs.map((h) => [h, 0.8 * (1 + 0.28 * (h - 1)) ** 1.1])

// §8 — teacher forcing, free-running evaluation and temporal splits.
export const teacherForcing: Scene = {
  id: 'teacher-forcing',
  title: 'Trained on the truth, tested on itself',
  flow: 'TB',
  nodes: [
    {
      id: 'horizon',
      kind: 'plot',
      label: 'Forecast error by horizon · test months',
      sub: 'mean absolute error, °C · illustrative',
      plot: {
        x: { min: 0, max: 12, step: 2, label: 'steps ahead' },
        y: { min: 0, max: 5, step: 1, label: 'MAE' },
        axes: 'corner',
        series: [
          { kind: 'line', points: oneStep, color: 'service', label: 'true history fed in (one step)', labelAt: [4, 0.45] },
          { kind: 'line', points: freeRun, color: 'warn', label: 'own predictions fed back', labelAt: [5.5, 3.3] },
        ],
      },
    },
    {
      id: 'split',
      kind: 'table',
      label: 'Temporal evaluation for the sensor model',
      headers: ['part', 'months', 'used for'],
      values: [
        ['train', 'Jan – Jun', 'fit, teacher-forced'],
        ['validation', 'Jul', 'choose epoch and horizon'],
        ['test', 'Aug', 'free-running, once'],
      ],
    },
  ],
  edges: [{ source: 'horizon', target: 'split', label: 'evaluate as deployed' }],
}
