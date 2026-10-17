import type { Scene } from '@graphlearning/flow'

// Parameter counts COMPUTED from layer sizes: Σ (in · out + out) over layers.
const count = (sizes: number[]) => sizes.slice(1).reduce((a, out, i) => a + sizes[i] * out + out, 0)
const nets: { name: string; sizes: number[] }[] = [
  { name: 'wide, 1 hidden', sizes: [12288, 256, 3] },
  { name: 'narrow, 1 hidden', sizes: [12288, 32, 3] },
  { name: 'narrow, 3 hidden', sizes: [12288, 32, 32, 32, 3] },
  { name: 'deep, 8 hidden', sizes: [12288, 32, 32, 32, 32, 32, 32, 32, 32, 3] },
]
const fmt = (n: number) => n.toLocaleString('en-GB')

// §3 — what extra width and depth cost, and the gap between representable and learnable.
export const depthWidth: Scene = {
  id: 'depth-width',
  title: 'Wider, deeper, and what it buys',
  flow: 'TB',
  nodes: [
    {
      id: 'counts',
      kind: 'table',
      label: 'Fully connected nets on 64×64 RGB · parameters',
      headers: ['network', 'layer sizes', 'parameters'],
      values: nets.map((n) => {
        const hidden = n.sizes.slice(1, -1)
        const shown = hidden.length > 3 ? `${hidden[0]} ×${hidden.length}` : hidden.join(' → ')
        return [n.name, `${fmt(n.sizes[0])} → ${shown} → ${n.sizes.at(-1)}`, fmt(count(n.sizes))]
      }),
    },
    {
      id: 'claims',
      label: 'Can represent ≠ will learn',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ua', label: 'Approximation', sub: 'one wide layer suffices', pattern: 'service', icon: 'sigma' },
        { id: 'how', label: 'But how wide?', sub: 'possibly enormous', pattern: 'warn', icon: 'layers' },
        { id: 'depth', label: 'Depth', sub: 'reuses features', pattern: 'network', icon: 'merge' },
        { id: 'train', label: 'Learnable?', sub: 'data, optimiser, init', pattern: 'external', icon: 'gauge' },
      ],
    },
  ],
  edges: [{ source: 'counts', target: 'claims' }],
}
