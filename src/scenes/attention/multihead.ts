import type { Scene } from '@graphlearning/flow'
import { Q, K, V, weights, outputs, fmt } from './attn'
import { softmax } from '../points'

// §5 — multi-head shapes, and why position must be added: without it, self-attention is permutation
// equivariant. Reorder the note's three real tokens and each token's output is unchanged. COMPUTED.
const perm = [2, 1, 0] // "lid on dent"
const dot = (a: number[], b: number[]) => a.reduce((s, v, i) => s + v * b[i], 0)
const Qp = perm.map((p) => Q[p]), Kp = perm.map((p) => K[p]), Vp = perm.map((p) => V[p])
const permOut = Qp.map((q) => {
  const w = softmax(Kp.map((k) => dot(q, k) / 2))
  return [0, 1].map((c) => w.reduce((s, a, j) => s + a * Vp[j][c], 0))
})
const orig = outputs(weights(false))
const vec = (v: number[]) => `[${v.map((x) => fmt(x, 3)).join(', ')}]`

export const multihead: Scene = {
  id: 'multihead',
  title: 'Heads, shapes and position',
  flow: 'TB',
  nodes: [
    {
      id: 'shapes',
      kind: 'table',
      label: 'd_model = 64 split into 8 heads of 8',
      headers: ['step', 'shape'],
      values: [
        ['project q (also k, v)', '[N, T, 64]'],
        ['view as heads', '[N, T, 8, 8]'],
        ['transpose', '[N, 8, T, 8]'],
        ['scores per head', '[N, 8, T, T]'],
        ['weights @ v', '[N, 8, T, 8]'],
        ['concat, then W_o', '[N, T, 64]'],
      ],
    },
    {
      id: 'perm',
      kind: 'table',
      label: 'Reordered note, no position information',
      headers: ['token', 'in "dent on lid"', 'in "lid on dent"'],
      values: ['dent', 'on', 'lid'].map((t, i) => [t, vec(orig[i]), vec(permOut[perm.indexOf(i)])]),
    },
    {
      id: 'pos',
      label: 'Giving attention an order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-abs', label: 'Absolute', sub: 'add a vector per index', pattern: 'service', icon: 'hash' },
        { id: 'p-rel', label: 'Relative', sub: 'bias by distance i − j', pattern: 'service', icon: 'ruler' },
        { id: 'p-rot', label: 'Rotary', sub: 'rotate q, k by index', pattern: 'service', icon: 'repeat' },
        { id: 'p-none', label: 'None', sub: 'a set, not a sequence', pattern: 'warn', icon: 'boxes' },
      ],
    },
  ],
  edges: [
    { source: 'shapes', target: 'perm', label: 'same ops, any order' },
    { source: 'perm', target: 'pos', label: 'so add position' },
  ],
}
