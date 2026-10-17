import type { Section } from '../types'

export const broadcasting: Section = {
  id: 'broadcasting',
  title: 'Broadcasting, reshaping and indexing',
  scene: 'broadcasting',
  focus: 'pairwise',
  slide: `## Shapes that run but lie

Most shape mistakes raise an error. The dangerous ones **run** and return a wrong number.

### Accidental broadcasting
- Broadcasting stretches size-1 axes so shapes match: useful, and silent
- Predictions [3, 1] minus targets [3] become a **[3, 3]** matrix of every pair
- Perfect predictions then score an "MSE" of **1.33** instead of 0
- Fix: make the shapes **identical** before the loss, and assert it

### Permute versus reshape
- \`permute\` moves axes and keeps each pixel's channels together
- \`reshape\` only reinterprets the memory order: pixel (0, 1) gets **[3, 4]**, not [2, 20]
- Matrix products need the shared axis to match: [N, 12,288] @ [12,288, 32]`,
  narration:
    "Most shape mistakes stop the program with an error, which is the good case. The dangerous ones run, and quietly return the wrong number. The first is accidental broadcasting. Broadcasting is the rule that lets a tensor with a size-one axis be stretched to match another, which is genuinely useful, for example to add a bias to every row. But suppose a model outputs predictions with shape three by one, and the targets have shape three. Subtracting them does not pair each prediction with its own target; it broadcasts to a three-by-three matrix comparing every prediction with every target. The table computes it. The predictions here are perfect, so the true mean squared error is zero, but the broadcast version averages all nine pairs and reports one point three three. Nothing crashes. The fix is to make the shapes identical before computing the loss, and to assert that they are. The second mistake is using reshape when you mean permute. Moving channels to the last axis with permute keeps each pixel's channel values together. Reshape only reinterprets the same memory in a new shape, so pixel nought, one ends up with values three and four, which belong to different pixels.",
}
