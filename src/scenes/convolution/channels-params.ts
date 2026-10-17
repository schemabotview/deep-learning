import type { Scene } from '@graphlearning/flow'
import { fmt, trace } from './cnn'

const t = trace()
const total = t.reduce((a, l) => a + l.params, 0)

// §2 — the small CNN layer by layer: output shapes and parameter counts, against the MLP.
export const channelsParams: Scene = {
  id: 'channels-params',
  title: 'Channels, filters, parameters',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'small_cnn.py',
      label: `model = nn.Sequential(
    nn.Conv2d(3, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(),
    nn.AdaptiveAvgPool2d(1), nn.Flatten(),      # global average pool
    nn.Linear(64, 3),
)`,
    },
    {
      id: 'layers',
      kind: 'table',
      label: 'Small defect CNN · input [N, 3, 64, 64]',
      headers: ['layer', 'filter', 'output shape', 'parameters'],
      values: [
        ...t.map((l) => [
          l.name,
          l.kind === 'conv' ? `${l.cout} × ${l.cin}×${l.k}×${l.k}` : l.kind === 'pool' ? `max ${l.k}×${l.k}` : l.kind === 'gap' ? 'average all' : `${l.cin} → ${l.cout}`,
          l.shape,
          fmt(l.params),
        ]),
        ['total', '', '', fmt(total)],
      ],
    },
    {
      id: 'rule',
      label: 'Counting a conv layer',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-w', label: 'Weights', sub: 'out × in × k × k', pattern: 'service', icon: 'hash' },
        { id: 'r-b', label: 'Biases', sub: 'one per filter', pattern: 'network', icon: 'sigma' },
        { id: 'r-mlp', label: 'MLP first layer', sub: '393,248 parameters', pattern: 'warn', icon: 'layers' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'layers', label: 'layer by layer' },
    { source: 'layers', target: 'rule' },
  ],
}
