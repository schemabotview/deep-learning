import type { Scene, PlotPoint } from '@graphlearning/flow'

// Training loss by step (illustrative), resumed at step 2,000 two ways: with the saved optimiser and
// schedule state, and with only the model weights — the reset Adam moments cause a loss spike.
const steps = Array.from({ length: 81 }, (_, i) => i * 50)
const base = (s: number) => 0.2 + 0.9 * Math.exp(-s / 900)
const full: PlotPoint[] = steps.map((s) => [s, base(s)])
const weightsOnly: PlotPoint[] = steps.filter((s) => s >= 2000).map((s) => [s, base(s) + 0.45 * Math.exp(-(s - 2000) / 250)])

// §8 — resuming correctly, and telling an optimisation failure from a generalisation failure.
export const resume: Scene = {
  id: 'resume',
  title: 'Resume the whole state',
  flow: 'TB',
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'Resumed at step 2,000',
      sub: 'illustrative',
      plot: {
        x: { min: 0, max: 4000, step: 1000, label: 'step' },
        y: { min: 0, max: 1.2, step: 0.25, label: 'training loss' },
        axes: 'corner',
        series: [
          { kind: 'line', points: full, color: 'service', label: 'full state restored', labelAt: [2900, 0.17] },
          { kind: 'line', points: weightsOnly, color: 'warn', label: 'weights only', labelAt: [2150, 0.82] },
          { kind: 'segment', from: [2000, 0], to: [2000, 1.2], color: '#4b5563', dashed: true, label: 'resume', labelAt: [1700, 1.1] },
        ],
      },
    },
    {
      id: 'diagnose',
      kind: 'table',
      label: 'Which failure is it?',
      headers: ['symptom', 'likely failure', 'look at'],
      values: [
        ['training loss will not fall', 'optimisation', 'lr, init, gradients, data'],
        ['training falls, validation does not', 'generalisation', 'capacity, data, regularisation'],
        ['spike after resume', 'missing state', 'optimiser and schedule'],
      ],
    },
  ],
  edges: [{ source: 'curve', target: 'diagnose' }],
}
