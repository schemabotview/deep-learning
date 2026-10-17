import type { Scene } from '@graphlearning/flow'
import { backward, finiteDiff } from './net'

// Analytic gradients from the backward pass against central finite differences (ε = 1e-4), all
// COMPUTED from the chapter network; and the ReLU kink, where the two disagree by definition.
const g = backward()
const checks: [string, number, number][] = [
  ['W₁[0][0]', g.dW1[0][0], finiteDiff('W1', 0, 0)],
  ['W₁[1][1]', g.dW1[1][1], finiteDiff('W1', 1, 1)],
  ['b₁[0]', g.db1[0], finiteDiff('b1', 0)],
  ['W₂[1]', g.dW2[1], finiteDiff('W2', 1)],
  ['b₂', g.db2, finiteDiff('b2', 0)],
]
const rel = (a: number, n: number) => Math.abs(a - n) / Math.max(1e-12, Math.abs(a) + Math.abs(n))
const eps = 1e-4
const kink = (Math.max(0, eps) - Math.max(0, -eps)) / (2 * eps)

export const finiteDifference: Scene = {
  id: 'finite-difference',
  title: 'Check gradients numerically',
  flow: 'TB',
  nodes: [
    {
      id: 'checks',
      kind: 'table',
      label: 'Analytic vs central difference, ε = 1e-4',
      headers: ['parameter', 'backward', 'finite diff', 'relative error'],
      values: checks.map(([n, a, d]) => [n, a.toFixed(6), d.toFixed(6), rel(a, d).toExponential(1)]),
    },
    {
      id: 'kink',
      kind: 'table',
      label: 'At a kink: relu at z = 0',
      headers: ['method', 'derivative'],
      values: [
        ['central difference', kink.toFixed(2)],
        ['PyTorch convention', '0.00'],
        ['left / right limits', '0 / 1'],
      ],
    },
  ],
  edges: [{ source: 'checks', target: 'kink', label: 'except at kinks' }],
}
