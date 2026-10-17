import type { Scene } from '@graphlearning/flow'

// §2 — two independent switches. model.eval() changes how layers BEHAVE; torch.no_grad() changes
// whether autograd RECORDS. All four combinations exist; one of them is a classic bug.
export const evalNograd: Scene = {
  id: 'eval-nograd',
  title: 'Two switches, not one',
  flow: 'TB',
  nodes: [
    {
      id: 'grid',
      kind: 'table',
      label: 'model.train() / model.eval()  ×  grad recording on / off',
      headers: ['', 'recording gradients', 'torch.no_grad()'],
      values: [
        ['model.train()', 'training step', 'BUG: dropout on, BN stats updated'],
        ['model.eval()', 'gradients w.r.t. inputs, frozen BN', 'validation and inference'],
      ],
    },
    {
      id: 'layers',
      kind: 'table',
      label: 'What .eval() changes',
      headers: ['layer', 'train mode', 'eval mode'],
      values: [
        ['Dropout(p=0.3)', 'zeroes 30 %, scales the rest by 1/0.7', 'identity'],
        ['BatchNorm', 'batch statistics; updates running stats', 'running stats; no update'],
        ['Linear, Conv, ReLU', 'unchanged', 'unchanged'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'evaluate.py',
      label: `model.eval()                      # layer behaviour
with torch.no_grad():             # no graph, less memory
    logits = model(x_val)
model.train()                     # restore before training again`,
    },
  ],
  edges: [
    { source: 'grid', target: 'layers', label: 'eval() affects' },
    { source: 'layers', target: 'code' },
  ],
}
