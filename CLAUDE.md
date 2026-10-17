# CLAUDE.md — deep-learning

The GraphL concept app for **Neural Networks and Deep Learning**, served at `graphl.in/deep-learning/`.
Scaffolded from `schemabotview/content-repo-template`, with the density tooling and authoring lessons
carried over from `schemabotview/machine-learning`. The workspace-level `CLAUDE.md` holds the
invariants that span every repo; this file is only what is true *here*.

## What this repo is

One concept, 13 courses, 95 sections. A **section** is `(scene, slide, narration)` and is one segment
of the course video. One section = one slide. The syllabus is
`NEURAL-NETWORKS-AND-DEEP-LEARNING-COURSE-PLAN.md` — the source of scope, ordering and ownership.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (`flow@^1.2.0`, `shell@^0.8.0`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Route contract and course ids

Routes are `#/<courseId>-<sectionId>`; `#/` is the catalog. Course ids are fixed — they are route
prefixes, audio folders (`public/audio/<courseId>/`) and `scripts/titles.json` keys:

| ch | course id | title | sections |
| --- | --- | --- | --- |
| 1 | `tensors` | Neural Functions, Tensors, and Representations | 7 |
| 2 | `feedforward` | Feedforward Networks and Objectives | 7 |
| 3 | `backprop` | Backpropagation and Automatic Differentiation | 8 |
| 4 | `training` | Training, Optimisation, and Reproducibility | 8 |
| 5 | `generalisation` | Generalisation and Neural Evaluation | 8 |
| 6 | `convolution` | Convolution, Residual Blocks, and Normalisation | 8 |
| 7 | `recurrent` | Sequences, Embeddings, and Recurrent Memory | 8 |
| 8 | `attention` | Attention Mechanisms | 6 |
| 9 | `transformers` | Transformers and Sequence Objectives | 8 |
| 10 | `transfer` | Transfer and Self-Supervised Representation | 8 |
| 11 | `autoencoders` | Autoencoders and Reconstruction Learning | 6 |
| 12 | `compute` | Compute, Precision, and Efficient Execution | 7 |
| 13 | `design` | Integrated Neural Design and Handoff | 6 |

## Course conventions

- **Recurring examples**: a fictional workshop classifies product **defects from images** (classical
  baseline first); a separate **sensor-history** model carries causal sequence prediction; short
  **text fragments** carry token and mask mechanics. State batch/entity/temporal boundaries, feature
  availability, annotation uncertainty and label-preserving transformations.
- **Tiny computed traces**: forward/backward passes, attention weights, filter responses and memory
  estimates on screen are COMPUTED in the scene file from the stated weights or seeded data, so the
  slide and the frame cannot disagree. Hand-written figures are labelled illustrative.
- **Label the evidence**: training observation, validation evidence, or final-test result.
- **Framework**: PyTorch notation for code cards; no version-specific feature is essential.
- **Ownership**: derivations defer to the maths courses; general evaluation, calibration and
  responsible use to Machine Learning (refresh, don't repeat); delivery and monitoring to MLOps.

## Scene inventory

Each course adds a `src/scenes/<courseId>/` bundle; list its scenes here as it lands.

| course | scene id | shape | used by |
| --- | --- | --- | --- |
| `tensors` | `learned-features` | container of two nested routes → computed code card | §1 |
|  | `inductive-bias` | candidate table → 2×2 container | §2 |
|  | `tensor-shapes` | axis table → computed memory table → code card | §3 |
|  | `broadcasting` | computed broadcast table → permute/reshape table → code card | §4 |
|  | `batching` | computed padded batch table → 2×3 container | §5 |
|  | `task-boundaries` | contract table → 2×2 container | §6 |
|  | `shape-assertions` | module code card → computed shape trace | §7 |
| `feedforward` | `affine-collapse` | activation plot over computed collapse table | §1 |
|  | `xor` | equal-axis XOR plot over computed forward table | §2 |
|  | `depth-width` | computed parameter table → 2×2 container | §3 |
|  | `heads` | head/loss/target table → 2×2 container | §4 |
|  | `cross-entropy` | computed softmax/CE table → code card → 2×2 container | §5 |
|  | `stable-softmax` | computed overflow table → reduction table | §6 |
|  | `masked-loss` | computed masked-mean table → code card → 2×2 container | §7 |
| `backprop` | `chain-rule` | TB graph container ⟶ computed forward-values table | §1 |
|  | `layer-gradients` | computed backward-trace table → 2×2 container | §2 |
|  | `vjp` | LR gradient chain → computed VJP table → cost table → code card | §3 |
|  | `shared-weights` | nested two-use graph → computed contribution table → 3-leaf container | §4 |
|  | `batch-scaling` | per-example table → computed reduction table → 2-leaf container | §5 |
|  | `autograd-hazards` | code card → operations table → 2×2 container | §6 |
|  | `zero-grad` | computed .grad trace → loop code card → 2×2 container | §7 |
|  | `finite-difference` | computed gradcheck table → kink table | §8 |
| `training` | `training-loop` | loop code card → state table | §1 |
|  | `eval-nograd` | 2×2 switch table → layer table → code card | §2 |
|  | `checkpoints` | computed train/val curve + best marker over record table | §3 |
|  | `optimisers` | computed one-step update table → 2×2 container | §4 |
|  | `initialisation` | computed activation-spread plot over symmetry table | §5 |
|  | `schedules` | computed warmup-cosine plot → clipping table → 4-leaf row | §6 |
|  | `seeds` | seed code card → runs table → 3-leaf container | §7 |
|  | `resume` | resume-spike plot over failure table | §8 |

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

**Measure it**: with `npm run dev` running, `npm run density [-- <courseId>] [--strict]` drives every
route in capture mode at 1920×1080 and prints slide / binding-axis / area ratios with flags, plus a
screenshot per route in `.tmp/density/`. `npm run check` also *warns* (does not fail) on a slide
modelled under 865px. Rendered slide height runs ~0.95–1.0× the modelled figure — author to
~920–990 modelled to land at 85–92 % on screen.

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it for tall boards that touch the eyebrow —
the engine default is already ~0.12, so 0.12 is a no-op here; 0.17 is the value that moves a board.

Learned in the machine-learning repo: an edge into a nested container's *card* is drawn across that container's
header — target the container instead. A wide board (one long LR row) loses area; restack it into
columns. Tables render small, so give them a companion node rather than standing alone.

Learned in the machine-learning repo: author slides to ~950–990 modelled from the first draft — rendered height
runs 0.88–1.0× the model (lower for bold- and symbol-heavy slides), and the 1000 cap is a hard
failure, so trim with one-line bullets rather than dropping a block. Prefer TB stacks: a code card or
table beside a tall stack shrinks to illegible. For an equal-axis plot that binds on height, widen its
x-range rather than lowering padding (lower padding pushes it under the eyebrow). Plot geometry that
a slide quotes (neighbours, support vectors, tube violations) is COMPUTED in the scene file from the
seeded points in `src/scenes/points.ts`, never typed in, so slide and frame cannot disagree.

These are read off the rendered route by eye — `check` models no density at all. The two ratios come
from one repo's ~80 frames of diagram-and-code-card boards, so a deliberately sparse board can sit
under them. Targets, not thresholds.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
```

All three are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
