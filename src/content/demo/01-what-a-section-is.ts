import type { Section } from '../types'

// A section is the atomic unit of a video: (scene, slide, narration). One section = one slide.
// `scene` names a scene id from src/scenes; `focus` optionally lights ONE node in it — and a focus
// that names no node in that scene is a silent no-op, which is why `npm run check` guards it.
export const whatASectionIs: Section = {
  id: 'what-a-section-is',
  title: 'What a section is',
  scene: 'section-parts',
  focus: 'section',
  slide: `## What a section is

A **section** is the atomic unit. One section is one slide, one scene and one narration clip — and also one segment of the course video.

### The three parts
- **Scene** — the left pane: a diagram or a code card
- **Slide** — the right pane: markdown, for the eye
- **Narration** — the spoken script, for the ear

### The rule that holds it together
- The markdown here is the **source of truth** for both
- The slide is **terse**; the narration is **flowing prose**
- Neither is generated from the other at build time — both are authored, and both stay derived from the same idea`,
  narration:
    "A section is the smallest thing worth authoring, and it is deliberately small. One section is one slide on the right, one scene on the left, and one narration clip spoken over the pair. That same section is also exactly one segment of the finished course video, which is why the boundary matters. Now, the two text surfaces are not the same text. The slide is for the eye, so it is terse, and it lives inside a frame that does not scale to fit, which means an over-long slide simply clips at the bottom. The narration is for the ear, so it is flowing prose with none of the bullet-point compression. Both come from the same markdown source, and keeping them derived from one source is the thing that stops the two halves of a section from drifting apart.",
}
