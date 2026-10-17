import type { Scene } from '@graphlearning/flow'
import { P } from './numbers'

// §7 — compression and parallelism, named at the boundary: what each changes, the check it needs,
// and who owns the implementation. Model sizes COMPUTED for the 11.18M-parameter ResNet-18.
const mb = (bytes: number) => `${(bytes / 1e6).toFixed(1)} MB`

export const boundaries: Scene = {
  id: 'boundaries',
  title: 'Compression, parallelism, handoff',
  flow: 'TB',
  nodes: [
    {
      id: 'sizes',
      kind: 'table',
      label: `Weights of the ${P.toLocaleString('en-GB')}-parameter model`,
      headers: ['stored as', 'bytes per weight', 'size'],
      values: [
        ['fp32', '4', mb(4 * P)],
        ['bf16 / fp16', '2', mb(2 * P)],
        ['int8 (quantised)', '1', mb(P)],
      ],
    },
    {
      id: 'techniques',
      kind: 'table',
      label: 'Beyond this course: what changes, what to check, who owns it',
      headers: ['technique', 'changes', 'check before use', 'owner'],
      values: [
        ['quantisation', 'weight / activation precision', 'per-class F1 on val + test', 'deployment'],
        ['pruning, distillation', 'the model itself', 'a full re-evaluation', 'specialist'],
        ['data parallel', 'batch spread over devices', 'BatchNorm sync, lr vs batch', 'training infra'],
        ['tensor / pipeline parallel', 'layers split over devices', 'numerics match one device', 'specialist'],
      ],
    },
    {
      id: 'handoff',
      label: 'Hand over with the request',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-base', label: 'Baseline', sub: 'metrics, seeds, split', pattern: 'service', icon: 'barchart' },
        { id: 'h-budget', label: 'Budget', sub: 'latency, memory', pattern: 'network', icon: 'gauge' },
        { id: 'h-tol', label: 'Tolerance', sub: 'max F1 drop allowed', pattern: 'warn', icon: 'ruler' },
      ],
    },
  ],
  edges: [
    { source: 'sizes', target: 'techniques', label: 'and further' },
    { source: 'techniques', target: 'handoff' },
  ],
}
