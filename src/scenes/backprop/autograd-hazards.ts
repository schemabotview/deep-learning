import type { Scene } from '@graphlearning/flow'

// §6 — what autograd records, and the operations that change or break the record.
export const autogradHazards: Scene = {
  id: 'autograd-hazards',
  title: 'What autograd remembers',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'graph_state.py',
      label: `w = torch.randn(3, requires_grad=True)    # a leaf: gradients land in w.grad
h = torch.sigmoid(x @ w)                     # recorded: sigmoid saves its output
target = teacher(x).detach()                 # cut: no gradient flows into teacher
h.mul_(2)                                    # in-place on a saved tensor
loss = ((h - target) ** 2).mean()
loss.backward()   # RuntimeError: a variable needed for gradient
                  # computation has been modified by an inplace operation`,
    },
    {
      id: 'ops',
      kind: 'table',
      label: 'Operations and the graph',
      headers: ['operation', 'effect'],
      values: [
        ['requires_grad=True', 'start recording from this leaf'],
        ['.detach()', 'same values, no gradient path'],
        ['torch.no_grad()', 'record nothing inside the block'],
        ['in-place on a saved tensor', 'error at backward — or wrong if bypassed'],
        ['.data / .numpy()', 'leaves the graph silently'],
      ],
    },
    {
      id: 'habits',
      label: 'Habits that keep gradients honest',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'h-detach', label: 'Detach targets', sub: 'teachers, baselines', pattern: 'service', icon: 'scissors' },
        { id: 'h-nograd', label: 'no_grad', sub: 'for inference only', pattern: 'network', icon: 'ban' },
        { id: 'h-inplace', label: 'Avoid in-place', sub: 'on saved tensors', pattern: 'warn', icon: 'pencil' },
        { id: 'h-none', label: 'Check .grad', sub: 'None means cut off', pattern: 'external', icon: 'search' }
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'ops', label: 'the rules' },
    { source: 'ops', target: 'habits' },
  ],
}
