import type { Section } from '../types'

export const configuration: Section = {
  id: 'configuration',
  title: 'Training/evaluation configuration and evidence',
  scene: 'configuration',
  focus: 'config',
  slide: `## Declare the configuration first

A comparison is only fair if every candidate gets the **same** split, seeds, budget and search, declared before training starts.

### The declared configuration
- 2,400 train/val images and **480** test images, grouped by production batch
- Seeds 0, 1, 2, reported as mean ± spread
- 30 epochs, early stopping on validation macro-F1, **8** search trials each
- Augmentation: flips and ±10° rotations only
- bf16 autocast, checked against fp32

### Which split produces which evidence
- **Train batches**: training observations, never a result
- **Validation batches**: choose models, stop, tune
- **Test batches**: one run per chosen model, at the **end**
- The config and split file are **versioned** with the results
`,
  narration:
    "A comparison between models is only fair if every candidate gets the same split, the same seeds, the same training budget and the same search, and if all of that is declared before training starts. Otherwise the most-tuned model wins, not the best one. Here the declaration is short. Two thousand four hundred images for training and validation, and four hundred and eighty test images, with every split grouped by production batch. Three seeds, nought, one and two, with results reported as a mean and a spread. Thirty epochs with early stopping on validation macro F one, and eight trials of learning rate and weight decay for each candidate. And only label-preserving augmentation, flips and small rotations, which chapter ten showed keep a scratch visible. The splits then decide what each number may be called. Anything measured on training batches is a training observation, useful for diagnosis, never a result. Validation batches are where models are chosen, stopped and tuned. Test batches are used once, for each chosen model, at the very end, and never to make a choice. Writing the configuration into a file, with the split file beside it, means the results can be traced back to exactly what produced them, and the next comparison can reuse the same split.",
}
