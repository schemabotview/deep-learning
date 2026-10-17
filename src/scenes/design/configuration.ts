import type { Scene } from '@graphlearning/flow'

// §2 — one declared configuration and the evidence each stage is allowed to produce.
export const configuration: Scene = {
  id: 'configuration',
  title: 'Training and evaluation configuration',
  flow: 'TB',
  nodes: [
    {
      id: 'stages',
      label: 'Which split produces which evidence',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 's-train', label: 'Train batches', sub: 'training observations', pattern: 'storage', icon: 'database' },
        { id: 's-val', label: 'Val batches', sub: 'choose, stop, tune', pattern: 'network', icon: 'search' },
        { id: 's-test', label: 'Test batches', sub: 'once, at the end', pattern: 'warn', icon: 'lock' },
      ],
      edges: [
        { source: 's-train', target: 's-val', label: 'select' },
        { source: 's-val', target: 's-test', label: 'report' },
      ],
    },
    {
      id: 'config',
      kind: 'table',
      label: 'Declared for every candidate, before training',
      headers: ['setting', 'value', 'decided by'],
      values: [
        ['split', '2,400 train/val, 480 test, by batch', 'chapter 1, fixed'],
        ['seeds', '0, 1, 2', 'reported as mean ± spread'],
        ['budget', '30 epochs, early stop on val macro-F1', 'same for all'],
        ['search', '8 trials of lr and weight decay each', 'validation only'],
        ['augmentation', 'flip, ±10° rotation', 'label-preserving (ch 10)'],
        ['test', 'one run per chosen model', 'never used to choose'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'config.yaml',
      label: `split: {by: production_batch, dev: 2400, val_fraction: 0.2, test: 480, file: splits_v3.csv}
seeds: [0, 1, 2]
budget: {epochs: 30, early_stop: {metric: val_macro_f1, patience: 5}, trials: 8}
augment: [hflip, rotate_10]
precision: bf16-autocast   # chapter 12: checked against fp32 on val`,
    },
  ],
  edges: [
    { source: 'stages', target: 'config', label: 'declared up front' },
    { source: 'config', target: 'code', label: 'as a file' },
  ],
}
