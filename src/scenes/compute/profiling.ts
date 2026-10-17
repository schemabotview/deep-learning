import type { Scene } from '@graphlearning/flow'
import { profile, stepMs } from './numbers'

// §5 — reading a supplied profile of one training step (illustrative numbers, as a profiler prints
// them). Shares and GPU utilisation are COMPUTED from the rows.
const gpuBusy = profile.reduce((a, p) => a + p.gpu, 0)

export const profiling: Scene = {
  id: 'profiling',
  title: 'Profiling, transfer, synchronisation',
  flow: 'TB',
  nodes: [
    {
      id: 'profile',
      kind: 'table',
      label: `One step, ${stepMs} ms wall time · GPU busy ${gpuBusy.toFixed(1)} ms (${Math.round((100 * gpuBusy) / stepMs)}%)`,
      headers: ['operation', 'CPU ms', 'GPU ms', 'share of step'],
      values: profile.map((p) => [p.op, p.cpu.toFixed(1), p.gpu.toFixed(1), `${Math.round((100 * Math.max(p.cpu, p.gpu)) / stepMs)}%`]),
    },
    {
      id: 'reading',
      label: 'What the rows say',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-load', label: 'Input-bound', sub: 'loader 61 ms of 92', pattern: 'warn', icon: 'database' },
        { id: 'r-sync', label: 'Sync point', sub: '.item() waits for GPU', pattern: 'warn', icon: 'clock' },
        { id: 'r-copy', label: 'Host → device', sub: 'pin + non_blocking', pattern: 'service', icon: 'swap' },
        { id: 'r-work', label: 'Workers', sub: 'decode in parallel', pattern: 'service', icon: 'cpu' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'profile.py',
      label: `loader = DataLoader(ds, batch_size=64, num_workers=4, pin_memory=True)
with torch.profiler.profile(activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA]) as prof:
    for step, (x, y) in zip(range(20), loader):
        x, y = x.to("cuda", non_blocking=True), y.to("cuda", non_blocking=True)
        train_step(x, y)                       # log loss every 50 steps, not .item() every step
print(prof.key_averages().table(sort_by="self_cpu_time_total", row_limit=8))`,
    },
  ],
  edges: [
    { source: 'profile', target: 'reading', label: 'diagnose' },
    { source: 'reading', target: 'code', label: 'fix, then re-profile' },
  ],
}
