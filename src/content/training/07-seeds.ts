import type { Section } from '../types'

export const seeds: Section = {
  id: 'seeds',
  title: 'Seeds, environment records and repeatability limits',
  scene: 'seeds',
  focus: 'runs',
  slide: `## Seeds and repeatability

Setting seeds controls the **random choices** in a run — not every source of variation.

### What to control and record
- Seed Python, NumPy and PyTorch, the **data loader** generator and its workers
- Request deterministic algorithms; PyTorch raises an error where none exists
- Record library versions, CUDA version and the **device** model

### What the runs show
- Same seed, default GPU kernels: **0.861, 0.858, 0.862** — some kernels are nondeterministic
- With deterministic algorithms: **0.860** three times, at some cost in speed
- Across seeds 0–4: mean **0.857**, sd **0.006** — that spread is the real uncertainty
- Bitwise repeatability does not survive new hardware or versions; report **several seeds**`,
  narration:
    "Setting a random seed makes the random choices in a run repeatable: the initial weights, the shuffle order, the dropout masks. To do that properly, seed Python, NumPy and PyTorch, and give the data loader its own seeded generator and worker seeds, because loaders shuffle and augment in separate processes. Seeds alone are not enough, though, because some GPU operations are nondeterministic by design: they add floating-point numbers in whatever order threads finish, and floating-point addition is not associative. The table shows three runs with the same seed, same code and same data on one GPU. With default kernels, the validation scores differ in the third decimal place. Requesting deterministic algorithms makes all three identical, at some cost in speed, and PyTorch raises an error if an operation has no deterministic version. Even then, a different GPU model or a new library version can change results, so record the environment. The most important line is the last one. Across five different seeds the mean is nought point eight five seven with a standard deviation of nought point zero zero six. That spread is the real uncertainty in a single run's score, and it is the reason to report several seeds rather than one.",
}
