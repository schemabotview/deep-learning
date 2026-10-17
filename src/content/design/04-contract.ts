import type { Section } from '../types'

export const contract: Section = {
  id: 'contract',
  title: 'Checkpoint, preprocessing/tokeniser, and inference-state contract',
  scene: 'contract',
  focus: 'items',
  slide: `## The inference contract

Validation scores hold at inference only if the model runs **exactly** as it was evaluated. That takes more than a weights file.

### What travels with the weights
- The **state_dict**, BatchNorm buffers included, with its hash
- **model.eval()**: dropout off, running statistics used
- **Preprocessing**: resize to 224 and the checkpoint's own mean and std
- **Class order**: 0 ok, 1 scratch, 2 dent; a swap fails silently
- **Dtype**: bf16 autocast, as validated against fp32

### The same idea for the other models
- Text: the **tokeniser** vocabulary file, PAD 0, UNK 1
- Sensors: recurrent state **reset** per machine, and the masks used

### Enforce it at load time
- Check the hash, read preprocessing and classes from the checkpoint`,
  narration:
    "A validation score only holds at inference if the model runs exactly as it was evaluated, and that takes more than a file of weights. The contract lists everything that must travel with it. First, the state dictionary, including the batch norm buffers, with a hash so the exact file can be verified. Second, the mode: the model must be in evaluation mode, so dropout is off and batch norm uses its stored running statistics rather than the statistics of whatever batch arrives. Third, the preprocessing: resizing to two hundred and twenty-four pixels and normalising with the mean and standard deviation stored in the checkpoint, because a different normalisation shifts every feature. Fourth, the class order. If index one means scratch in training but dent in the inspection software, every prediction is silently wrong. And fifth, the dtype, here bf16 autocast, which was validated against fp32. The same idea applies to the course's other models. A text model needs its tokeniser vocabulary file, with padding at nought and unknown at one. A sensor model needs its recurrent state reset for each machine, and the same causal and padding masks it was trained with. Enforce the contract when the model is loaded: check the hash, and read the preprocessing and the class names from the checkpoint itself.",
}
