import type { Section } from '../types'

export const initialisation: Section = {
  id: 'initialisation',
  title: 'Initialisation, symmetry and gradient propagation',
  scene: 'initialisation',
  focus: 'spread',
  slide: `## Initialisation

Where training starts decides whether signals and gradients **survive** the trip through many layers.

### Signal propagation
- Through ReLU layers of width n, activation variance scales by **n·σ²/2** per layer
- σ = 0.01 makes activations **vanish** within a few layers; σ = 0.1 makes them **explode**
- **Kaiming** initialisation, σ = √(2/n), keeps the spread at 1 for ten layers and more
- Gradients flowing backward obey the same scaling

### Breaking symmetry
- Two hidden units started with identical weights compute identical outputs
- So they receive **identical gradients** — here [−0.05, −0.10] each — and stay twins forever
- Random initialisation breaks the tie; zeros everywhere would leave a layer with one effective unit`,
  narration:
    "Initialisation decides whether a deep network can be trained at all. Think about the spread of activations as a signal passes forward through many layers. For ReLU layers of width n, with weights drawn at standard deviation sigma, each layer multiplies the variance of the activations by n times sigma squared over two, so after ten layers that factor has been applied ten times. The plot computes it for a width of two hundred and fifty-six. With sigma one hundredth, the factor is far below one and the activations shrink toward zero within a few layers. With sigma one tenth, it is above one and they blow up. Kaiming initialisation chooses sigma as the square root of two over n, which makes the factor exactly one, and the spread stays steady through every layer. Gradients travelling backward obey the same kind of scaling, so a bad start means vanishing or exploding gradients too. Initialisation also has to break symmetry. If two hidden units start with identical weights, they compute identical outputs, receive identical gradients, here minus nought point zero five and minus nought point one each, and receive identical updates, forever. They never become different features. Random initialisation breaks the tie.",
}
