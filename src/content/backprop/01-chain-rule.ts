import type { Section } from '../types'

export const chainRule: Section = {
  id: 'chain-rule',
  title: 'Graphs, local derivatives and the chain rule',
  scene: 'chain-rule',
  focus: 'graph',
  slide: `## A graph of local derivatives

Backpropagation is the **chain rule**, applied to a graph of simple operations, in reverse order.

### The forward graph
- z₁ = W₁x + b₁ → h = relu(z₁) → y = W₂·h + b₂ → L = ½(y − t)²
- Each operation knows only its **local** derivative: ∂y/∂h = W₂, ∂L/∂y = y − t
- The forward pass gives y = **−0.18** and L = **0.6962** for t = 1

### Why the values are kept
- Local derivatives need the forward values: ReLU's needs **z₁**, the weight gradient needs **x**
- So the forward pass **stores** them for the backward pass
- The chain rule multiplies local derivatives along the path back to each parameter
- Storing activations is why training needs more **memory** than inference
- Deriving it is calculus; here we trace it`,
  narration:
    "Backpropagation is the chain rule, applied systematically to a graph of simple operations. Here is the network we will trace all chapter: two inputs, a hidden layer of two ReLU units, one output, and a squared-error loss against a target of one. Written as a graph, it is a chain of four operations. The affine map makes z one from x. ReLU makes h from z one. A second affine map makes the output y. And the loss compares y with the target. The crucial property is that each operation only needs to know its own local derivative. The loss knows that its derivative with respect to y is y minus t. The output layer knows its derivative with respect to h is just its weight vector. ReLU knows its derivative is one where its input was positive and zero elsewhere. Run the forward pass with the weights shown and the output is minus nought point one eight, a loss of nought point six nine six. Notice that the local derivatives need forward values: ReLU's needs z one, and the weight gradient needs x. That is why the forward pass stores them, and why training uses more memory than inference. The chain rule then multiplies local derivatives along the path back to each parameter.",
}
