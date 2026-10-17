import type { Scene } from '@graphlearning/flow'

// One weight, one step, COMPUTED for each rule: w = 1.0, gradient g = 0.5, lr = 0.1, decay λ = 0.01,
// Adam β₁ = 0.9, β₂ = 0.999, ε = 1e-8, bias-corrected first step.
const w = 1.0, g = 0.5, lr = 0.1, wd = 0.01, b1 = 0.9, b2 = 0.999, eps = 1e-8
const adamStep = (grad: number) => {
  const m = (1 - b1) * grad
  const v = (1 - b2) * grad * grad
  const mh = m / (1 - b1)
  const vh = v / (1 - b2)
  return (lr * mh) / (Math.sqrt(vh) + eps)
}
const rows: [string, string, number][] = [
  ['SGD', 'w − lr·g', w - lr * g],
  ['SGD + L2', 'w − lr·(g + λw)', w - lr * (g + wd * w)],
  ['Adam', 'w − lr·m̂/√v̂', w - adamStep(g)],
  ['Adam + L2', 'gradient g + λw, then Adam', w - adamStep(g + wd * w)],
  ['AdamW', 'w − lr·λw − Adam step', w - lr * wd * w - adamStep(g)],
]

// §4 — the update rules side by side, and why L2 inside Adam is not weight decay.
export const optimisers: Scene = {
  id: 'optimisers',
  title: 'One step, five rules',
  flow: 'TB',
  nodes: [
    {
      id: 'step',
      kind: 'table',
      label: 'w = 1.0, g = 0.5, lr = 0.1, λ = 0.01 · first step',
      headers: ['optimiser', 'update', 'new w'],
      values: rows.map(([n, u, v]) => [n, u, v.toFixed(4)]),
    },
    {
      id: 'notes',
      label: 'What each adds',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'mom', label: 'Momentum', sub: 'averages past gradients', pattern: 'service', icon: 'repeat' },
        { id: 'adam', label: 'Adam', sub: 'per-weight step sizes', pattern: 'network', icon: 'scale' },
        { id: 'l2', label: 'L2 in Adam', sub: 'rescaled by √v̂: weakened', pattern: 'warn', icon: 'ban' },
        { id: 'adamw', label: 'AdamW', sub: 'decay applied directly', pattern: 'user', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'step', target: 'notes' }],
}
