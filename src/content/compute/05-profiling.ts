import type { Section } from '../types'

export const profiling: Section = {
  id: 'profiling',
  title: 'Profiling, transfer, and synchronisation',
  scene: 'profiling',
  focus: 'profile',
  slide: `## Reading a profile

Before optimising, find out where the time goes. This supplied profile of one 92 ms training step says the model is not the bottleneck.

### What the rows say
- The DataLoader takes **61 ms**, two thirds of the step
- The GPU is busy for **34.2 ms**: **37%** utilisation
- loss.item() costs **9.4 ms**: it forces the CPU to **wait** for the GPU

### Fixes, one at a time
- **num_workers=4** decodes images in parallel with training
- **pin_memory** with non_blocking copies overlaps transfer with compute
- Log the loss every 50 steps, not .item() every step

### Then measure again
- Profile a few warm steps, not the first, which includes start-up
- Faster precision cannot help while the GPU **waits for data**`,
  narration:
    "Before changing anything for speed, find out where the time actually goes. This is a supplied profile of one training step, ninety-two milliseconds of wall time, and it says the model is not the bottleneck. The data loader takes sixty-one milliseconds, two thirds of the step, decoding and augmenting images on the main process while the accelerator sits idle. The accelerator is busy for only thirty-four milliseconds in total, about thirty-seven percent utilisation. The call to loss dot item costs another nine milliseconds. Not because reading one number is slow, but because it forces the CPU to wait until every queued GPU operation has finished, a synchronisation point that stops the CPU from running ahead. The copy from host to device adds about four more. The fixes follow from the rows, and should go in one at a time. Four loader workers decode images in parallel with training. Pinned memory with non-blocking copies lets transfer overlap with compute. And logging the loss every fifty steps, rather than calling item every step, removes the forced wait. Then profile again, over a few warm steps rather than the first one, which includes start-up costs. Notice what would not have helped: switching to lower precision speeds up the accelerator, which here spends most of the step waiting for data.",
}
