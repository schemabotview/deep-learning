import type { Scene } from '@graphlearning/flow'

// A 5×5 grey patch with a bright vertical scratch in column 2, and a 3×3 vertical-edge filter. The
// 3×3 output (no padding, stride 1) is COMPUTED as a cross-correlation — PyTorch's convention: the
// filter is NOT flipped. Each output = Σ input-window ⊙ filter.
const img = Array.from({ length: 5 }, () => [1, 1, 9, 1, 1])
const filt = [
  [-1, 0, 1],
  [-1, 0, 1],
  [-1, 0, 1],
]
const out = Array.from({ length: 3 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) => filt.reduce((a, row, u) => a + row.reduce((b, w, v) => b + w * img[i + u][j + v], 0), 0)),
)

// §1 — one filter, slid everywhere: locality and weight sharing in a single picture.
export const crossCorrelation: Scene = {
  id: 'cross-correlation',
  title: 'One filter, every position',
  flow: 'TB',
  nodes: [
    {
      id: 'input',
      kind: 'table',
      label: 'Input patch · scratch in column 2',
      headers: ['', 'c0', 'c1', 'c2', 'c3', 'c4'],
      values: img.map((r, i) => [`r${i}`, ...r.map(String)]),
    },
    {
      id: 'filter',
      kind: 'table',
      label: '3×3 vertical-edge filter',
      headers: ['', 'v0', 'v1', 'v2'],
      values: filt.map((r, i) => [`u${i}`, ...r.map(String)]),
    },
    {
      id: 'output',
      kind: 'table',
      label: 'Output · 3×3 response',
      headers: ['', 'c0', 'c1', 'c2'],
      values: out.map((r, i) => [`r${i}`, ...r.map(String)]),
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'edge.py',
      label: `x = torch.tensor(img, dtype=torch.float32).view(1, 1, 5, 5)   # [N, C, H, W]
w = torch.tensor(filt, dtype=torch.float32).view(1, 1, 3, 3)  # [out, in, k, k]
y = F.conv2d(x, w)              # [1, 1, 3, 3] — no padding, stride 1
# y[0, 0] == [[24, 0, -24]] * 3: cross-correlation, filter not flipped`,
    },
  ],
  edges: [
    { source: 'input', target: 'output', label: 'slide' },
    { source: 'filter', target: 'output', label: 'Σ window ⊙ filter' },
    { source: 'output', target: 'code', label: 'in PyTorch' },
  ],
}
