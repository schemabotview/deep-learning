import type { Scene, PlotPoint } from '@graphlearning/flow'

// Validation macro-F1 against training-set size for the MLP and the small CNN (illustrative). The
// dashed ceiling is inspector agreement: labels two inspectors agree on only 92 % of the time cap
// what any model can be scored at against one inspector.
// The full training pool is chapter 1's 2,400 images; the curve ends at ch 1's validation scores.
const sizes = [150, 300, 600, 1200, 1800, 2400]
const curve = (top: number, rate: number): PlotPoint[] => sizes.map((n) => [n / 1000, top * (1 - Math.exp(-n / rate))])
const cnn = curve(0.9, 700)
const mlp = curve(0.74, 900)

// §1 — data, capacity and label noise, in one picture plus the memorisation table.
export const capacityNoise: Scene = {
  id: 'capacity-noise',
  title: 'Data, capacity and noisy labels',
  flow: 'TB',
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'Learning curves · validation macro-F1',
      sub: 'split by production batch · illustrative',
      plot: {
        x: { min: 0, max: 2.5, step: 0.5, label: 'training images (thousands)' },
        y: { min: 0, max: 1, step: 0.25, label: 'macro-F1' },
        axes: 'corner',
        series: [
          { kind: 'line', points: cnn, color: 'service', label: 'small CNN', labelAt: [1.85, 0.79] },
          { kind: 'scatter', points: cnn, color: 'service', size: 6 },
          { kind: 'line', points: mlp, color: 'network', label: 'MLP', labelAt: [1.9, 0.6] },
          { kind: 'scatter', points: mlp, color: 'network', size: 6 },
          { kind: 'segment', from: [0, 0.92], to: [2.5, 0.92], color: 'warn', dashed: true, label: 'inspector agreement 0.92', labelAt: [0.08, 0.96] },
        ],
      },
    },
    {
      id: 'memorise',
      kind: 'table',
      label: 'Same CNN, labels shuffled at random',
      headers: ['labels', 'training accuracy', 'validation accuracy'],
      values: [
        ['true labels', '0.99', '0.87'],
        ['random labels', '1.00 — memorised', '0.33 — chance'],
      ],
    },
  ],
  edges: [{ source: 'curves', target: 'memorise', label: 'capacity to memorise' }],
}
