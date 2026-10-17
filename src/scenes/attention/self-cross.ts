import type { Scene } from '@graphlearning/flow'

// §4 — self-attention (q, k, v from one sequence) versus cross-attention (q from one, k and v from
// another): an inspector note attending over 49 image-patch features from the defect image.
export const selfCross: Scene = {
  id: 'self-cross',
  title: 'Self-attention and cross-attention',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Where queries, keys and values come from',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'self',
          label: 'Self-attention · one sequence',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 's-x', label: 'Note tokens', sub: '[N, 12, 64]', pattern: 'storage', icon: 'tag' },
            { id: 's-qkv', label: 'q, k, v all', sub: 'from the note', pattern: 'service', icon: 'copy' },
            { id: 's-w', label: 'Weights', sub: '[N, 12, 12]', pattern: 'network', icon: 'hash' },
          ],
          edges: [
            { source: 's-x', target: 's-qkv' },
            { source: 's-qkv', target: 's-w' },
          ],
        },
        {
          id: 'cross',
          label: 'Cross-attention · two sequences',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'c-x', label: 'Note queries', sub: '[N, 12, 64]', pattern: 'storage', icon: 'tag' },
            { id: 'c-kv', label: 'Image patches', sub: 'k, v: [N, 49, 64]', pattern: 'storage', icon: 'scanface' },
            { id: 'c-w', label: 'Weights', sub: '[N, 12, 49]', pattern: 'network', icon: 'hash' },
          ],
          edges: [
            { source: 'c-x', target: 'c-w', label: 'q' },
            { source: 'c-kv', target: 'c-w', label: 'k, v' },
          ],
        },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'self_cross.py',
      label: `mha = nn.MultiheadAttention(64, num_heads=8, batch_first=True)
out, w = mha(note, note, note, key_padding_mask=note_pad)   # self: [N, 12, 64]
out, w = mha(note, patches, patches)                        # cross: [N, 12, 64]
# w: [N, 12, 12] then [N, 12, 49] — averaged over heads by default`,
    },
  ],
  edges: [{ source: 'kinds', target: 'code', label: 'same module, different inputs' }],
}
