import type { Scene } from '@graphlearning/flow'

// §6 — the defect task's contract (the neural version of Machine Learning ch 1), over the boundaries
// that make or break its evaluation.
export const taskBoundaries: Scene = {
  id: 'task-boundaries',
  title: 'The defect task’s contract',
  flow: 'TB',
  nodes: [
    {
      id: 'contract',
      kind: 'table',
      label: 'Defect classification contract',
      headers: ['element', 'decision'],
      values: [
        ['unit', 'one part, photographed at the inspection station'],
        ['prediction time', 'when the photo is taken, before packing'],
        ['input', 'the image only — not later rework notes'],
        ['target', 'ok / scratch / dent, by inspector'],
        ['annotation', 'two inspectors disagree on 8 % of images'],
        ['split', 'by production batch, never by image'],
        ['decision', 'route to manual check or pass'],
      ],
    },
    {
      id: 'risks',
      label: 'Boundaries that leak',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'batch', label: 'Same batch', sub: 'lighting, camera, lot', pattern: 'warn', icon: 'boxes' },
        { id: 'later', label: 'Later info', sub: 'rework notes, returns', pattern: 'warn', icon: 'clock' },
        { id: 'dupes', label: 'Near-duplicates', sub: 'burst photos of one part', pattern: 'warn', icon: 'copy' },
        { id: 'labels', label: 'Label noise', sub: 'record disagreement', pattern: 'network', icon: 'tag' },
      ],
    },
  ],
  edges: [{ source: 'contract', target: 'risks' }],
}
