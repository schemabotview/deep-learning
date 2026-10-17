import type { Section } from '../types'

export const patterns: Section = {
  id: 'patterns',
  title: 'Encoder, decoder, and encoder–decoder patterns',
  scene: 'patterns',
  focus: 'arch',
  slide: `## Three arrangements

The same block is arranged three ways. The difference is **what each position may see**, and that follows from the task.

### Encoder only
- Fits when the whole input exists and the output is a **label**
- Classify a finished inspector note as ok, scratch or dent

### Decoder only
- Fits when the output is a sequence **continued** one token at a time
- Continue a note from its first few words

### Encoder–decoder
- **Cross-attention** lets each decoder token read the encoder's states
- Fits when one sequence maps to a **different** one
- Summarise a [120 × 4] sensor history as a short fault note`,
  narration:
    "The same transformer block can be arranged in three ways, and the difference is what each position is allowed to see. That follows directly from the task. An encoder-only model uses bidirectional self-attention, so every token sees every other. It fits when the whole input exists at prediction time and the output is a label or a tag per token, such as classifying a finished inspector note as ok, scratch or dent. A decoder-only model uses causal self-attention, so each token sees only itself and what came before. It fits when the output is a sequence that is continued one token at a time, such as completing a note from its first few words. An encoder-decoder model combines the two. The encoder reads the input with bidirectional attention, the decoder writes the output with causal attention, and between them, cross-attention lets every decoder token read the encoder's states. It fits when one sequence is mapped to a different one, such as turning a sensor history of a hundred and twenty steps into a short written fault summary. These are architectural choices about visibility. They do not, on their own, decide what the model is trained to predict. That is the objective, and it comes two sections from now.",
}
