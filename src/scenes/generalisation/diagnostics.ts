import type { Scene, PlotPoint } from '@graphlearning/flow'

// Training loss on a tiny subset of 32 images (illustrative): a healthy pipeline drives it to ~0;
// a broken one (here, a stray .detach() stops gradients reaching the conv layers) cannot.
const steps = Array.from({ length: 41 }, (_, i) => i * 10)
const healthy: PlotPoint[] = steps.map((s) => [s, 1.1 * Math.exp(-s / 60) + 0.01])
const broken: PlotPoint[] = steps.map((s) => [s, 1.1 - 0.25 * (1 - Math.exp(-s / 80))])

// §5 — the tiny-subset test and per-layer gradient and activation statistics.
export const diagnostics: Scene = {
  id: 'diagnostics',
  title: 'Can it fit 32 images?',
  flow: 'TB',
  nodes: [
    {
      id: 'tiny',
      kind: 'plot',
      label: 'Training loss on 32 images, no regularisation',
      sub: 'illustrative',
      plot: {
        x: { min: 0, max: 400, step: 100, label: 'step' },
        y: { min: 0, max: 1.2, step: 0.25, label: 'training loss' },
        axes: 'corner',
        series: [
          { kind: 'line', points: healthy, color: 'service', label: 'healthy: reaches ~0', labelAt: [210, 0.12] },
          { kind: 'line', points: broken, color: 'warn', label: 'stuck: look for a bug', labelAt: [210, 0.95] },
        ],
      },
    },
    {
      id: 'layers',
      kind: 'table',
      label: 'Per-layer statistics, step 100 · deep sigmoid MLP',
      headers: ['layer', 'grad norm', 'activations saturated'],
      values: [
        ['fc1', '3e-7', '96 %'],
        ['fc2', '4e-5', '91 %'],
        ['fc3', '2e-3', '60 %'],
        ['head', '1e-1', '—'],
      ],
    },
  ],
  edges: [{ source: 'tiny', target: 'layers', label: 'then look inside' }],
}
