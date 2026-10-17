import type { Scene } from '@graphlearning/flow'

// §7 — seeds control randomness, not every source of variation. Same seed, same code, same data,
// three GPU runs (illustrative): nondeterministic kernels still move the last digits.
export const seeds: Scene = {
  id: 'seeds',
  title: 'Repeatable, within limits',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'repro.py',
      label: `random.seed(0); np.random.seed(0); torch.manual_seed(0)
g = torch.Generator().manual_seed(0)
loader = DataLoader(ds, shuffle=True, generator=g,
                    worker_init_fn=seed_worker)
torch.use_deterministic_algorithms(True)   # error if none exists
log_env(torch.__version__, torch.version.cuda, gpu_name)`,
    },
    {
      id: 'runs',
      kind: 'table',
      label: 'Seed 0, three runs on one GPU · validation macro-F1',
      headers: ['setting', 'run 1', 'run 2', 'run 3'],
      values: [
        ['default kernels', '0.861', '0.858', '0.862'],
        ['deterministic algorithms', '0.860', '0.860', '0.860'],
        ['seeds 0–4, deterministic', 'mean 0.857', 'sd 0.006', ''],
      ],
    },
    {
      id: 'limits',
      label: 'What a seed does not fix',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'hw', label: 'Hardware', sub: 'other GPU, other sums', pattern: 'warn', icon: 'cpu' },
        { id: 'ver', label: 'Versions', sub: 'library changes', pattern: 'warn', icon: 'package' },
        { id: 'spread', label: 'Seed spread', sub: 'report several seeds', pattern: 'network', icon: 'barchart' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'runs' },
    { source: 'runs', target: 'limits' },
  ],
}
