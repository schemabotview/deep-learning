import type { Scene, PlotPoint } from '@graphlearning/flow'

// §8 — illustrative checkpoints of a model pretrained on workshop notes. Validation next-token loss
// keeps falling (perplexity = e^loss, COMPUTED); accuracy on a held-out set of 200 checkable
// part-number questions stalls. Different measurements of different things.
export const ckpts = [
  { step: 1, loss: 3.9, acc: 0.21 },
  { step: 2, loss: 3.1, acc: 0.38 },
  { step: 4, loss: 2.6, acc: 0.47 },
  { step: 8, loss: 2.3, acc: 0.5 },
  { step: 16, loss: 2.1, acc: 0.51 },
  { step: 32, loss: 1.95, acc: 0.51 },
]
const pts = (f: (c: (typeof ckpts)[number]) => number): PlotPoint[] => ckpts.map((c) => [Math.log2(c.step), f(c)])

export const reliability: Scene = {
  id: 'reliability',
  title: 'Pretraining loss versus task reliability',
  flow: 'TB',
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'Validation loss falls; held-out fact accuracy stalls',
      sub: 'loss: validation next-token · accuracy: 200 checkable questions',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'log₂ training steps (thousands)' },
        y: { min: 0, max: 4, step: 1, label: 'loss  ·  accuracy × 4' },
        axes: 'corner',
        series: [
          { kind: 'line', points: pts((c) => c.loss), color: 'service', label: 'validation loss', labelAt: [0.3, 3.3] },
          { kind: 'scatter', points: pts((c) => c.loss), color: 'service' },
          { kind: 'line', points: pts((c) => c.acc * 4), color: 'warn', label: 'fact accuracy × 4', labelAt: [3.3, 2.35] },
          { kind: 'scatter', points: pts((c) => c.acc * 4), color: 'warn' },
        ],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Validation evidence per checkpoint',
      headers: ['steps (k)', 'val loss', 'perplexity', 'fact accuracy'],
      values: ckpts.map((c) => [String(c.step), c.loss.toFixed(2), Math.exp(c.loss).toFixed(1), `${Math.round(c.acc * 100)}%`]),
    },
  ],
  edges: [{ source: 'curves', target: 'table', label: 'the numbers' }],
}
