import type { Scene } from '@graphlearning/flow'
import { u, x, z, xhat, err, mse } from './numbers'

// §1 — encoder, bottleneck, decoder, and one reconstruction traced through a tied linear AE. COMPUTED.
const v = (a: number[]) => `[${a.map((t) => t.toFixed(3)).join(', ')}]`

export const recon: Scene = {
  id: 'recon',
  title: 'Encoder, bottleneck, decoder',
  flow: 'TB',
  nodes: [
    {
      id: 'shape',
      label: 'Sensor window autoencoder · input = target',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-enc', label: 'Encoder', sub: '480 → 64 → 16', pattern: 'network', icon: 'layers' },
        { id: 'a-z', label: 'Bottleneck z', sub: '16 numbers', pattern: 'warn', icon: 'scissors' },
        { id: 'a-dec', label: 'Decoder', sub: '16 → 64 → 480', pattern: 'network', icon: 'layers' },
      ],
    },
    {
      id: 'trace',
      kind: 'table',
      label: `Smallest case: 3 channel means → 1 number → 3, u = ${v(u).replace(/\.000|00(?=[,\]])/g, '')}`,
      headers: ['step', 'value'],
      values: [
        ['input x', v(x)],
        ['encode z = u·x', z.toFixed(3)],
        ['decode x̂ = z·u', v(xhat)],
        ['error x − x̂', v(err)],
        ['loss mean (x − x̂)²', mse.toFixed(4)],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'autoencoder.py',
      label: `enc = nn.Sequential(nn.Flatten(), nn.Linear(480, 64), nn.ReLU(), nn.Linear(64, 16))
dec = nn.Sequential(nn.Linear(16, 64), nn.ReLU(), nn.Linear(64, 480), nn.Unflatten(1, (120, 4)))
x_hat = dec(enc(window))                 # window: [N, 120, 4]
loss = F.mse_loss(x_hat, window)         # the input is its own target`,
    },
  ],
  edges: [
    { source: 'shape', target: 'trace', label: 'shrunk to 3 → 1 → 3' },
    { source: 'trace', target: 'code', label: 'full size' },
  ],
}
