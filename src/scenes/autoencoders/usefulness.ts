import type { Scene, PlotPoint } from '@graphlearning/flow'
import { pixels, scratchPx, scratchShare, missedCost } from './numbers'

// §4 — reconstruction quality and downstream usefulness, on defect images (64×64 grey). Illustrative
// validation curves; the scratch arithmetic is COMPUTED.
const widths = [8, 16, 32, 64, 128, 256, 512]
const mse = [0.041, 0.029, 0.018, 0.011, 0.006, 0.003, 0.001]
const probe = [0.62, 0.68, 0.71, 0.72, 0.69, 0.64, 0.58]
const at = (ys: number[]): PlotPoint[] => widths.map((w, i) => [Math.log2(w), ys[i]])

export const usefulness: Scene = {
  id: 'usefulness',
  title: 'Latent codes versus usefulness',
  flow: 'TB',
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'Bottleneck width: reconstruction keeps improving, the probe does not',
      sub: 'validation · illustrative · MSE × 10 to share the axis',
      plot: {
        x: { min: 3, max: 9, step: 1, label: 'log₂ bottleneck width' },
        y: { min: 0, max: 0.8, step: 0.2, label: 'probe macro-F1  ·  MSE × 10' },
        axes: 'corner',
        series: [
          { kind: 'line', points: at(probe), color: 'service', label: 'probe macro-F1 on z', labelAt: [3.3, 0.76] },
          { kind: 'scatter', points: at(probe), color: 'service', size: 6 },
          { kind: 'line', points: at(mse.map((m) => m * 10)), color: 'warn', label: 'reconstruction MSE × 10', labelAt: [3.3, 0.3] },
          { kind: 'scatter', points: at(mse.map((m) => m * 10)), color: 'warn', size: 6 },
        ],
      },
    },
    {
      id: 'scratch',
      kind: 'table',
      label: 'Why pixel MSE barely notices a scratch',
      headers: ['quantity', 'value'],
      values: [
        ['image pixels', `64 × 64 = ${pixels.toLocaleString('en-GB')}`],
        ['scratch pixels', `2 × 30 = ${scratchPx}`],
        ['share of the image', `${(scratchShare * 100).toFixed(2)}%`],
        ['MSE if the scratch is missed (error 0.5)', missedCost.toFixed(4)],
      ],
    },
  ],
  edges: [{ source: 'curves', target: 'scratch', label: 'one reason' }],
}
