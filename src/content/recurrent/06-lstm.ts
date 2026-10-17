import type { Section } from '../types'

export const lstm: Section = {
  id: 'lstm',
  title: 'LSTM and GRU gates',
  scene: 'lstm',
  focus: 'step',
  slide: `## Gated memory: LSTM and GRU

An LSTM adds a separate **cell state** and **gates** that decide what to forget, what to write, and what to expose.

### One step, traced from c_prev = 0.5
- Forget gate f = σ(2.0) = **0.881**: keep most of the old cell
- Input gate i = σ(0) = **0.500** times candidate g = tanh(1) = **0.762**
- New cell c = f·c_prev + i·g = **0.821**
- Output gate o = **0.731**; hidden state h = o·tanh(c) = **0.494**

### Why it helps
- The cell is updated by **addition**, so gradients can pass through f largely intact
- With f near 1, memory can persist over long spans
- A high forget-gate bias helps early on
- A **GRU** merges the gates into two and drops the separate cell
- Both cost about **4×** and **3×** a plain RNN's weights`,
  narration:
    "Long short-term memory networks attack the vanishing-gradient problem by changing how the state is updated. Alongside the hidden state they keep a separate cell state, and three gates, each a sigmoid between zero and one, decide what happens to it. Here is one step traced from a previous cell value of a half, with gate pre-activations chosen for illustration. The forget gate is the sigmoid of two, nought point eight eight one, so the cell keeps eighty-eight percent of its old value. The input gate is the sigmoid of zero, a half, and it scales a candidate value, the tanh of one, nought point seven six two. The new cell is the kept part plus the admitted part: nought point eight two one. The output gate, nought point seven three one, decides how much of the cell to expose, and the hidden state is that gate times the tanh of the cell, nought point four nine four. The key is that the cell is updated by addition rather than by repeated multiplication through a nonlinearity, so when the forget gate is near one, both the memory and its gradient pass through many steps largely intact. A GRU is a lighter variant with two gates and no separate cell. Both cost several times a plain RNN's weights.",
}
