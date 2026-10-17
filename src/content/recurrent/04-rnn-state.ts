import type { Section } from '../types'

export const rnnState: Section = {
  id: 'rnn-state',
  title: 'Recurrent state and shared time parameters',
  scene: 'rnn-state',
  focus: 'trace',
  slide: `## Recurrent state

A recurrent network carries a **hidden state** from step to step, updated by the **same** weights each time.

### The update
- h_t = tanh(w·h_{t−1} + u·x_t + b), here with w = 0.8, u = 1.0, b = 0
- Starting at h₀ = 0, the readings 0.5, 1.0, −0.5, 0.2 give
- h = **0.462, 0.879, 0.200, 0.345**
- Step 3's negative reading pulls the state down, but the memory of step 2 keeps it **positive**
- tanh keeps every state between **−1 and 1**

### What sharing buys
- One set of weights handles sequences of **any length**
- The parameter count does not grow with time
- The state is a **summary**: everything the model keeps about the past must fit in it
- Steps run **in order**: step *t* cannot start before step *t* − 1
- That limits **parallel** training — chapter 9`,
  narration:
    "A recurrent network processes a sequence one step at a time and carries a hidden state forward, a summary of everything it has seen so far. At each step it combines the previous state with the new input using the same weights, then applies a nonlinearity. Here is the smallest possible version, with a single hidden unit, a recurrent weight of nought point eight, an input weight of one and no bias, run on four sensor readings starting from a state of zero. The first reading, nought point five, gives a state of nought point four six two. The second, one point zero, adds to the remembered state, and the pre-activation of one point three seven becomes nought point eight seven nine. The third reading is negative, minus a half, and pulls the state down sharply, but the memory of the previous step keeps it positive, at nought point two. The fourth gives nought point three four five. Unrolled in time, the network looks like a deep stack of layers, one per step, all sharing their weights. That sharing is what lets one model handle sequences of any length, with a parameter count that does not grow with time. The cost is that everything the model keeps about the past must fit into that one state vector.",
}
