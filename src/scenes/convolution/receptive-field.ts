import type { Scene } from '@graphlearning/flow'
import { outSize, trace } from './cnn'

const t = trace().filter((l) => l.kind === 'conv' || l.kind === 'pool')
const cases: [string, number, number, number, number][] = [
  // label, H, k, s, p (dilation 1 unless noted)
  ['3×3, pad 1, stride 1', 64, 3, 1, 1],
  ['3×3, pad 0, stride 1', 64, 3, 1, 0],
  ['3×3, pad 1, stride 2', 64, 3, 2, 1],
  ['5×5, pad 2, stride 1', 64, 5, 1, 2],
]

// §3 — the output-size formula on four settings, and how far each unit of the small CNN "sees".
export const receptiveField: Scene = {
  id: 'receptive-field',
  title: 'Stride, padding and what each unit sees',
  flow: 'TB',
  nodes: [
    {
      id: 'formula',
      kind: 'table',
      label: 'out = ⌊(H + 2p − d(k − 1) − 1) / s⌋ + 1 · H = 64',
      headers: ['setting', 'output size'],
      values: [...cases.map(([n, h, k, s, p]) => [n, String(outSize(h, k, s, p))]), ['3×3, dilation 2, pad 2', String(outSize(64, 3, 1, 2, 2))]],
    },
    {
      id: 'rf',
      kind: 'table',
      label: 'Receptive field through the small CNN',
      headers: ['after', 'feature map', 'receptive field (pixels)'],
      values: t.map((l) => [l.name, `${l.h}×${l.h}`, `${l.rf}×${l.rf}`]),
    },
    {
      id: 'notes',
      label: 'Reading it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-grow', label: 'Grows', sub: 'with depth and stride', pattern: 'service', icon: 'layers' },
        { id: 'n-dent', label: 'Large dents', sub: 'need a large field', pattern: 'warn', icon: 'search' },
        { id: 'n-gap', label: 'Global pool', sub: 'then sees it all', pattern: 'network', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'formula', target: 'rf' },
    { source: 'rf', target: 'notes' },
  ],
}
