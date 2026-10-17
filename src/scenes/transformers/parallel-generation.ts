import type { Scene } from '@graphlearning/flow'

// §6 — the same decoder trained in one pass over all positions, but generating one token per pass.
export const parallelGeneration: Scene = {
  id: 'parallel-generation',
  title: 'Parallel training, sequential generation',
  flow: 'TB',
  nodes: [
    {
      id: 'modes',
      label: 'One causal decoder, two ways to run it',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'train',
          label: 'Training · one pass',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 't-in', label: 'Whole true note', sub: '<bos> scratch on lid', pattern: 'storage', icon: 'tag' },
            { id: 't-fwd', label: 'One forward', sub: 'causal mask, T = 4', pattern: 'network', icon: 'layers' },
            { id: 't-loss', label: '4 losses at once', sub: 'every position', pattern: 'service', icon: 'sigma' },
          ],
          edges: [{ source: 't-in', target: 't-fwd' }, { source: 't-fwd', target: 't-loss' }],
        },
        {
          id: 'gen',
          label: 'Generation · one pass per token',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'g-in', label: 'Prompt so far', sub: 'own outputs fed back', pattern: 'storage', icon: 'tag' },
            { id: 'g-fwd', label: 'Forward, again', sub: 'once per new token', pattern: 'network', icon: 'repeat' },
            { id: 'g-pick', label: 'Pick a token', sub: 'append, repeat', pattern: 'service', icon: 'pencil' },
          ],
          edges: [{ source: 'g-in', target: 'g-fwd' }, { source: 'g-fwd', target: 'g-pick' }],
        },
      ],
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Producing a 4-token note',
      headers: ['', 'training', 'generation'],
      values: [
        ['forward passes', '1', '4'],
        ['inputs come from', 'the true note', 'the model\'s own choices'],
        ['parallel over', 'batch and positions', 'batch only'],
        ['an early mistake', 'cannot propagate', 'conditions every later token'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'generate.py',
      label: `ids = prompt                                  # [1, t]
for _ in range(max_new):
    logits = model(ids)[:, -1]                # only the last position is used
    nxt = logits.argmax(-1, keepdim=True)     # greedy, for now
    ids = torch.cat([ids, nxt], dim=1)
    if nxt.item() == EOS: break`,
    },
  ],
  edges: [
    { source: 'modes', target: 'compare' },
    { source: 'compare', target: 'code', label: 'the loop' },
  ],
}
