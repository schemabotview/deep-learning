# deep-learning

The **Neural Networks and Deep Learning** concept app on GraphL — 13 courses, 95 sections, from
differentiable computation to justified architecture choices. Served at `graphl.in/deep-learning/`.

The syllabus is [`NEURAL-NETWORKS-AND-DEEP-LEARNING-COURSE-PLAN.md`](NEURAL-NETWORKS-AND-DEEP-LEARNING-COURSE-PLAN.md).
The repo was scaffolded from [`schemabotview/content-repo-template`](https://github.com/schemabotview/content-repo-template).

```sh
npm install
npm run dev          # http://localhost:5173
```

## The content model

- **concept ⊃ course ⊃ section.** A section is `(scene, slide, narration)` — one slide, one video
  segment. Left = scene (a react-flow diagram, plot, table or code card), right = slide (markdown).
- **Scenes are declarative** — nodes, edges, nesting. Never write x or y.
- Narration wavs come from the Colab + Chatterbox pass (`scripts/colab_generate_audio.ipynb`) into
  `public/audio/<course>/<section-id>.wav`, never by hand.

```
src/content/    courses → sections (one file per section) + registry
src/scenes/     hand-authored scenes + registry; points.ts = seeded data helpers
src/main.tsx    mounts <ConceptApp> from @graphlearning/shell
src/theme.css   --brand / --brand-hover / --accent-2
scripts/        check-content.mjs · density.mjs · colab notebook · concept.json · titles.json
public/audio/<course>/    narration wavs
```

## Verifying a change

```sh
npm run build && npx tsc --noEmit && npm run check
```

With `npm run dev` running, `npm run density` measures every frame against the density targets in
`CLAUDE.md` and writes a screenshot per route to `.tmp/density/`.

…and the section looked at in the browser — the commands pass on frames that are visually wrong.
Routes are `#/<course>-<section>`. `#/` is the catalog.
