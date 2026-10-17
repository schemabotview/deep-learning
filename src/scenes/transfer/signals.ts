import type { Scene } from '@graphlearning/flow'
import { sims, tau, infoNCE } from './numbers'

// §5 — three self-supervised training signals, and one contrastive (InfoNCE) loss COMPUTED for a
// single anchor with temperature 0.1.
const r = infoNCE(sims.pos, sims.negs)
const one = (s: number) => Math.exp(s / tau)

export const signals: Scene = {
  id: 'signals',
  title: 'Masked, predictive and contrastive signals',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Labels made from the data itself',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'k-mask', label: 'Masked', sub: 'rebuild hidden patches', pattern: 'service', icon: 'scissors' },
        { id: 'k-pred', label: 'Predictive', sub: 'next sensor window', pattern: 'network', icon: 'clock' },
        { id: 'k-con', label: 'Contrastive', sub: 'two views agree', pattern: 'external', icon: 'copy' },
      ],
    },
    {
      id: 'nce',
      kind: 'table',
      label: `InfoNCE for one anchor, τ = ${tau}: loss = −ln ${r.p.toFixed(3)} = ${r.loss.toFixed(3)}`,
      headers: ['candidate', 'cosine sim', 'exp(sim / τ)', 'share'],
      values: [
        ['positive: other view, same image', sims.pos.toFixed(1), one(sims.pos).toFixed(0), r.p.toFixed(3)],
        ...sims.negs.map((s, i) => [i === 0 ? 'negative 1: a similar dent' : `negative ${i + 1}: another image`, s.toFixed(1), one(s).toFixed(1), (one(s) / (one(sims.pos) + sims.negs.reduce((a, v) => a + one(v), 0))).toFixed(3)]),
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'info_nce.py',
      label: `z1, z2 = F.normalize(enc(view1(x)), dim=1), F.normalize(enc(view2(x)), dim=1)
logits = z1 @ z2.T / 0.1                 # [N, N]: row i's positive is column i
loss = F.cross_entropy(logits, torch.arange(len(x)))
# negatives = the other N − 1 images; methods with a predictor + stop-gradient need none`,
    },
  ],
  edges: [
    { source: 'kinds', target: 'nce', label: 'contrastive, traced' },
    { source: 'nce', target: 'code', label: 'the batch form' },
  ],
}
