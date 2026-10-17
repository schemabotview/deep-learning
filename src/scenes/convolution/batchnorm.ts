import type { Scene } from '@graphlearning/flow'

// BatchNorm on one channel, a batch of 4 values, COMPUTED. Training mode normalises with the batch's
// own mean and (biased) variance and updates the running stats with momentum 0.1; eval mode uses the
// running stats, which after one step are still close to their initial values (mean 0, var 1).
const x = [2, 4, 6, 8]
const mean = x.reduce((a, b) => a + b, 0) / x.length
const varB = x.reduce((a, b) => a + (b - mean) ** 2, 0) / x.length
const varU = x.reduce((a, b) => a + (b - mean) ** 2, 0) / (x.length - 1)
const eps = 1e-5
const train = x.map((v) => (v - mean) / Math.sqrt(varB + eps))
const runMean = 0.9 * 0 + 0.1 * mean
const runVar = 0.9 * 1 + 0.1 * varU
const evalOut = x.map((v) => (v - runMean) / Math.sqrt(runVar + eps))
const f = (v: number[]) => v.map((u) => u.toFixed(2)).join(', ')

// §6 — batch statistics in training, running statistics in evaluation.
export const batchnorm: Scene = {
  id: 'batchnorm',
  title: 'Batch statistics, running statistics',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'table',
      label: 'BatchNorm, one channel, batch [2, 4, 6, 8] · γ = 1, β = 0',
      headers: ['quantity', 'value'],
      values: [
        ['batch mean, variance', `${mean}, ${varB}`],
        ['train-mode output', f(train)],
        ['running mean after 1 step', `0.9·0 + 0.1·${mean} = ${runMean.toFixed(2)}`],
        ['running var after 1 step', `0.9·1 + 0.1·${varU.toFixed(2)} = ${runVar.toFixed(2)}`],
        ['eval-mode output, same batch', f(evalOut)],
      ],
    },
    {
      id: 'rules',
      label: 'Consequences',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-batch', label: 'Batch-dependent', sub: 'tiny batches: noisy', pattern: 'warn', icon: 'boxes' },
        { id: 'r-state', label: 'Buffers', sub: 'saved with the model', pattern: 'storage', icon: 'database' },
        { id: 'r-eval', label: 'Forget eval()', sub: 'val updates the stats', pattern: 'warn', icon: 'ban' },
        { id: 'r-warm', label: 'Warm stats', sub: 'need many steps', pattern: 'network', icon: 'clock' },
      ],
    },
  ],
  edges: [{ source: 'trace', target: 'rules' }],
}
