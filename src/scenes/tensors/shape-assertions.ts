import type { Scene } from '@graphlearning/flow'

// §7 — a module written with its shape contract visible: comments on every step and assertions at
// the boundaries, plus the trace those assertions check (shapes COMPUTED from the sizes).
const n = 32
const flatSize = 3 * 64 * 64
export const shapeAssertions: Scene = {
  id: 'shape-assertions',
  title: 'Write the shapes down',
  flow: 'TB',
  nodes: [
    {
      id: 'module',
      kind: 'code',
      filename: 'defect_mlp.py',
      label: `class DefectMLP(nn.Module):
    def __init__(self, hidden=32, classes=3):
        super().__init__()
        self.fc1 = nn.Linear(3 * 64 * 64, hidden)
        self.fc2 = nn.Linear(hidden, classes)

    def forward(self, x):                    # x: [N, 3, 64, 64]
        assert x.shape[1:] == (3, 64, 64), x.shape
        h = torch.relu(self.fc1(x.flatten(1)))   # [N, hidden]
        logits = self.fc2(h)                      # [N, classes]
        return logits                             # no softmax here`,
    },
    {
      id: 'trace',
      kind: 'table',
      label: `Shape trace for a batch of ${n}`,
      headers: ['step', 'shape'],
      values: [
        ['input x', `[${n}, 3, 64, 64]`],
        ['x.flatten(1)', `[${n}, ${flatSize.toLocaleString('en-GB')}]`],
        ['relu(fc1(·))', `[${n}, 32]`],
        ['fc2(·) = logits', `[${n}, 3]`],
        ['labels y', `[${n}]  int64`],
      ],
    },
  ],
  edges: [{ source: 'module', target: 'trace', label: 'what the comments claim' }],
}
