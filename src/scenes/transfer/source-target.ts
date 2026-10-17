import type { Scene } from '@graphlearning/flow'
import { pts, scratch, general, renders } from './numbers'

// §1 — transfer helps when the source objective and data overlap the target's; a mismatched source
// helps at small n and then costs accuracy: negative transfer. Illustrative curves, computed points.
export const sourceTarget: Scene = {
  id: 'source-target',
  title: 'Source and target',
  flow: 'TB',
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'Validation macro-F1 against labelled target images',
      sub: 'split by production batch · illustrative',
      plot: {
        x: { min: 0, max: 2.5, step: 0.5, label: 'labelled workshop images (thousands)' },
        y: { min: 0.3, max: 1, step: 0.1, label: 'macro-F1' },
        axes: 'corner',
        series: [
          { kind: 'line', points: pts(general), color: 'service', label: `general photos: ${general(2400).toFixed(2)}`, labelAt: [1.7, 0.97] },
          { kind: 'scatter', points: pts(general), color: 'service', size: 6 },
          { kind: 'line', points: pts(scratch), color: 'network', label: `from scratch: ${scratch(2400).toFixed(2)}`, labelAt: [0.7, 0.55] },
          { kind: 'scatter', points: pts(scratch), color: 'network', size: 6 },
          { kind: 'line', points: pts(renders), color: 'warn', label: `CAD renders: ${renders(2400).toFixed(2)}`, labelAt: [1.75, 0.78] },
          { kind: 'scatter', points: pts(renders), color: 'warn', size: 6 },
        ],
      },
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'What each source shares with the target',
      headers: ['', 'source objective', 'source images', 'shares'],
      values: [
        ['general photos', '1,000-way object labels', '1.2M varied photos', 'edges, texture, lighting'],
        ['CAD renders', 'part-type labels', 'clean, no texture', 'shape only; no surface marks'],
        ['target', 'ok / scratch / dent', 'workshop camera, 2,400', '—'],
      ],
    },
  ],
  edges: [{ source: 'curves', target: 'compare', label: 'why' }],
}
