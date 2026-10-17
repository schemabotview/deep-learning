import type { Section } from '../types'

export const bidirectional: Section = {
  id: 'bidirectional',
  title: 'Bidirectionality, state leakage and batching',
  scene: 'bidirectional',
  focus: 'when',
  slide: `## Both directions, and leaking state

A **bidirectional** RNN runs one pass forward and one backward and combines them — so every step sees the **future**.

### When it is allowed
- Classifying a **finished** note: yes, every word already exists
- **Forecasting** the next reading: no, the backward pass reads the future
- Flagging a fault **as it happens**: no, later readings arrive later

### State that leaks
- Carrying the hidden state from one machine's stream into another's mixes **unrelated** histories
- Reset the state per sequence, or per machine stream
- **Padding** steps update the state too, unless sequences are packed
- \`pack_padded_sequence\` makes the RNN stop at each sequence's **true** length`,
  narration:
    "A bidirectional recurrent network runs two passes over a sequence, one forward and one backward, and combines their states at each step. That means every step's output depends on the steps after it as well as before. Whether that is allowed is purely a question of the visibility contract. For classifying a finished inspector's note, it is fine and usually helpful, because every word exists when the prediction is made. For forecasting the next sensor reading, it is a leak: the backward pass has read the future, and a model trained that way will score brilliantly in validation and be impossible to deploy. The same applies to flagging a fault as it happens, since later readings are not yet available. Recurrent state can leak in more practical ways too. If the hidden state is carried from batch to batch, it must be carried within one machine's stream; letting machine A's state flow into machine B's sequence mixes unrelated histories. Reset it at the start of every independent sequence. And padding causes trouble here as well: in a padded batch, the RNN keeps updating its state through the padding steps. Packing the sequences makes it stop at each one's true length, so the final state is the real one.",
}
