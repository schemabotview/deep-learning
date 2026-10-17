import type { Section } from '../types'

export const shapeAssertions: Section = {
  id: 'shape-assertions',
  title: 'Framework notation and shape assertions',
  scene: 'shape-assertions',
  focus: 'module',
  slide: `## Write the shapes down

In PyTorch a model is an \`nn.Module\`: layers in \`__init__\`, computation in \`forward\`.

### Reading the module
- \`fc1\` maps 12,288 inputs to 32 hidden features; \`fc2\` maps 32 to 3
- \`flatten(1)\` keeps the batch axis and flattens the rest
- \`forward\` returns **logits** — raw scores, no softmax — for the loss to handle
- Calling \`model(x)\` runs \`forward\` and any registered hooks

### Shape discipline
- A **comment** on every line states the shape it produces
- An **assertion** at each boundary turns a silent mismatch into an immediate error
- The trace: [32, 3, 64, 64] → [32, 12,288] → [32, 32] → [32, 3]
- Labels stay **[32]** int64, matching the logits' first axis`,
  narration:
    "This section sets up the notation used for the rest of the course. In PyTorch, a model is a module: its layers are created in the constructor, and the computation is written in the forward method. Our defect classifier has two linear layers. The first maps the twelve thousand two hundred and eighty-eight pixel values to thirty-two hidden features; the second maps those thirty-two features to three class scores. Flatten one keeps the batch axis and flattens everything after it into one long vector per image. The forward method returns logits, raw unnormalised scores, and deliberately does not apply a softmax; chapter two explains why the loss should do that. The habit worth adopting from day one is shape discipline. Put a comment on every line saying what shape it produces, and put assertions at the boundaries, so that a mismatch fails loudly at the point where it happens rather than surfacing later as a strange number. The table is the trace those comments promise: thirty-two images of three by sixty-four by sixty-four become thirty-two vectors of twelve thousand, then thirty-two hidden vectors of thirty-two, then thirty-two rows of three logits, lined up with thirty-two integer labels.",
}
