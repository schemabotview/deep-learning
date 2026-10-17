import type { Scene, PlotPoint } from '@graphlearning/flow'

// §7 — the KV cache. Without it, step t recomputes keys and values for all t tokens; with it, only
// the new token's. The cache itself grows with context: 2 (k, v) × layers × T × d_model values.
// A 6-layer, d_model = 512 decoder in fp16 (2 bytes). COMPUTED.
export const L = 6, dm = 512, bytes = 2
export const kvMB = (T: number, batch = 1) => (2 * L * T * dm * bytes * batch) / 1e6
export const perTokenKB = (2 * L * dm * bytes) / 1e3
// k/v projections computed while generating T tokens: no cache Σt = T(T+1)/2, cache T.
export const projNoCache = (T: number) => (T * (T + 1)) / 2
const Ts = Array.from({ length: 33 }, (_, i) => i * 128)
const line = (f: (T: number) => number): PlotPoint[] => Ts.map((T) => [T / 1024, f(T)])

export const caching: Scene = {
  id: 'caching',
  title: 'Caching, decoding and context cost',
  flow: 'TB',
  nodes: [
    {
      id: 'cache',
      kind: 'plot',
      label: 'KV cache, 6 layers, d_model = 512, fp16',
      sub: `${perTokenKB.toFixed(1)} KB per token per sequence`,
      plot: {
        x: { min: 0, max: 4, step: 1, label: 'context length T (thousands)' },
        y: { min: 0, max: 1800, step: 400, label: 'MB' },
        axes: 'corner',
        series: [
          { kind: 'line', points: line((T) => kvMB(T, 32)), color: 'warn', label: `batch 32: ${kvMB(4096, 32).toFixed(0)} MB at 4096`, labelAt: [1.3, 1500] },
          { kind: 'line', points: line((T) => kvMB(T, 1)), color: 'service', label: `one sequence: ${kvMB(4096).toFixed(0)} MB`, labelAt: [2.6, 160] },
        ],
      },
    },
    {
      id: 'decode',
      kind: 'table',
      label: 'Choosing the next token from the logits',
      headers: ['rule', 'picks', 'trade-off'],
      values: [
        ['greedy', 'the highest-probability token', 'repetitive, deterministic'],
        ['temperature τ', 'sample softmax(z / τ)', 'τ < 1 sharper, τ > 1 flatter'],
        ['top-k / top-p', 'sample from the head only', 'cuts the unlikely tail'],
        ['beam search', 'the best few partial sequences', 'k× the compute, blander text'],
      ],
    },
  ],
  edges: [{ source: 'cache', target: 'decode', label: 'then decode' }],
}
