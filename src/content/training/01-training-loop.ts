import type { Section } from '../types'

export const trainingLoop: Section = {
  id: 'training-loop',
  title: 'Model, buffer and optimiser state',
  scene: 'training-loop',
  focus: 'state',
  slide: `## The training loop and its state

A training run is a loop that **changes several kinds of state** — and every one of them matters to reproduce or resume it.

### The loop
- Forward → loss → **clear** old gradients → backward → optimiser step → schedule step
- \`model.train()\` first, so dropout and batch norm behave as in training

### State the run carries
- **Parameters**: weights and biases, changed by the optimiser
- **Buffers**: batch-norm running statistics, changed by the **forward** pass, not by gradients
- **Optimiser state**: momentum and Adam moments, one or two numbers per weight
- **Schedule** and **randomness**: the current learning rate, the shuffle order, dropout masks
- Model state, optimiser state and schedule state are saved **separately**`,
  narration:
    "Chapter three computed gradients; a training loop uses them, and in doing so it changes several different kinds of state. The loop itself is short. Put the model in training mode. For each batch, run the forward pass, compute the loss, clear the old gradients, run backward to fill in new ones, let the optimiser update the parameters, and advance the learning-rate schedule. What is easy to miss is how much state that loop is carrying. The parameters are the obvious part, the weights and biases the optimiser changes. Then there are buffers, such as batch normalisation's running mean and variance, which chapter six explains; they are updated by the forward pass in training mode, not by gradients, but they are part of the model and are saved with it. The optimiser has its own state: momentum keeps a running velocity for every weight, and Adam keeps two running moments for every weight, so for Adam the optimiser state is twice the size of the model. The schedule knows the current learning rate and step. And randomness, the shuffle order and the dropout masks, comes from random number generators with states of their own. Each piece is saved separately, which is exactly how they get lost.",
}
