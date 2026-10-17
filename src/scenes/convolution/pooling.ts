import type { Scene } from '@graphlearning/flow'

// 2×2 max-pooling with stride 2 on a 4×4 feature map, then the same map shifted right by ONE pixel.
// Both outputs are COMPUTED: pooling is only invariant to shifts that stay inside a pooling window.
const a = [
  [0, 0, 0, 0],
  [0, 8, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 3],
]
const shifted = a.map((r) => [0, ...r.slice(0, 3)])
const pool = (m: number[][]) => [0, 2].map((i) => [0, 2].map((j) => Math.max(m[i][j], m[i][j + 1], m[i + 1][j], m[i + 1][j + 1])))
const pa = pool(a)
const ps = pool(shifted)
const rows = (m: number[][]) => m.map((r) => r.join('  ')).join('  /  ')

// §4 — pooling's partial invariance, computed.
export const pooling: Scene = {
  id: 'pooling',
  title: 'Pooling, and the limits of invariance',
  flow: 'TB',
  nodes: [
    {
      id: 'maps',
      kind: 'table',
      label: 'Feature map, and the same map shifted 1 pixel right',
      headers: ['row', 'original', 'shifted'],
      values: a.map((r, i) => [String(i), r.join('  '), shifted[i].join('  ')]),
    },
    {
      id: 'pooled',
      kind: 'table',
      label: 'MaxPool 2×2, stride 2',
      headers: ['input', 'pooled (2×2)', 'same as original?'],
      values: [
        ['original', rows(pa), '—'],
        ['shifted 1 px', rows(ps), JSON.stringify(pa) === JSON.stringify(ps) ? 'yes' : 'no: the 3 left its window'],
      ],
    },
    {
      id: 'limits',
      label: 'What pooling does and does not give',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-down', label: 'Downsamples', sub: 'halves height and width', pattern: 'service', icon: 'boxes' },
        { id: 'l-small', label: 'Small shifts', sub: 'inside a window only', pattern: 'network', icon: 'ruler' },
        { id: 'l-border', label: 'Borders, strides', sub: 'break invariance', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'maps', target: 'pooled' },
    { source: 'pooled', target: 'limits' },
  ],
}
