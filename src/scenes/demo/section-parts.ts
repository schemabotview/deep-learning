import type { Scene } from '@graphlearning/flow'

// §1 — the anatomy of a section, drawn as the thing it describes. `flow: 'LR'` lays the graph out
// left-to-right; 'TB' is the other option. Leaf cards are a fixed 210x96, so label and sub have a
// real character budget — `npm run check` models the wrapped height and fails before the card
// overflows on screen.
export const sectionParts: Scene = {
  id: 'section-parts',
  title: 'One section, three parts',
  flow: 'LR',
  nodes: [
    { id: 'markdown', label: 'Markdown', sub: 'the source of truth', pattern: 'storage', icon: 'file' },
    { id: 'section', label: 'Section', sub: 'the atomic unit', pattern: 'service', icon: 'layers' },
    { id: 'slide', label: 'Slide', sub: 'terse — for the eye', pattern: 'external', icon: 'monitor' },
    { id: 'narration', label: 'Narration', sub: 'prose — for the ear', pattern: 'network', icon: 'scroll' },
    { id: 'scene', label: 'Scene', sub: 'diagram or code card', pattern: 'user', icon: 'share' },
  ],
  edges: [
    { source: 'markdown', target: 'section', label: 'authored' },
    { source: 'section', target: 'scene' },
    { source: 'section', target: 'slide' },
    { source: 'section', target: 'narration', label: 'wav' },
  ],
}
