import type { Scene, PlotPoint } from '@graphlearning/flow'

// §2 — sinusoidal position encodings, d_model = 64: PE(p, 2i) = sin(p / 10000^(2i/64)). Low i turns
// fast, high i slowly, so each position gets a distinct pattern. COMPUTED.
const dm = 64
const pe = (p: number, i: number) => Math.sin(p / 10000 ** ((2 * i) / dm))
const curve = (i: number): PlotPoint[] => Array.from({ length: 121 }, (_, k) => [k * 0.25, pe(k * 0.25, i)])
export const period = (i: number) => 2 * Math.PI * 10000 ** ((2 * i) / dm)

export const positions: Scene = {
  id: 'positions',
  title: 'Position representations',
  flow: 'TB',
  nodes: [
    {
      id: 'sinusoid',
      kind: 'plot',
      label: 'Sinusoidal encoding, three of the 64 dimensions',
      sub: 'PE(p, 2i) = sin(p / 10000^(2i/64))',
      plot: {
        x: { min: 0, max: 30, step: 5, label: 'position p' },
        y: { min: -1.2, max: 1.2, step: 0.6, label: 'value' },
        axes: 'corner',
        series: [
          { kind: 'line', points: curve(0), color: 'warn', label: `i = 0: period ${period(0).toFixed(1)}`, labelAt: [1, 1.12] },
          { kind: 'line', points: curve(4), color: 'service', label: `i = 4: period ${period(4).toFixed(0)}`, labelAt: [17, 1.12] },
          { kind: 'line', points: curve(8), color: 'network', label: `i = 8: period ${period(8).toFixed(0)}`, labelAt: [21, 0.35] },
        ],
      },
    },
    {
      id: 'schemes',
      kind: 'table',
      label: 'Ways to break permutation symmetry',
      headers: ['scheme', 'enters as', 'beyond trained length'],
      values: [
        ['learned absolute', 'a trained vector per index', 'no vector exists'],
        ['sinusoidal', 'a fixed vector per index', 'defined, often weak'],
        ['relative bias', 'a score bias by i − j', 'clip or extrapolate'],
        ['rotary', 'rotate q, k by index', 'degrades unless rescaled'],
      ],
    },
  ],
  edges: [{ source: 'sinusoid', target: 'schemes', label: 'one of four' }],
}
