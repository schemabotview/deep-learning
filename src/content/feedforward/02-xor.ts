import type { Section } from '../types'

export const xor: Section = {
  id: 'xor',
  title: 'Forward passes, parameter counts and XOR',
  scene: 'xor',
  focus: 'forward',
  slide: `## A forward pass: XOR

XOR is the classic function **no single line** can separate — and one hidden layer can.

### The network, traced
- Hidden units: h₁ = relu(x₁ + x₂), h₂ = relu(x₁ + x₂ − 1)
- Output: y = h₁ − 2h₂
- (0,0) → **0**; (0,1) and (1,0) → **1**; (1,1) → h₁ = 2, h₂ = 1 → **0**
- The hidden layer maps the four points to a space where a line **does** separate them
- Remove the ReLU and the network collapses to a line again: XOR fails

### Counting parameters
- Each layer has in × out weights plus out biases
- (2·2 + 2) + (2·1 + 1) = **9** parameters
- These weights were chosen by hand; training must **find** such weights from data
- Many different weight settings compute XOR: the solution is **not unique**`,
  narration:
    "Here is a complete forward pass you can check by hand. XOR outputs one when exactly one of its two inputs is one. Plot the four inputs and you see the problem: the two ones sit on one diagonal and the two zeros on the other, so no single straight line separates them, and no linear model can compute XOR. Now add one hidden layer of two ReLU units. The first computes relu of x one plus x two. The second computes relu of x one plus x two minus one. The output is the first hidden unit minus twice the second. Trace each input through the table. Zero, zero gives zero everywhere. Zero, one and one, zero both give a first hidden value of one and a second of zero, so the output is one. One, one gives two and one, and two minus two is zero. Exactly XOR. What the hidden layer did was move the four points into a new space where a line does separate them, which is the idea of a learned representation in its smallest form. Counting parameters: each layer has inputs times outputs weights, plus one bias per output, nine in total. These weights were chosen by hand; training has to find such weights from data.",
}
