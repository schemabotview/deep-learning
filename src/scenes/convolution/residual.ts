import type { Scene } from '@graphlearning/flow'

// A residual block that halves resolution and doubles channels: [N, 16, 32, 32] → [N, 32, 16, 16].
// The skip path cannot be the identity, so it needs a 1×1 conv with stride 2 — parameters COMPUTED.
const cin = 16, cout = 32
const conv3 = (i: number, o: number) => i * o * 9
const bn = (c: number) => 2 * c
const main = conv3(cin, cout) + bn(cout) + conv3(cout, cout) + bn(cout)
const proj = cin * cout + bn(cout)

// §5 — the residual block and its projection shortcut.
export const residual: Scene = {
  id: 'residual',
  title: 'Add the input back',
  flow: 'TB',
  nodes: [
    {
      id: 'block',
      label: 'Residual block · output = relu(F(x) + P(x))',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'mainpath',
          label: 'Main path F(x)',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'm1', label: 'conv 3×3, stride 2', sub: '16 → 32 channels', pattern: 'service', icon: 'boxes' },
            { id: 'm2', label: 'BN, ReLU', sub: 'normalise, activate', pattern: 'network', icon: 'zap' },
            { id: 'm3', label: 'conv 3×3, BN', sub: '32 → 32 channels', pattern: 'service', icon: 'boxes' },
          ],
        },
        {
          id: 'skip',
          label: 'Shortcut P(x)',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 's1', label: 'identity?', sub: 'shapes differ: no', pattern: 'warn', icon: 'ban' },
            { id: 's2', label: 'conv 1×1, stride 2', sub: 'projection 16 → 32', pattern: 'user', icon: 'swap' },
            { id: 's3', label: 'BN', sub: 'matches the main path', pattern: 'network', icon: 'scale' },
          ],
        },
      ],
    },
    {
      id: 'counts',
      kind: 'table',
      label: 'Shapes and parameters (convs without bias)',
      headers: ['part', 'output', 'parameters'],
      values: [
        ['input x', '[N, 16, 32, 32]', '—'],
        ['main path F(x)', '[N, 32, 16, 16]', main.toLocaleString('en-GB')],
        ['projection P(x)', '[N, 32, 16, 16]', proj.toLocaleString('en-GB')],
        ['sum, then ReLU', '[N, 32, 16, 16]', '0'],
      ],
    },
  ],
  edges: [{ source: 'block', target: 'counts' }],
}
