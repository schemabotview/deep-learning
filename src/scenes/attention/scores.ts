import type { Scene, PlotPoint } from '@graphlearning/flow'
import { maxWeight } from './attn'

// §2 — why the dot product is divided by √d_k: unscaled, the largest of 8 softmax weights climbs
// towards 1 as width grows (the softmax saturates); scaled, it stays put. COMPUTED over 200 draws.
const ds = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
const curve = (scaled: boolean): PlotPoint[] => ds.map((d) => [Math.log2(d), maxWeight(d, scaled)])
export const sat = { raw64: maxWeight(64, false), scaled64: maxWeight(64, true), raw512: maxWeight(512, false) }

export const scoresScene: Scene = {
  id: 'attn-scores',
  title: 'Additive and scaled dot-product scores',
  flow: 'TB',
  nodes: [
    {
      id: 'saturation',
      kind: 'plot',
      label: 'Mean largest weight over 8 keys, random q and k',
      sub: 'uniform attention would give 1/8 = 0.125',
      plot: {
        x: { min: 0, max: 9, step: 1, label: 'log₂ d_k' },
        y: { min: 0, max: 1, step: 0.25, label: 'max weight' },
        axes: 'corner',
        series: [
          { kind: 'line', points: curve(false), color: 'warn', label: `q·k: ${sat.raw64.toFixed(2)} at d = 64`, labelAt: [3.4, 0.93] },
          { kind: 'line', points: curve(true), color: 'service', label: `q·k / √d: ${sat.scaled64.toFixed(2)} at d = 64`, labelAt: [4.2, 0.24] },
          { kind: 'segment', from: [0, 0.125], to: [9, 0.125], color: '#4b5563', dashed: true },
        ],
      },
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Two scoring functions',
      headers: ['', 'additive', 'scaled dot-product'],
      values: [
        ['score', 'vᵀ tanh(W₁q + W₂k)', 'q·k / √d_k'],
        ['parameters', 'W₁, W₂, v', 'none beyond the projections'],
        ['q, k widths', 'may differ', 'must match'],
        ['on hardware', 'a small network per pair', 'one matrix multiply'],
      ],
    },
  ],
  edges: [{ source: 'saturation', target: 'compare', label: 'choose' }],
}
