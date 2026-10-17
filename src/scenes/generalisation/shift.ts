import type { Scene } from '@graphlearning/flow'

// §7 — the chosen CNN on the test batches, sliced by station and part finish (illustrative), with
// calibration error alongside. Reuses the ML course's evaluation; the neural twist is what shifts.
export const shift: Scene = {
  id: 'shift',
  title: 'Where it breaks',
  flow: 'TB',
  nodes: [
    {
      id: 'slices',
      kind: 'table',
      label: 'Test batches · by slice',
      headers: ['slice', 'images', 'macro-F1', 'dent recall', 'calibration error'],
      values: [
        ['station A', '620', '0.88', '0.84', '0.03'],
        ['station B', '540', '0.86', '0.80', '0.04'],
        ['new station C', '210', '0.71', '0.52', '0.12'],
        ['dark-finish parts', '95', '0.74', '0.48', '0.10'],
      ],
    },
    {
      id: 'causes',
      label: 'What shifted',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-camera', label: 'Camera', sub: 'new lens at station C', pattern: 'warn', icon: 'scanface' },
        { id: 'c-light', label: 'Lighting', sub: 'dents cast no shadow', pattern: 'warn', icon: 'zap' },
        { id: 'c-few', label: 'Few examples', sub: 'dark parts: 95 images', pattern: 'network', icon: 'database' },
        { id: 'c-conf', label: 'Overconfident', sub: 'probabilities drift', pattern: 'external', icon: 'gauge' },
      ],
    },
  ],
  edges: [{ source: 'slices', target: 'causes' }],
}
