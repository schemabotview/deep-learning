import type { Scene } from '@graphlearning/flow'

// §5 — two objectives on the note "scratch on lid edge". The loss is cross-entropy at the positions
// that carry a target; the probabilities are illustrative, the losses COMPUTED as −ln p.
const ce = (p: number) => -Math.log(p)
export const nextTok = [
  { input: '<bos>', target: 'scratch', p: 0.3 },
  { input: 'scratch', target: 'on', p: 0.6 },
  { input: 'on', target: 'lid', p: 0.4 },
  { input: 'lid', target: 'edge', p: 0.5 },
]
export const nextMean = nextTok.reduce((a, r) => a + ce(r.p), 0) / nextTok.length
export const masked = { input: 'scratch [MASK] lid edge', target: 'on', p: 0.7 }

export const objectives: Scene = {
  id: 'objectives',
  title: 'Masked and next-token objectives',
  flow: 'TB',
  nodes: [
    {
      id: 'next',
      kind: 'table',
      label: `Next-token · causal mask · loss at every position, mean ${nextMean.toFixed(3)}`,
      headers: ['position', 'sees', 'target', 'p(target)', '−ln p'],
      values: nextTok.map((r, i) => [String(i + 1), i === 0 ? '<bos>' : `<bos> … ${r.input}`, r.target, r.p.toFixed(2), ce(r.p).toFixed(3)]),
    },
    {
      id: 'mlm',
      kind: 'table',
      label: 'Masked-token · bidirectional · loss only where masked',
      headers: ['input', 'target', 'p(target)', '−ln p', 'other positions'],
      values: [[masked.input, `${masked.target} (pos 2)`, masked.p.toFixed(2), ce(masked.p).toFixed(3), 'no loss']],
    },
    {
      id: 'separate',
      label: 'Mask and objective are separate choices',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-mask', label: 'Mask', sub: 'who may see whom', pattern: 'network', icon: 'lock' },
        { id: 's-obj', label: 'Objective', sub: 'which positions score', pattern: 'service', icon: 'circlecheck' },
        { id: 's-leak', label: 'Mismatch leaks', sub: 'next-token, no causal', pattern: 'warn', icon: 'bug' },
        { id: 's-shift', label: 'Shift by one', sub: 'targets = inputs[1:]', pattern: 'service', icon: 'swap' },
      ],
    },
  ],
  edges: [
    { source: 'next', target: 'mlm', label: 'or' },
    { source: 'mlm', target: 'separate' },
  ],
}
