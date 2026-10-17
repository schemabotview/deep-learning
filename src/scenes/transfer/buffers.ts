import type { Scene } from '@graphlearning/flow'
import { running } from './numbers'

// §4 — requires_grad=False stops gradient updates, not BatchNorm's running statistics. A body
// frozen but left in train() mode drifts its running mean from the source's 0.0 towards the target
// batches' 0.6, momentum 0.1. COMPUTED.
const ks = [0, 1, 5, 10, 25, 50]

export const buffers: Scene = {
  id: 'buffers',
  title: 'Frozen parameters, moving buffers',
  flow: 'TB',
  nodes: [
    {
      id: 'drift',
      kind: 'table',
      label: 'One BatchNorm channel, body "frozen", model.train()',
      headers: ['batches seen', 'running_mean', 'weight γ', 'grad'],
      values: ks.map((k) => [String(k), running(k).toFixed(3), '1.000', 'None']),
    },
    {
      id: 'state',
      label: 'What "frozen" does and does not cover',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-param', label: 'Parameters', sub: 'requires_grad stops', pattern: 'service', icon: 'lock' },
        { id: 's-buf', label: 'BN buffers', sub: 'update in train()', pattern: 'warn', icon: 'database' },
        { id: 's-drop', label: 'Dropout', sub: 'active in train()', pattern: 'warn', icon: 'ban' },
        { id: 's-opt', label: 'Optimiser state', sub: 'only for passed params', pattern: 'network', icon: 'history' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'freeze.py',
      label: `model.train()                               # head trains normally
for m in model.modules():
    if isinstance(m, nn.BatchNorm2d):
        m.eval()                            # keep the source running statistics
# check it: compare the buffers before and after one epoch
before = {k: v.clone() for k, v in model.named_buffers()}`,
    },
  ],
  edges: [
    { source: 'drift', target: 'state', label: 'why' },
    { source: 'state', target: 'code', label: 'freeze both' },
  ],
}
