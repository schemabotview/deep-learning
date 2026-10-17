import type { Section } from '../types'

export const affineCollapse: Section = {
  id: 'affine-collapse',
  title: 'Affine units, activations and composition',
  scene: 'affine-collapse',
  focus: 'collapse',
  slide: `## Affine layers and activations

A layer computes an **affine** map Wx + b, then applies an **activation** to every element.

### Why the activation is essential
- Two affine layers with nothing between them **collapse** into one
- W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂)
- Here the stack is exactly y = [1, 1]·x + 1.5: depth bought nothing
- A nonlinearity between layers breaks the collapse, so composition adds **expressive power**
- In PyTorch: \`nn.Linear\` is the affine map; \`nn.ReLU\` the activation

### Common choices
- **ReLU** max(0, z): cheap, and zero gradient for negative inputs
- **GELU**: a smooth ReLU, common in transformers
- **sigmoid** and **tanh** saturate at the ends, which can stall gradients — chapter 4`,
  narration:
    "A neural network layer does two things. First an affine map: multiply the input by a weight matrix and add a bias vector. Then an activation function, applied separately to every element of the result. The activation is not decoration; without it, depth means nothing. The table shows why, with small concrete matrices. Stack two affine layers with nothing between them, and the composition is W two times W one x plus b one, plus b two, which rearranges into a single matrix W two W one times x, plus a single bias. Computed here, the two-layer stack is exactly the one-layer function y equals one, one dot x plus one point five. However many affine layers you stack, you get one affine layer. Put a nonlinear function between them and that collapse no longer happens, which is what lets composition build richer functions. The plot shows the usual choices. ReLU, the maximum of zero and its input, is cheap and the default in most vision models, but its gradient is zero for negative inputs. GELU is a smooth version used in transformers. Sigmoid and tanh flatten out at both ends, and that saturation can stall learning, which chapter four returns to.",
}
