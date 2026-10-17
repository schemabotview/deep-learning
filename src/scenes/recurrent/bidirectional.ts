import type { Scene } from '@graphlearning/flow'

// §7 — bidirectionality as a visibility choice, and two ways recurrent state leaks.
export const bidirectional: Scene = {
  id: 'bidirectional',
  title: 'Looking both ways, and leaking state',
  flow: 'TB',
  nodes: [
    {
      id: 'when',
      kind: 'table',
      label: 'Is a bidirectional RNN allowed?',
      headers: ['task', 'bidirectional?', 'why'],
      values: [
        ['classify a finished note', 'yes', 'every word exists at prediction time'],
        ['forecast the next reading', 'no', 'the backward pass reads the future'],
        ['flag a fault as it happens', 'no', 'later readings arrive later'],
      ],
    },
    {
      id: 'leaks',
      label: 'State leaks',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-carry', label: 'Carried state', sub: 'machine A into machine B', pattern: 'warn', icon: 'link' },
        { id: 'l-reset', label: 'Reset per sequence', sub: 'or per machine stream', pattern: 'service', icon: 'repeat' },
        { id: 'l-pad', label: 'Padding steps', sub: 'update the state too', pattern: 'warn', icon: 'boxes' },
        { id: 'l-pack', label: 'Pack sequences', sub: 'pack_padded_sequence', pattern: 'network', icon: 'package' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'packed.py',
      label: `packed = pack_padded_sequence(x, lengths, batch_first=True, enforce_sorted=False)
out, h_n = lstm(packed)          # h_n: the state at each sequence's TRUE last step
out, _ = pad_packed_sequence(out, batch_first=True)`,
    },
  ],
  edges: [
    { source: 'when', target: 'leaks' },
    { source: 'leaks', target: 'code' },
  ],
}
