import type { Scene, PlotPoint } from '@graphlearning/flow'

// §6 — the score tensor is [N, h, T, T]: memory grows with T², while the token activations grow with
// T. fp32, batch N = 32, h = 8 heads, d_model = 512, one layer. COMPUTED.
const N = 32, h = 8, d = 512, B = 4
export const scoreGB = (T: number) => (N * h * T * T * B) / 1e9
export const actGB = (T: number) => (N * T * d * B) / 1e9
const Ts = Array.from({ length: 33 }, (_, i) => i * 128)
const line = (f: (T: number) => number): PlotPoint[] => Ts.map((T) => [T / 1024, Math.min(f(T), 20)])

export const costLimits: Scene = {
  id: 'cost-limits',
  title: 'Pairwise cost and what weights do not show',
  flow: 'TB',
  nodes: [
    {
      id: 'memory',
      kind: 'plot',
      label: 'One layer, fp32, N = 32, 8 heads, d_model = 512',
      sub: 'scores: N·h·T² floats · activations: N·T·d floats',
      plot: {
        x: { min: 0, max: 4, step: 1, label: 'sequence length T (thousands)' },
        y: { min: 0, max: 20, step: 5, label: 'GB' },
        axes: 'corner',
        series: [
          { kind: 'line', points: line(scoreGB), color: 'warn', label: `scores: ${scoreGB(4096).toFixed(1)} GB at T = 4096`, labelAt: [1.2, 15] },
          { kind: 'line', points: line(actGB), color: 'service', label: `activations: ${actGB(4096).toFixed(2)} GB`, labelAt: [2.4, 2.2] },
        ],
      },
    },
    {
      id: 'limits',
      label: 'A high weight is not an explanation',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-val', label: 'Values matter', sub: 'a big weight on a tiny v', pattern: 'warn', icon: 'scale' },
        { id: 'l-heads', label: 'Many heads, layers', sub: 'mixed after W_o', pattern: 'warn', icon: 'layers' },
        { id: 'l-res', label: 'Residual path', sub: 'bypasses attention', pattern: 'warn', icon: 'share' },
        { id: 'l-test', label: 'Test by intervention', sub: 'remove, re-score', pattern: 'service', icon: 'scissors' },
      ],
    },
  ],
  edges: [{ source: 'memory', target: 'limits', label: 'and reading the weights' }],
}
