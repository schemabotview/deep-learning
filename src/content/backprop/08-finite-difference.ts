import type { Section } from '../types'

export const finiteDifference: Section = {
  id: 'finite-difference',
  title: 'Finite-difference checks and kinks',
  scene: 'finite-difference',
  focus: 'checks',
  slide: `## Checking gradients numerically

A hand-written or custom gradient can be checked against the **definition** of a derivative.

### The central difference
- (L(θ + ε) − L(θ − ε)) / 2ε approximates ∂L/∂θ, here with ε = 1e-4
- For the chapter network, backward and finite difference agree to about **1e-13**
- Compare by **relative** error; in float32 expect far less agreement than float64
- \`torch.autograd.gradcheck\` automates this, in double precision

### Where the check misleads
- At a **kink**, such as relu at 0, the central difference gives **0.50**
- PyTorch defines relu′(0) = **0**; the left and right limits are 0 and 1
- Neither is wrong: the function has no derivative there, so check **away** from kinks`,
  narration:
    "When you write your own gradient, for a custom layer or an unusual loss, you can check it against the definition of a derivative. Nudge one parameter up by a small epsilon, recompute the loss, nudge it down by epsilon, recompute again, and divide the difference by two epsilon. That central difference approximates the derivative with respect to that parameter. For the chapter network, with epsilon one in ten thousand, the backward pass and the finite differences agree to about one part in ten to the thirteen for every parameter checked, which is as close as double precision allows. Compare using relative error rather than absolute, and expect much weaker agreement in single precision, which is why PyTorch's gradient checker runs in double precision. The check has one important blind spot: points where the function has no derivative. ReLU has a kink at zero. A central difference centred exactly there averages a slope of zero on the left and one on the right, and reports a half. PyTorch's convention is to use zero at that point. Neither number is wrong, because there is no derivative to get right; it just means a numerical check should be run at points away from kinks.",
}
