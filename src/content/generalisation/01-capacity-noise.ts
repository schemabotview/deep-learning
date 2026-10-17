import type { Section } from '../types'

export const capacityNoise: Section = {
  id: 'capacity-noise',
  title: 'Capacity, sample size, label noise and learning curves',
  scene: 'capacity-noise',
  focus: 'curves',
  slide: `## Data, capacity and noisy labels

Neural networks have enough capacity to **memorise** their training set — so evidence of generalisation has to come from held-out data.

### Learning curves
- The CNN keeps improving with more images; the MLP flattens early
- Both are capped below **inspector agreement, 0.92**: labels noisier than that limit every score
- Where a curve is still rising, **more data** is the remedy worth pricing

### Memorisation
- The same CNN reaches **1.00** training accuracy on **randomly shuffled** labels
- Validation falls to **0.33**: chance, for three classes
- So a perfect training score proves nothing about learning defects
- Label noise is partly **memorised** too: clean the labels you can`,
  narration:
    "Neural networks generalise in ways that classical capacity arguments do not fully explain, and this chapter is about the evidence we can actually gather. Start with learning curves, validation macro F1 against the number of training images, on the same batch-split folds. The small CNN keeps improving as data grows; the MLP flattens out early, because its lack of spatial bias wastes the extra images. Both stay below a ceiling that has nothing to do with the model: two inspectors labelling the same images agree only ninety-two percent of the time, and no model can be scored above the consistency of its labels. Where a curve is still rising at the right-hand end, more data is the remedy worth pricing. Now a striking experiment. Train the same CNN on the same images, but shuffle the labels at random, so there is nothing real to learn. It still reaches perfect training accuracy: it simply memorises which image goes with which label. Validation accuracy falls to a third, chance for three classes. So a network's capacity is large enough to fit anything, which means a perfect training score proves nothing, and noisy labels get partly memorised too. Generalisation evidence has to come from held-out data.",
}
