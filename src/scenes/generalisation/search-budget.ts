import type { Scene } from '@graphlearning/flow'

// §4 — a declared search: the same trial budget for every family, scored on the same batch-split
// folds, with the seed spread of the winner (illustrative).
export const searchBudget: Scene = {
  id: 'search-budget',
  title: 'Search with a declared budget',
  flow: 'TB',
  nodes: [
    {
      id: 'declared',
      kind: 'code',
      filename: 'search.yaml',
      label: `budget: 20 trials per family, random search
families: [mlp, small_cnn, cnn_bn]
space:  lr [1e-4, 3e-3] log, width [16, 64], dropout [0, 0.5]
folds:  3, grouped by production batch
select: mean validation macro-F1; then 5 seeds of the winner`,
    },
    {
      id: 'results',
      kind: 'table',
      label: 'Best of 20 trials per family · validation macro-F1',
      headers: ['family', 'best trial', 'winner, 5 seeds', 'GPU hours'],
      values: [
        ['MLP', '0.72', '0.70 ± 0.02', '1.5'],
        ['small CNN', '0.87', '0.86 ± 0.01', '4'],
        ['CNN + batch norm', '0.88', '0.86 ± 0.01', '6'],
      ],
    },
    {
      id: 'reading',
      label: 'Reading a search result',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-best', label: 'Best trial', sub: 'optimistic by selection', pattern: 'warn', icon: 'star' },
        { id: 'r-seeds', label: 'Re-run seeds', sub: 'the honest score', pattern: 'service', icon: 'repeat' },
        { id: 'r-tie', label: 'Ties', sub: 'prefer cheaper', pattern: 'network', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'declared', target: 'results' },
    { source: 'results', target: 'reading' },
  ],
}
