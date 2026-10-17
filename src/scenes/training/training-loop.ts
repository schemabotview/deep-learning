import type { Scene } from '@graphlearning/flow'

// §1 — the canonical loop, and every kind of state a run carries (what a checkpoint must hold).
export const trainingLoop: Scene = {
  id: 'training-loop',
  title: 'One loop, several kinds of state',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'train.py',
      label: `model.train()
for x, y in train_loader:
    x, y = x.to(device), y.to(device)
    logits = model(x)                       # forward
    loss = F.cross_entropy(logits, y)
    opt.zero_grad(set_to_none=True)         # clear old gradients
    loss.backward()                         # fill .grad
    opt.step()                              # update parameters
    sched.step()                            # update the learning rate`,
    },
    {
      id: 'state',
      kind: 'table',
      label: 'State a training run carries',
      headers: ['state', 'example', 'changed by', 'saved in'],
      values: [
        ['parameters', 'weights, biases', 'opt.step()', 'model.state_dict()'],
        ['buffers', 'BatchNorm running mean', 'forward in train mode', 'model.state_dict()'],
        ['optimiser state', 'momentum, Adam moments', 'opt.step()', 'opt.state_dict()'],
        ['schedule', 'current learning rate', 'sched.step()', 'sched.state_dict()'],
        ['randomness', 'shuffle order, dropout', 'every batch', 'RNG states'],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'state', label: 'what it changes' }],
}
