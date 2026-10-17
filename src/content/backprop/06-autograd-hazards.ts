import type { Section } from '../types'

export const autogradHazards: Section = {
  id: 'autograd-hazards',
  title: 'Autograd state, detachment and in-place hazards',
  scene: 'autograd-hazards',
  focus: 'ops',
  slide: `## What autograd remembers

Autograd records operations on tensors that **require gradients**, and saves what each one needs for backward.

### Controlling the record
- \`requires_grad=True\` makes a **leaf**: its gradient accumulates in \`.grad\`
- \`.detach()\` gives the same values with **no gradient path**: a target from a frozen teacher
- \`torch.no_grad()\` records nothing — chapter 4 contrasts it with evaluation mode
- Only operations on tensors that require gradients are **recorded**

### Hazards
- Modifying a **saved** tensor in place, such as \`h.mul_(2)\`, makes backward raise an error
- Bypassing that check gives **wrong** gradients instead
- \`.data\` and \`.numpy()\` silently leave the graph
- A tensor that should get a gradient but shows \`.grad is None\` was **cut** somewhere`,
  narration:
    "Autograd works by recording. Whenever an operation involves a tensor that requires gradients, it adds a node to the graph and saves whatever that operation will need during backward; sigmoid, for instance, saves its own output. Parameters are leaves: tensors created with requires grad set, whose gradients accumulate in their grad attribute. You control the record in a few ways. Detach returns a tensor with the same values and no gradient path, which is exactly what you want for a target produced by a frozen teacher model: you use its numbers, but no gradient should flow into it. The no-grad context records nothing at all inside its block, which saves memory when you only need predictions. The hazards come from changing tensors behind autograd's back. In the code, sigmoid saved its output h, and then h is doubled in place. When backward runs, the value it saved has changed, and PyTorch raises an error rather than compute a wrong gradient. Code that bypasses this check, for example by editing the data attribute, gets wrong gradients silently. Converting to NumPy also leaves the graph. And a parameter whose grad is still None after backward was cut off from the loss somewhere.",
}
