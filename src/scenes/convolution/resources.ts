import type { Scene } from '@graphlearning/flow'
import { fmt, trace } from './cnn'

const t = trace()
const cnnParams = t.reduce((a, l) => a + l.params, 0)
const cnnMacs = t.reduce((a, l) => a + l.macs, 0)
const mlpParams = 12288 * 32 + 32 + 32 * 3 + 3
const mlpMacs = 12288 * 32 + 32 * 3
// A 1-D convolution over a sensor history: 4 sensor channels, kernel 5, 16 filters, length 120.
const c1d = 4 * 16 * 5 + 16
const len1d = 120 - 5 + 1

// §8 — parameters are not compute: the CNN is smaller but does far more arithmetic. And 1-D conv.
export const resources: Scene = {
  id: 'resources',
  title: 'Parameters are not compute',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Per image · computed from the layer sizes',
      headers: ['model', 'parameters', 'multiply-adds', 'validation macro-F1'],
      values: [
        ['MLP', fmt(mlpParams), fmt(mlpMacs), '0.69'],
        ['small CNN', fmt(cnnParams), fmt(cnnMacs), '0.86'],
      ],
    },
    {
      id: 'per-layer',
      kind: 'table',
      label: 'Where the CNN’s arithmetic goes',
      headers: ['layer', 'output', 'multiply-adds'],
      values: t.filter((l) => l.macs > 0).map((l) => [l.name, l.shape, fmt(l.macs)]),
    },
    {
      id: 'conv1d',
      kind: 'code',
      filename: 'sensor_conv.py',
      label: `# sensor history: [N, 4 sensors, 120 time steps]
conv = nn.Conv1d(4, 16, kernel_size=5)   # ${fmt(c1d)} parameters
out = conv(x)                            # [N, 16, ${len1d}]
# same idea along time: local, shared, translation-equivariant`,
    },
  ],
  edges: [
    { source: 'compare', target: 'per-layer' },
    { source: 'per-layer', target: 'conv1d', label: 'and along time' },
  ],
}
