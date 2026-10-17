import type { Section } from '../types'

export const vjp: Section = {
  id: 'vjp',
  title: 'Reverse accumulation and vector–Jacobian products',
  scene: 'vjp',
  focus: 'cost',
  slide: `## Reverse accumulation

Training needs the gradient of **one scalar** loss with respect to **many** parameters — exactly what reverse mode is good at.

### Why reverse mode
- Each backward step multiplies an upstream **row vector** by a local Jacobian
- That is a **vector–Jacobian product**, computed without ever forming the Jacobian
- One backward pass yields the gradient for **every** parameter at once

### The costs
- Forward-mode differentiation needs one pass **per parameter**
- Finite differences need two forward passes per parameter, and are inexact
- Reverse mode costs roughly one extra forward pass — paid for in **memory**, by storing activations
- \`torch.autograd.grad(y, x, grad_outputs=v)\` computes vᵀ·∂y/∂x directly`,
  narration:
    "The last section traced the chain rule by hand, layer by layer. Automatic differentiation does exactly the same thing, and it is worth seeing why it runs backward. Training needs the gradient of one number, the loss, with respect to every parameter, often millions of them. At each step of the backward pass, we hold the gradient of the loss with respect to some intermediate result, a row vector, and we multiply it by that operation's local Jacobian, the matrix of its partial derivatives. That product is called a vector-Jacobian product, and it can almost always be computed without ever building the Jacobian itself, which would be enormous. Because we start from a single scalar, one backward sweep produces the gradient for every parameter at once. Compare the alternatives. Forward-mode differentiation pushes derivatives from the inputs toward the output and needs one pass per parameter. Finite differences need two forward passes per parameter and are only approximate. Reverse mode costs roughly one extra forward pass in time, and pays for it in memory by keeping the forward activations. PyTorch exposes the primitive directly: autograd grad with grad outputs computes a vector-Jacobian product.",
}
