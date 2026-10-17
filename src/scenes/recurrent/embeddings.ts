import type { Scene } from '@graphlearning/flow'

// A tiny vocabulary for the inspectors' text fragments and a 4-dimensional embedding table
// (illustrative values). Embedding a fragment is a ROW LOOKUP — computed below.
const vocab = ['PAD', 'UNK', 'scratch', 'dent', 'on', 'lid', 'edge']
const E = [
  [0, 0, 0, 0],
  [0.1, -0.1, 0.0, 0.2],
  [0.9, 0.1, -0.4, 0.3],
  [0.8, -0.6, 0.2, 0.1],
  [-0.2, 0.5, 0.1, -0.3],
  [0.3, 0.2, 0.7, -0.1],
  [0.2, 0.1, 0.6, 0.4],
]
const fragment = ['scratch', 'on', 'lid', 'hinge']
const ids = fragment.map((w) => (vocab.includes(w) ? vocab.indexOf(w) : 1))

// §1 — tokens to ids to vectors, and the continuous sequence beside it.
export const embeddings: Scene = {
  id: 'embeddings',
  title: 'Tokens become vectors',
  flow: 'TB',
  nodes: [
    {
      id: 'lookup',
      kind: 'table',
      label: '"scratch on lid hinge" → ids → embedding rows',
      headers: ['token', 'id', 'vector (d = 4)'],
      values: fragment.map((w, i) => [w, `${ids[i]}${ids[i] === 1 ? ' (UNK)' : ''}`, E[ids[i]].map((v) => v.toFixed(1)).join(', ')]),
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'embed.py',
      label: `emb = nn.Embedding(num_embeddings=7, embedding_dim=4, padding_idx=0)
tokens = torch.tensor([[2, 4, 5, 1]])      # [N=1, T=4]
vectors = emb(tokens)                       # [1, 4, 4]: one row per token
# sensor history needs no lookup: it is already [N, T=120, 4] floats`,
    },
    {
      id: 'kinds',
      label: 'Two kinds of sequence',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-tok', label: 'Tokens', sub: 'ids into a learned table', pattern: 'service', icon: 'tag' },
        { id: 'k-cont', label: 'Continuous', sub: 'sensor readings per step', pattern: 'network', icon: 'waves' },
        { id: 'k-unk', label: 'Unseen words', sub: 'map to UNK', pattern: 'warn', icon: 'search' },
        { id: 'k-vocab', label: 'Vocabulary', sub: 'built on training text', pattern: 'user', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'lookup', target: 'code' },
    { source: 'code', target: 'kinds' },
  ],
}
