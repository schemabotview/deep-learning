import type { Scene, PlotPoint } from '@graphlearning/flow'
import { resnet, headParams, n, general } from './numbers'

// §3 — three ways to adapt the same pretrained body on 600 labelled images, validation macro-F1 per
// epoch (illustrative). One high rate everywhere overwrites the pretrained features early.
const ep = Array.from({ length: 13 }, (_, i) => i)
const frozen: PlotPoint[] = ep.map((e) => [e, 0.74 * (1 - Math.exp(-(e + 1) / 2))])
const highLr: PlotPoint[] = ep.map((e) => [e, 0.5 + 0.18 * (1 - Math.exp(-e / 4))])
const groups: PlotPoint[] = ep.map((e) => [e, (general(600) * (1 - Math.exp(-(e + 1) / 2.6))) / (1 - Math.exp(-13 / 2.6))]) // ends at §1's 600-image score
const last = (p: PlotPoint[]) => p[p.length - 1][1]

export const fineTune: Scene = {
  id: 'fine-tune',
  title: 'Partial and full fine-tuning',
  flow: 'TB',
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'Validation macro-F1 per epoch, 600 labelled images',
      sub: 'same body, three adaptation choices · illustrative',
      plot: {
        x: { min: 0, max: 12, step: 2, label: 'epoch' },
        y: { min: 0, max: 1, step: 0.25, label: 'macro-F1' },
        axes: 'corner',
        series: [
          { kind: 'line', points: groups, color: 'service', label: `per-layer rates: ${last(groups).toFixed(2)}`, labelAt: [7, 0.92] },
          { kind: 'line', points: frozen, color: 'network', label: `frozen + probe: ${last(frozen).toFixed(2)}`, labelAt: [7, 0.66] },
          { kind: 'line', points: highLr, color: 'warn', label: `1e-3 everywhere: ${last(highLr).toFixed(2)}`, labelAt: [7, 0.42] },
        ],
      },
    },
    {
      id: 'rates',
      kind: 'table',
      label: 'Layer-specific learning rates',
      headers: ['parameter group', 'parameters', 'learning rate'],
      values: [
        ['stem + layer1', n(resnet.stem + resnet.layer1), 'frozen'],
        ['layer2 + layer3', n(resnet.layer2 + resnet.layer3), '1e-5'],
        ['layer4', n(resnet.layer4), '1e-4'],
        ['new head', n(headParams), '1e-3'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'groups.py',
      label: `opt = torch.optim.AdamW([
    {"params": [*model.layer2.parameters(), *model.layer3.parameters()], "lr": 1e-5},
    {"params": model.layer4.parameters(), "lr": 1e-4},
    {"params": model.fc.parameters(),     "lr": 1e-3},
], weight_decay=0.01)          # stem and layer1 left frozen`,
    },
  ],
  edges: [
    { source: 'curves', target: 'rates', label: 'the blue curve' },
    { source: 'rates', target: 'code' },
  ],
}
