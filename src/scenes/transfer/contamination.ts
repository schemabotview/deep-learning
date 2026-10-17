import type { Scene } from '@graphlearning/flow'

// §7 — the unlabelled pretraining pool was scraped from the same camera archive as the test batches.
// Illustrative scores; the same model scored on a contaminated and a clean test set.
export const contamination: Scene = {
  id: 'contamination',
  title: 'Evaluating transfer honestly',
  flow: 'TB',
  nodes: [
    {
      id: 'pipeline',
      label: 'Keep pretraining away from the test batches',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'c-pool', label: 'Camera archive', sub: '40k unlabelled', pattern: 'storage', icon: 'database' },
        { id: 'c-filter', label: 'Drop test batches', sub: 'by batch id + hash', pattern: 'service', icon: 'scissors' },
        { id: 'c-pre', label: 'Pretrain encoder', sub: 'self-supervised', pattern: 'network', icon: 'brain' },
      ],
      edges: [
        { source: 'c-pool', target: 'c-filter' },
        { source: 'c-filter', target: 'c-pre' },
      ],
    },
    {
      id: 'scores',
      kind: 'table',
      label: 'Same encoder and head, two test sets · final-test results',
      headers: ['test set', 'seen in pretraining?', 'linear probe', 'fine-tune'],
      values: [
        ['all 480 test images', '310 of 480', '0.89', '0.91'],
        ['170 never-seen images', 'no', '0.78', '0.84'],
        ['gap', '', '0.11', '0.07'],
      ],
    },
    {
      id: 'protocol',
      kind: 'table',
      label: 'Report both protocols, same splits',
      headers: ['protocol', 'measures', 'state it with'],
      values: [
        ['linear probe', 'what the frozen features already separate', 'head, epochs, lr'],
        ['fine-tune', 'how far the body can adapt', 'groups, rates, budget'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'filter_pool.py',
      label: `test_batches = set(splits["test"].batch_id)
pool = archive[~archive.batch_id.isin(test_batches)]          # drop whole batches
seen = {phash(img) for img in splits["test"].images}
pool = pool[[min_hamming(phash(i), seen) > 6 for i in pool.images]]  # near-duplicates too`,
    },
  ],
  edges: [
    { source: 'pipeline', target: 'scores', label: 'skip the filter' },
    { source: 'scores', target: 'protocol' },
    { source: 'protocol', target: 'code', label: 'the filter' },
  ],
}
