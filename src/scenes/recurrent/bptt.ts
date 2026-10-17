import type { Scene, PlotPoint } from '@graphlearning/flow'

// How strongly the last state depends on a state k steps earlier: |∂h_T/∂h_{T−k}| is a product of k
// local factors w·(1 − h²). With a typical factor of 0.7 it vanishes; at 1.1 it explodes. COMPUTED.
const ks = Array.from({ length: 31 }, (_, k) => k)
const decay = (f: number): PlotPoint[] => ks.map((k) => [k, Math.min(f ** k, 8)])
const at = (f: number, k: number) => f ** k

// §5 — backpropagation through time, vanishing and exploding, and truncation.
export const bptt: Scene = {
  id: 'bptt',
  title: 'Gradients through time',
  flow: 'TB',
  nodes: [
    {
      id: 'decay',
      kind: 'plot',
      label: '|∂h_T / ∂h_{T−k}| = product of k local factors',
      sub: 'factor w·(1 − h²) per step',
      plot: {
        x: { min: 0, max: 30, step: 5, label: 'steps back, k' },
        y: { min: 0, max: 8, step: 2, label: 'gradient factor' },
        axes: 'corner',
        series: [
          { kind: 'line', points: decay(0.7), color: 'service', label: `0.7: ${at(0.7, 20).toExponential(0)} at k = 20`, labelAt: [9, 0.6] },
          { kind: 'line', points: decay(1.1), color: 'warn', label: `1.1: ${at(1.1, 20).toFixed(1)} at k = 20`, labelAt: [15, 6.6] },
          { kind: 'segment', from: [0, 1], to: [30, 1], color: '#4b5563', dashed: true },
        ],
      },
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'tbptt.py',
      label: `h = torch.zeros(1, N, hidden)
for chunk in sensor.split(32, dim=1):      # 32 steps at a time
    out, h = rnn(chunk, h)
    loss = loss_fn(head(out), targets_for(chunk))
    loss.backward(); opt.step(); opt.zero_grad()
    h = h.detach()      # keep the state, cut the graph`,
    },
  ],
  edges: [{ source: 'decay', target: 'code', label: 'truncate' }],
}
