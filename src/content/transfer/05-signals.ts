import type { Section } from '../types'

export const signals: Section = {
  id: 'signals',
  title: 'Masked/predictive/contrastive training signals',
  scene: 'signals',
  focus: 'nce',
  slide: `## Self-supervised training signals

Self-supervised learning makes its targets from the **data itself**, so an encoder can pretrain on the 40,000 unlabelled archive images.

### Three signals
- **Masked**: hide image patches or tokens, then rebuild them
- **Predictive**: forecast the next sensor window from earlier ones
- **Contrastive**: two augmented **views** of one image should agree

### InfoNCE for one anchor (τ = 0.1)
- Positive similarity 0.6 gives exp(6) = **403**
- A similar dent at 0.5 gives **148**, taking 0.265 of the mass
- Positive's share **0.721**; loss = −ln 0.721 = **0.327**

### In a batch
- Not every method needs negatives: a predictor with **stop-gradient** can avoid collapse without them`,
  narration:
    "Self-supervised learning makes its training targets from the data itself, so an encoder can be pretrained on the workshop's forty thousand unlabelled archive images before any inspector labels them. Three signals are common. A masked signal hides patches of an image, or tokens of a note, and asks the model to rebuild them. A predictive signal asks it to forecast what comes next, such as the next window of sensor readings. A contrastive signal makes two augmented views of the same image and trains the encoder to map them close together and away from other images. The table traces the contrastive InfoNCE loss for one anchor with a temperature of nought point one. The positive view has a cosine similarity of nought point six, which becomes four hundred and three after dividing by the temperature and exponentiating. One negative, a similar dent from another image, scores nought point five and takes a quarter of the mass. The positive's share is nought point seven two, and the loss is minus its log, nought point three three. Hard negatives like that one dominate the loss. In a batch, each row's positive is on the diagonal and every other image is a negative. Not every method needs negatives: designs with a predictor and a stop-gradient can avoid collapse without them.",
}
