import type { Scene } from '@graphlearning/flow'

// Three text fragments padded to one length with PAD id 0, and the mask that marks real tokens.
const rows = [
  ['scratch', 'on', 'lid'],
  ['dent', 'near', 'left', 'hinge', 'edge'],
  ['ok'],
]
const len = Math.max(...rows.map((r) => r.length))
const padded = rows.map((r) => [...r, ...Array(len - r.length).fill('PAD')])

// §5 — padding variable-length input into a rectangular batch, and the contract a batch must meet.
export const batching: Scene = {
  id: 'batching',
  title: 'Rectangular batches from ragged data',
  flow: 'TB',
  nodes: [
    {
      id: 'padded',
      kind: 'table',
      label: `Text fragments padded to [${rows.length}, ${len}] · PAD id 0`,
      headers: ['row', ...Array.from({ length: len }, (_, i) => `t${i}`), 'mask'],
      values: padded.map((r, i) => [String(i), ...r, rows[i].map(() => '1').concat(Array(len - rows[i].length).fill('0')).join('')]),
    },
    {
      id: 'contract',
      label: 'The batch contract',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'shape', label: 'Shape', sub: 'images resized to 64×64', pattern: 'service', icon: 'ruler' },
        { id: 'range', label: 'Value range', sub: 'pixels scaled 0–1', pattern: 'service', icon: 'scale' },
        { id: 'dtype', label: 'Dtype', sub: 'float32 in, int64 labels', pattern: 'service', icon: 'hash' },
        { id: 'pad', label: 'Padding', sub: 'pad id + mask, always', pattern: 'network', icon: 'boxes' },
        { id: 'labels', label: 'Label map', sub: 'ok 0, scratch 1, dent 2', pattern: 'network', icon: 'tag' },
        { id: 'stats', label: 'Statistics', sub: 'mean, std from train', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'padded', target: 'contract', label: 'every batch must meet' }],
}
