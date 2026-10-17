import type { Scene } from '@graphlearning/flow'

// §3 — three ways to arrange transformer blocks, each matched to one workshop task.
export const patterns: Scene = {
  id: 'patterns',
  title: 'Encoder, decoder, encoder–decoder',
  flow: 'TB',
  nodes: [
    {
      id: 'arch',
      label: 'Three arrangements of the same block',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'enc',
          label: 'Encoder only',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'e-in', label: 'Finished note', sub: 'all tokens visible', pattern: 'storage', icon: 'tag' },
            { id: 'e-blk', label: 'Encoder blocks', sub: 'bidirectional', pattern: 'network', icon: 'layers' },
            { id: 'e-out', label: 'Defect class', sub: 'ok / scratch / dent', pattern: 'service', icon: 'circlecheck' },
          ],
          edges: [{ source: 'e-in', target: 'e-blk' }, { source: 'e-blk', target: 'e-out' }],
        },
        {
          id: 'dec',
          label: 'Decoder only',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'd-in', label: 'Note so far', sub: 'tokens 1 … t', pattern: 'storage', icon: 'tag' },
            { id: 'd-blk', label: 'Decoder blocks', sub: 'causal', pattern: 'network', icon: 'layers' },
            { id: 'd-out', label: 'Next token', sub: 'token t + 1', pattern: 'service', icon: 'pencil' },
          ],
          edges: [{ source: 'd-in', target: 'd-blk' }, { source: 'd-blk', target: 'd-out' }],
        },
        {
          id: 'encdec',
          label: 'Encoder–decoder',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'ed-in', label: 'Sensor history', sub: '[N, 120, 4]', pattern: 'storage', icon: 'waves' },
            { id: 'ed-blk', label: 'Enc → cross → dec', sub: 'causal decoder', pattern: 'network', icon: 'layers' },
            { id: 'ed-out', label: 'Fault summary', sub: 'generated text', pattern: 'service', icon: 'pencil' },
          ],
          edges: [{ source: 'ed-in', target: 'ed-blk' }, { source: 'ed-blk', target: 'ed-out' }],
        },
      ],
    },
    {
      id: 'choose',
      kind: 'table',
      label: 'Matching the arrangement to the task',
      headers: ['arrangement', 'attention inside', 'fits when'],
      values: [
        ['encoder only', 'bidirectional self', 'the whole input exists; output is a label or tag'],
        ['decoder only', 'causal self', 'output is a sequence continued token by token'],
        ['encoder–decoder', 'bidirectional + causal + cross', 'one sequence is mapped to a different one'],
      ],
    },
  ],
  edges: [{ source: 'arch', target: 'choose', label: 'choose by task' }],
}
