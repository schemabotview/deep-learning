import type { Scene } from '@graphlearning/flow'
import { blocks, inner, input, ckptMem } from './numbers'

// §4 — activation checkpointing on a 12-block stack: memory kept for backward against one extra
// forward pass. Per block: 0.40 GB of internals, 0.05 GB input. COMPUTED.
const row = (name: string, k: number, extra: string) => [name, k === 0 ? `12 × ${inner}` : `${blocks / k} × ${input} + ${k} × ${inner}`, `${ckptMem(k).toFixed(2)} GB`, extra]

export const checkpointing: Scene = {
  id: 'checkpointing',
  title: 'Checkpointing and recomputation',
  flow: 'TB',
  nodes: [
    {
      id: 'flow',
      label: 'Keep segment inputs, rebuild the rest in backward',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'f-fwd', label: 'Forward', sub: 'keep block inputs', pattern: 'network', icon: 'layers' },
        { id: 'f-drop', label: 'Drop internals', sub: 'attention, FFN', pattern: 'warn', icon: 'scissors' },
        { id: 'f-re', label: 'Backward', sub: 'recompute, then grad', pattern: 'service', icon: 'repeat' },
      ],
      edges: [
        { source: 'f-fwd', target: 'f-drop' },
        { source: 'f-drop', target: 'f-re' },
      ],
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Activation memory for backward, 12 blocks',
      headers: ['strategy', 'kept', 'memory', 'extra compute'],
      values: [
        row('store everything', 0, 'none'),
        row('checkpoint every block', 1, '+1 forward ≈ +33%'),
        row('every 2 blocks', 2, '+1 forward ≈ +33%'),
        row('every 4 blocks', 4, '+1 forward ≈ +33%'),
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'checkpoint.py',
      label: `from torch.utils.checkpoint import checkpoint
def forward(self, x):
    for blk in self.blocks:
        x = checkpoint(blk, x, use_reentrant=False)   # internals rebuilt during backward
    return self.head(x)
# dropout inside blk must give the same mask on recompute: RNG state is restored by default`,
    },
  ],
  edges: [
    { source: 'flow', target: 'table', label: 'how much it saves' },
    { source: 'table', target: 'code' },
  ],
}
