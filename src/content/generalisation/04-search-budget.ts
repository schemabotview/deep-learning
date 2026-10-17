import type { Section } from '../types'

export const searchBudget: Section = {
  id: 'search-budget',
  title: 'Architecture and training search under budgets',
  scene: 'search-budget',
  focus: 'results',
  slide: `## Searching with a budget

Neural search spaces are huge, so the search is **declared before** it runs and its result is read with care.

### The declared search
- **20 trials per family**, random search over learning rate, width and dropout
- The same three folds, grouped by production batch, for every trial
- The winner is then re-run with **5 seeds**
- Random search beats a grid when only a **few** settings matter

### Reading the result
- The best trial is **optimistic**: it won partly by luck
- Re-run, the CNN scores **0.86 ± 0.01**, not 0.87
- Adding batch norm wins one trial but **ties** across seeds, at 50 % more compute
- Report every family's budget and **GPU hours** beside its score
- The test batches play **no** part in any of this`,
  narration:
    "Neural networks have far more choices than classical models: learning rate, width, depth, dropout, schedule, batch size, and more. With that many, a search can always find a setting that looks good on validation by luck, so the search is declared before it runs. Here each model family gets the same budget of twenty trials of random search, over the learning rate on a log scale, the width and the dropout rate, all scored on the same three folds grouped by production batch. The best configuration from each family is then retrained with five different seeds. The table shows why that last step matters. The best single trial for the small CNN scored nought point eight seven, but that trial was selected for being the best, so it is optimistic. Re-run with five seeds, the same configuration scores nought point eight six, give or take a hundredth. Adding batch normalisation won its best trial at nought point eight eight, but across seeds it ties with the plain CNN, while costing half as much compute again. When two candidates tie within seed noise, prefer the cheaper one. And report each family's budget and compute alongside its score, so that a heavily tuned favourite is not mistaken for a better architecture.",
}
