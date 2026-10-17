import type { Scene } from '@graphlearning/flow'

// Parameter count of the tiny defect classifier, COMPUTED from its layer sizes:
// Linear(3·64·64 → 32) has 12,288 × 32 + 32 = 393,248; Linear(32 → 3) has 32 × 3 + 3 = 99.
const inputs = 3 * 64 * 64
const hidden = 32
const classes = 3
const p1 = inputs * hidden + hidden
const p2 = hidden * classes + classes
const fmt = (n: number) => n.toLocaleString('en-GB')

// §1 — hand-made features versus learned ones, and the parameterised function behind the second.
export const learnedFeatures: Scene = {
  id: 'learned-features',
  title: 'Features you write, or features it learns',
  flow: 'TB',
  nodes: [
    {
      id: 'routes',
      label: 'Two routes from a defect image to a class',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'classical',
          label: 'Classical: you design the features',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'c-feat', label: 'Edge count', sub: 'brightness, texture', pattern: 'external', icon: 'pencil' },
            { id: 'c-model', label: 'Logistic model', sub: 'learns the weights only', pattern: 'service', icon: 'scale' },
          ],
        },
        {
          id: 'neural',
          label: 'Neural: the features are parameters',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'n-feat', label: 'Hidden layer', sub: 'learned from pixels', pattern: 'network', icon: 'layers' },
            { id: 'n-model', label: 'Output layer', sub: 'learned with it', pattern: 'service', icon: 'brain' },
          ],
        },
      ],
    },
    {
      id: 'model',
      kind: 'code',
      filename: 'tiny_model.py',
      label: `model = nn.Sequential(
    nn.Flatten(),                       # [N, 3, 64, 64] -> [N, ${fmt(inputs)}]
    nn.Linear(${fmt(inputs)}, ${hidden}),             # ${fmt(p1)} parameters
    nn.ReLU(),
    nn.Linear(${hidden}, ${classes}),                 # ${fmt(p2)} parameters
)                                       # total ${fmt(p1 + p2)}: all learned`,
    },
  ],
  edges: [{ source: 'routes', target: 'model', label: 'f(x; θ)' }],
}
