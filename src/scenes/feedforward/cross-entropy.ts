import type { Scene } from '@graphlearning/flow'
import { f2, softmax } from '../points'

// One image's logits for (ok, scratch, dent), COMPUTED through softmax and cross-entropy.
const classes = ['ok', 'scratch', 'dent']
const logits = [2.0, 0.5, -1.0]
const p = softmax(logits)
const loss = (k: number) => -Math.log(p[k])

// §5 — logits to probabilities to a loss, and what the loss means.
export const crossEntropy: Scene = {
  id: 'cross-entropy',
  title: 'Logits to loss',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'table',
      label: 'One image · logits [2.0, 0.5, −1.0]',
      headers: ['class', 'logit', 'softmax p', 'loss if this is the label'],
      values: classes.map((c, k) => [c, f2(logits[k], 1), f2(p[k], 3), f2(loss(k), 3)]),
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'loss.py',
      label: `logits = model(x)                    # [N, 3], raw scores
loss = F.cross_entropy(logits, y)    # y: int64 [N]
# = mean over the batch of  −log softmax(logits)[y]
# never: F.cross_entropy(logits.softmax(-1), y)  — softmax twice`,
    },
    {
      id: 'reading',
      label: 'Reading a cross-entropy value · 3 classes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'right', label: 'Confident, right', sub: 'loss near 0', pattern: 'service', icon: 'circlecheck' },
        { id: 'uniform', label: 'Uniform guess', sub: 'ln 3 = 1.10', pattern: 'network', icon: 'scale' },
        { id: 'wrong', label: 'Confident, wrong', sub: 'loss grows unbounded', pattern: 'warn', icon: 'zap' },
        { id: 'batch', label: 'Batch loss', sub: 'mean over N images', pattern: 'external', icon: 'sigma' },
      ],
    },
  ],
  edges: [
    { source: 'trace', target: 'code', label: 'in PyTorch' },
    { source: 'code', target: 'reading' },
  ],
}
