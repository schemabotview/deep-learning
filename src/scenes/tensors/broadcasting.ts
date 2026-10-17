import type { Scene } from '@graphlearning/flow'

// Two silent shape bugs, COMPUTED on tiny tensors.
// (1) pred has shape [3, 1], target [3]: pred − target broadcasts to [3, 3], every prediction against
//     every target. True MSE is 0; the broadcast "MSE" is the mean of (i − j)² = 12 / 9 = 1.33.
const pred = [1, 2, 3]
const target = [1, 2, 3]
const pair = pred.map((p) => target.map((t) => (p - t) ** 2))
const wrong = pair.flat().reduce((a, b) => a + b, 0) / 9
const right = pred.reduce((a, p, i) => a + (p - target[i]) ** 2, 0) / 3
// (2) A [C=2, H=2, W=2] image moved to channels-last. permute(1, 2, 0) keeps each pixel's channels
//     together; reshape(2, 2, 2) reinterprets memory order and mixes pixels.
const img = [
  [[1, 2], [3, 4]],
  [[10, 20], [30, 40]],
]
const flat = img.flat(2)
const permuted = (hh: number, ww: number) => `[${img[0][hh][ww]}, ${img[1][hh][ww]}]`
const reshaped = (hh: number, ww: number) => `[${flat[(hh * 2 + ww) * 2]}, ${flat[(hh * 2 + ww) * 2 + 1]}]`

// §4 — the broadcast loss bug, and permute versus reshape.
export const broadcasting: Scene = {
  id: 'broadcasting',
  title: 'Shapes that run but lie',
  flow: 'TB',
  nodes: [
    {
      id: 'pairwise',
      kind: 'table',
      label: `(pred[3,1] − target[3])² broadcasts to [3, 3]`,
      headers: ['', 'target 1', 'target 2', 'target 3'],
      values: [
        ...pair.map((row, i) => [`pred ${pred[i]}`, ...row.map(String)]),
        ['mean', `${wrong.toFixed(2)} — wrong`, `true MSE ${right.toFixed(2)}`, ''],
      ],
    },
    {
      id: 'layout',
      kind: 'table',
      label: '[C, H, W] → [H, W, C]: each pixel’s channels',
      headers: ['pixel (h, w)', 'permute(1, 2, 0)', 'reshape(2, 2, 2)'],
      values: [[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b]) => [`(${a}, ${b})`, permuted(a, b), reshaped(a, b)]),
    },
    {
      id: 'fixes',
      kind: 'code',
      filename: 'fixes.py',
      label: `loss = F.mse_loss(pred.squeeze(-1), target)   # shapes [3] and [3]
assert pred.squeeze(-1).shape == target.shape
x_hwc = x_chw.permute(1, 2, 0)                   # move axes; never reshape`,
    },
  ],
  edges: [
    { source: 'pairwise', target: 'layout', label: 'and a second bug' },
    { source: 'layout', target: 'fixes' },
  ],
}
