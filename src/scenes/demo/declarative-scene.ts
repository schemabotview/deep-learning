import type { Scene } from '@graphlearning/flow'

// §2 — a code card above a container of leaves, which is the other scene shape worth having an
// example of. `kind: 'code'` sizes itself from its own text (a measured 9.02px glyph advance in the
// IBM Plex Mono face the engine ships), so the leaf-card budget does not apply to it. A container
// grows to fit its children and its own header; `cols` sets how many children sit per row.
export const declarativeScene: Scene = {
  id: 'declarative-scene',
  title: 'Nodes and edges in, layout out',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'my-scene.ts',
      label: `export const myScene: Scene = {
  id: 'my-scene',
  flow: 'LR',
  nodes: [{ id: 'a', label: 'A' }],
  edges: [],          // no x, no y
}`,
    },
    {
      id: 'engine',
      label: 'What the engine decides',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'position', label: 'Position', sub: 'every x and every y', pattern: 'service', icon: 'ruler' },
        { id: 'size', label: 'Size', sub: 'containers grow to fit', pattern: 'service', icon: 'scale' },
        { id: 'routing', label: 'Edge routing', sub: 'and the label midpoints', pattern: 'network', icon: 'gitbranch' },
        { id: 'repeat', label: 'Reproducible', sub: 'same input, same frame', pattern: 'storage', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'engine', label: 'computeLayout' }],
}
