import type { Scene } from '@graphlearning/flow'
import { P, mem, GB, actPerImage, actBytes } from './numbers'

// §1 — where training memory goes, for chapter 10's fine-tuned ResNet-18 with AdamW in fp32.
// Activations are an estimate (conv + BatchNorm outputs kept for backward). COMPUTED.
const g = (b: number) => `${GB(b).toFixed(2)} GB`
const fixed = mem.params + mem.grads + mem.adam

export const memory: Scene = {
  id: 'memory',
  title: 'Where training memory goes',
  flow: 'TB',
  nodes: [
    {
      id: 'budget',
      kind: 'table',
      label: `ResNet-18, ${P.toLocaleString('en-GB')} parameters, AdamW, fp32, 224 × 224`,
      headers: ['item', 'bytes per', 'batch 32', 'batch 64', 'batch 128'],
      values: [
        ['parameters', '4 per parameter', g(mem.params), g(mem.params), g(mem.params)],
        ['gradients', '4 per parameter', g(mem.grads), g(mem.grads), g(mem.grads)],
        ['Adam m and v', '8 per parameter', g(mem.adam), g(mem.adam), g(mem.adam)],
        ['activations (est.)', `${(actPerImage / 1e6).toFixed(1)} MB per image`, g(actBytes(32)), g(actBytes(64)), g(actBytes(128))],
        ['total', '', g(fixed + actBytes(32)), g(fixed + actBytes(64)), g(fixed + actBytes(128))],
      ],
    },
    {
      id: 'kinds',
      label: 'Two kinds of memory',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-fixed', label: 'Per parameter', sub: `${g(fixed)}, any batch`, pattern: 'network', icon: 'database' },
        { id: 'k-act', label: 'Per example', sub: 'grows with batch, size', pattern: 'warn', icon: 'layers' },
        { id: 'k-inf', label: 'Inference only', sub: 'params + one layer', pattern: 'service', icon: 'zap' },
        { id: 'k-meas', label: 'Measure it', sub: 'max_memory_allocated', pattern: 'service', icon: 'gauge' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'peak.py',
      label: `torch.cuda.reset_peak_memory_stats()
loss = loss_fn(model(x), y); loss.backward(); opt.step(); opt.zero_grad()
print(torch.cuda.max_memory_allocated() / 1e9, "GB")   # compare with the estimate`,
    },
  ],
  edges: [
    { source: 'budget', target: 'kinds', label: 'what scales' },
    { source: 'kinds', target: 'code', label: 'check' },
  ],
}
