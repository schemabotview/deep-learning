import type { Section } from '../types'

export const buffers: Section = {
  id: 'buffers',
  title: 'Parameter freezing versus buffer changes',
  scene: 'buffers',
  focus: 'drift',
  slide: `## Frozen is not unchanged

requires_grad = False stops **gradient** updates. It does not stop **BatchNorm** updating its running statistics while the model is in train() mode.

### The drift, one channel
- Source running mean **0.0**; every target batch has mean **0.6**; momentum 0.1
- After 1 batch: **0.060**; after 10: **0.391**; after 50: **0.597**
- γ never moved and has no gradient, yet the layer now normalises **differently**

### What freezing does not cover
- **Buffers** (BatchNorm statistics) and **dropout** still change in train()

### Freezing both
- Put the BatchNorm modules in **eval()** after model.train()
- Or **adapt** them deliberately, and record it
- Check: compare named_buffers() before and after an epoch`,
  narration:
    "Freezing a network by switching off gradients stops its weights from being updated by the optimiser. It does not stop batch normalisation from changing. In training mode, every batch norm layer keeps updating its running mean and variance from the batches it sees, whatever requires grad says. Here is one channel. The source data left its running mean at zero. Every target batch has a mean of nought point six, and the momentum is nought point one. After one batch the running mean is nought point nought six. After ten it is nought point three nine, and after fifty it is nought point five nine seven, almost entirely the target's statistics. The scale parameter gamma never moved and has no gradient, yet the layer now normalises differently, so the body you thought was frozen is not the body you probed. Two other pieces of state behave the same way. Dropout is still active in training mode, and optimiser state exists only for the parameters you passed in. The fix is to put the batch norm modules back into evaluation mode after calling train on the model. Or adapt the statistics deliberately, and record that choice. Either way, check by comparing the named buffers before and after an epoch.",
}
