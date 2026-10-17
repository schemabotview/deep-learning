import type { Section } from '../types'

export const reliability: Section = {
  id: 'reliability',
  title: 'Pretraining loss versus task/factual reliability',
  scene: 'reliability',
  focus: 'curves',
  slide: `## Loss is not reliability

A falling pretraining loss says the model predicts **text** better. It does not say the text is **true**, or that a task is solved.

### The checkpoints (validation evidence)
- Validation next-token loss falls from **3.90** to **1.95**
- Perplexity, e^loss, falls from **49.4** to **7.0**
- Accuracy on 200 checkable part-number questions rises to **50%**, then stalls at **51%**
- From 8k to 32k steps the loss still improves; the accuracy does not

### Why they part company
- Next-token loss rewards **plausible** continuations, true or not
- A fluent wrong answer can have **low** loss

### What to measure instead
- A held-out **task** set, with answers that can be checked
- Treat generated facts as claims needing **verification**`,
  narration:
    "Pretraining loss measures how well a model predicts text. That is useful, but it is not the same as the text being true, or a task being solved. These illustrative checkpoints come from a model pretrained on workshop notes. All the numbers are validation evidence. The validation next-token loss falls steadily from three point nine to one point nine five, and perplexity, which is e raised to the loss, falls from about forty-nine to seven. Alongside it, the model is asked two hundred part-number questions with answers that can be checked. Its accuracy climbs to fifty percent by eight thousand steps, and then stalls at fifty-one, even though the loss keeps improving for another twenty-four thousand steps. The two measure different things. Next-token loss rewards continuations that are plausible, whether or not they are correct. A rare fact, like one part number, carries very little weight in a loss averaged over every token. And a fluent but wrong answer can score a low loss. So if a task matters, measure the task: a held-out set with answers that can be checked, errors broken down by type rather than one average, and a working assumption that any fact the model generates is a claim to verify, not a result.",
}
