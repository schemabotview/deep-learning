# Neural Networks and Deep Learning — From Differentiable Computation to Justified Architecture Choices

## Audience and prerequisites

For learners comfortable with basic Python and array notation and the core workflow in [Machine Learning](MACHINE-LEARNING-COURSE-PLAN.md): prediction tasks, training/validation/test boundaries, losses, regularisation, metrics, and leakage prevention. No prior neural-network framework experience is assumed.

Relevant foundations come from [Linear Algebra](LINEAR-ALGEBRA-COURSE-PLAN.md) (vectors, matrices, shapes, projections), [Calculus and Optimisation](CALCULUS-AND-OPTIMISATION-COURSE-PLAN.md) (chain rule, gradients, Jacobians, objectives and update reasoning), and [Probability and Statistics](PROBABILITY-AND-STATISTICS-COURSE-PLAN.md) (conditional models, expectation, likelihood, sampling and uncertainty). Refresh local notation and explain cross-entropy when first needed rather than duplicating those courses. A tensor here is a multidimensional numerical array; abstract tensor-product theory is not required.

Scope: Tensor-based neural computation, objectives/backpropagation, training/gradient flow, generalisation, convolution/residual networks, recurrent sequences, attention/transformers, transfer/self-supervised/reconstruction representations, compute reasoning, and integrated design. Full generative-model mechanisms are deferred.

Target capability: trace forward/backward computations; express a small neural training/evaluation workflow; explain major architecture mechanisms; diagnose numerical/data/optimisation failures; and justify a model, objective, and evaluation protocol under explicit assumptions. Worked demonstrations support these capabilities without claiming assessed learner mastery.

Structure: **13 chapters, 95 sections**, distributed **7, 7, 8, 8, 8, 8, 8, 6, 8, 8, 6, 7, 6**. Counts reflect coherent learning milestones, not equal duration.

Sources checked on **2026-10-14**. Retrieved Dive into Deep Learning pages identify 1.0.3 and PyTorch pages/tutorials identify 2.14/2.14.0+cu130. These record the documents observed, not an installed, pinned, or tested environment. Exact release/device/dtype, framework conventions, and randomisation settings must be recorded when executable illustrations are developed; no version-specific feature is essential to the conceptual spine.

## Learning spine

Neural Functions, Tensors, and Representations → Feedforward Networks and Objectives → Backpropagation and Automatic Differentiation → Training, Optimisation, and Reproducibility → Generalisation and Neural Evaluation → Convolution, Residual Blocks, and Normalisation → Sequences, Embeddings, and Recurrent Memory → Attention Mechanisms → Transformers and Sequence Objectives → Transfer and Self-Supervised Representation → Autoencoders and Reconstruction Learning → Compute, Precision, and Efficient Execution → Integrated Neural Design and Handoff.

Progression rationale: Tensor/representation and feedforward/objective stages are unified before backpropagation. Training/optimisation and neural diagnostics share established ML evaluation assumptions. Convolution/residual blocks, sequence/recurrent memory, and transfer/self-supervision each become a coherent architecture milestone. Attention and transformers remain separate because the latter depends on the former.

Recurring example: a fictional workshop classifies product defects from images, beginning with classical baselines and progressing to learned representations. A separate sensor-history model illustrates causal sequence prediction and text fragments illustrate token/mask mechanisms. These tasks share teaching continuity, not a claim that every architecture should solve the same dataset. State batch/entity/temporal boundaries, feature availability, annotation uncertainty, and label-preserving transformations. Tiny numerical/synthetic cases make forward/backward and attention calculations inspectable.

Teaching method: motivating task/assumptions → shape and objective contract → mechanism/derivation → worked numerical or code trace → evaluation/diagnostics → failure contrast → outcome → bridge. Use annotated code, expected tensors, graph/architecture diagrams, parameter/memory calculations, supplied learning curves, and contrasting cases. Running examples is optional. No submitted exercises, assessments, learner monitoring, executable lessons, model downloads/training runs, applications, or deployments are delivered.

Course ownership: Mathematical derivations belong to the relevant mathematics plan; probability/inference and experiment theory to Probability and Statistics; general predictive/discovery evaluation to Machine Learning; neural computations and training-state behaviour to Neural Networks and Deep Learning; operational contracts, delivery, monitoring, and retraining to ML Engineering and MLOps. A local refresher or domain-specific failure case is intentional overlap, not a second full treatment.

## Chapter 1 — Neural Functions, Tensors, and Representations

Objective: Explain what neural networks learn and when their structure is useful. Interpret neural computations through tensor shapes, storage, and valid data preparation.

1. Parameterised functions and learned features
2. Inductive bias and classical-baseline comparison
3. Tensor axes, shapes, dtypes, and devices
4. Broadcasting, matrix products, reshaping, and indexing
5. Batching, padding, and data contracts
6. Neural task/objective and prediction-time boundaries
7. Framework notation and shape assertions

Worked illustrations: Compare a workshop-image neural baseline and a small tensor trace; contrast a needed axis permutation with reshaping and expose an accidental pairwise broadcast loss.

Outcome: Explain representation learning and justify a neural approach as a hypothesis requiring evidence. Predict tensor shapes and explain a valid batching/preparation contract, including common silent failures.

Bridge: Tensor contracts support explicit feedforward computations and compatible losses.

## Chapter 2 — Feedforward Networks and Objectives

Objective: Construct and explain multilayer computations with nonlinear hidden representations. Match neural outputs to objectives and avoid unstable or incorrectly scaled calculations.

1. Affine units, nonlinear activations, and composition
2. Forward passes, parameter counts, and XOR
3. Depth/width and expressivity-versus-learnability
4. Regression, binary, multiclass, and multilabel heads
5. Logits, cross-entropy, and likelihood contracts
6. Stable softmax/log-sum-exp and reduction conventions
7. Weighted/masked/multihead losses and evaluation metrics

Worked illustrations: Calculate a tiny network and logits loss; show affine-stack collapse and padded-token loss contamination. Universal approximation does not guarantee useful training.

Outcome: Trace a forward pass, select a compatible output head, and explain the role and limits of nonlinear composition. Explain an objective's probabilistic/task meaning and identify incompatible outputs, targets, reductions, or numerical formulas.

Bridge: Backpropagation differentiates the specified forward objective.

## Chapter 3 — Backpropagation and Automatic Differentiation

Objective: Derive reverse-mode gradients and distinguish derivative calculation from parameter optimisation.

1. Graphs, local derivatives, and the chain rule
2. Affine/activation weight and bias gradients
3. Reverse accumulation and vector–Jacobian products
4. Shared/branched parameter contributions
5. Batch/reduction scaling
6. Autograd state, detachment, and in-place hazards
7. Clearing versus intentionally accumulating gradients
8. Finite-difference checks and nondifferentiable points

Worked illustrations: Perform a full two-layer forward/backward trace and a shared-weight example; compare supplied autograd and finite-difference values away from activation kinks.

Outcome: Derive elementary gradients, trace reverse accumulation, and diagnose missing, stale, or incorrectly scaled gradients.

Bridge: Gradients need a training loop and suitable initialisation/update rules.

## Chapter 4 — Training, Optimisation, and Reproducibility

Objective: Explain the state changes and evaluation boundaries of a complete neural training run. Explain common neural-training failures and compare remedies under stated assumptions.

1. Model/buffer/optimiser state and the training loop
2. Evaluation mode versus disabling gradient recording
3. Validation, checkpoint selection, and protected tests
4. SGD/momentum, Adam, and decoupled weight decay
5. Initialisation, symmetry, and gradient propagation
6. Schedules, clipping, and numerical diagnostics
7. Seeds, environment recording, and repeatability limits
8. Resume-state and optimiser-versus-generalisation failures

Worked illustrations: Trace a missing gradient-clear error, distinguish eval from no-grad, and compare identical-unit initialisation with useful symmetry breaking. Adam-style L2 and decoupled decay are not interchangeable.

Outcome: Trace a training run, explain its state and evaluation boundaries, and distinguish repeatability controls from universal determinism. Explain optimiser/initialisation mechanisms, recognise gradient-flow failures, and justify a targeted remedy.

Bridge: Good training fit still needs neural-specific generalisation evidence.

## Chapter 5 — Generalisation and Neural Evaluation

Objective: Reason about generalisation without treating neural heuristics as guarantees. Evaluate neural-model behaviour using targeted diagnostics and explicit use boundaries.

1. Capacity, sample size, label noise, and learning curves
2. Dropout, weight penalties, and early stopping
3. Label-preserving augmentation and shortcut risks
4. Architecture/training search under declared budgets
5. Tiny-subset, activation, and gradient diagnostics
6. Classical baselines, ablations, and seed variation
7. Calibration, subgroup errors, and distribution shift
8. Responsible interpretation and documented limits

Worked illustrations: Contrast valid image transformations with a label-changing augmentation and background shortcut. Use ML’s established evaluation theory; here diagnose neural-specific failures rather than repeat it.

Outcome: Explain a regularisation/augmentation choice and assess a neural comparison using appropriate evidence. Explain diagnostic evidence, recognise shortcuts and uneven errors, and state supported reliability claims and remaining limits.

Bridge: Spatial inductive bias introduces parameter sharing and deep blocks.

## Chapter 6 — Convolution, Residual Blocks, and Normalisation

Objective: Explain convolutional computation and its geometric assumptions. Explain why architectural blocks help deep networks while retaining their limitations.

1. Locality, sharing, and cross-correlation conventions
2. Channels, filters, parameter counts, and output shapes
3. Stride/padding/dilation and receptive fields
4. Pooling/downsampling and invariance limits
5. Residual connections and shape projections
6. Batch normalisation and running statistics
7. Layer normalisation and axis/order choices
8. Depth/resource comparisons and 1D convolution

Worked illustrations: Compute a filter response and residual projection; compare batch/layer normalisation axes and training/evaluation behaviour. Practical boundaries/strides limit translation invariance.

Outcome: Trace CNN computations and justify spatial parameter sharing, dimensions, and downsampling trade-offs. Explain residual/normalisation computations and diagnose state, shape, and architectural comparison failures.

Bridge: Ordered inputs motivate recurrent state and different visibility contracts.

## Chapter 7 — Sequences, Embeddings, and Recurrent Memory

Objective: Represent ordered data and define sequence objectives without leaking future information. Explain recurrent computation and its training/resource trade-offs.

1. Token/continuous sequences, vocabularies, and embeddings
2. Sequence/task types and information availability
3. Shifted autoregressive targets and valid-length masks
4. Recurrent state and shared time parameters
5. Backpropagation through time and truncation
6. LSTM/GRU gate mechanisms
7. Bidirectionality, state leakage, and batching
8. Teacher forcing, temporal evaluation, and long-range failures

Worked illustrations: Trace a short state/gate sequence and masked next-token loss; contrast complete-sequence classification with causal forecasting and detach state at justified truncation boundaries.

Outcome: Specify an ordered-data contract and compatible objective, masks, and evaluation boundary. Explain recurrent/gated mechanisms and justify state, gradient, and visibility choices.

Bridge: Attention offers an alternative to a single recurrent context state.

## Chapter 8 — Attention Mechanisms

Objective: Explain attention computations, masking, and the limits of their interpretation.

1. Queries, keys, values, and weighted aggregation
2. Additive/scaled dot-product scores
3. Softmax, padding/causal masks, and all-masked failure
4. Self-attention and cross-attention
5. Multi-head shapes and position information
6. Pairwise compute/memory and interpretation limits

Worked illustrations: Calculate a small masked QKᵀ/√d aggregation. Attention weights alone do not establish causal feature importance.

Outcome: Trace attention with valid masks and shapes and explain its information and computational assumptions.

Bridge: Transformers organise attention and position-wise computation into a full architecture.

## Chapter 9 — Transformers and Sequence Objectives

Objective: Explain transformer blocks and distinguish architectural masks from learning objectives.

1. Attention/feedforward/residual/normalisation blocks
2. Position representations and permutation structure
3. Encoder, decoder, and encoder–decoder patterns
4. Causal/bidirectional/cross-attention visibility
5. Masked and next-token objectives
6. Parallel training versus sequential generation
7. Caching, decoding choices, and context cost
8. Pretraining loss versus task/factual reliability

Worked illustrations: Trace one compact transformer block, compare two visibility masks, and explain why cached generation still has growing context memory.

Outcome: Explain transformer computation, masking, objectives, and basic inference trade-offs without conflating architectures with applications.

Bridge: Pretrained and self-supervised representations can be transferred under new evaluation assumptions.

## Chapter 10 — Transfer and Self-Supervised Representation

Objective: Choose a bounded adaptation strategy and assess whether pretrained knowledge transfers. Explain how training signals and view construction shape learned representations.

1. Source/target objectives and negative transfer
2. Frozen features, probes, and head replacement
3. Partial/full fine-tuning and layer-specific rates
4. Parameter freezing versus buffer changes
5. Masked/predictive/contrastive training signals
6. Positive views, false negatives, and collapse
7. Probe/fine-tune evaluation and contamination
8. Provenance, data suitability, and bounded adaptation choices

Worked illustrations: Compare frozen and fine-tuned encoders, then inspect positive views that remove a defect. Not all self-supervised methods need negatives; freezing weights may leave normalisation state changing.

Outcome: Explain and justify an adaptation strategy and its provenance, evaluation, and state-management requirements. Explain a self-supervised signal and assess whether its assumptions and evaluation support useful transfer.

Bridge: Reconstruction supplies a distinct representation objective.

## Chapter 11 — Autoencoders and Reconstruction Learning

Objective: Explain reconstruction-based representation learning and its relationship to linear projections.

1. Encoder/bottleneck/decoder and reconstruction loss
2. Linear autoencoder–PCA relationship and qualifications
3. Denoising, sparsity, and copying shortcuts
4. Latent representations versus downstream usefulness
5. Reconstruction diagnostics and anomaly limitations
6. Deterministic versus probabilistic latent-model orientation

Worked illustrations: Trace a small reconstruction and compare linear squared-loss subspaces with PCA without requiring equal axes; a model can reconstruct an anomalous input well. Full VAE/ELBO/generative objectives are deferred.

Outcome: Explain an autoencoder objective, compare reconstruction with downstream usefulness, and recognise limits of latent and anomaly interpretation.

Bridge: All representations must operate within numerical and resource constraints.

## Chapter 12 — Compute, Precision, and Efficient Execution

Objective: Explain neural computation costs and optimise resources using measurements and semantic checks.

1. Parameter/activation/gradient/optimiser memory
2. Dtype/autocast/scaling and numerical failure
3. Microbatch accumulation and batch-dependent semantics
4. Checkpoint/recomputation trade-offs
5. Profiling, transfer, and synchronisation
6. Measured quality–resource comparisons
7. Compression/parallelism boundaries and specialist handoff

Worked illustrations: Estimate memory, inspect supplied profile output, and compare accumulation with batch-normalised large-batch training. Precision changes require correctness checks, not universal speedup claims.

Outcome: Explain a resource bottleneck and justify a bounded efficiency change with correctness and measurement evidence.

Bridge: Combine architecture, training, evaluation, and resource evidence for handoff.

## Chapter 13 — Integrated Neural Design and Handoff

Objective: Justify a complete neural modelling approach and distinguish offline evidence from operational readiness.

1. Task/architecture/objective rationale and baseline
2. Training/evaluation configuration and evidence
3. Quality, failure, robustness, and resource comparison
4. Checkpoint, preprocessing/tokeniser, and inference-state contract
5. Unresolved limitations and engineering handoff
6. Continued architecture/application practice

Worked illustrations: Compare a dense, convolutional, and transferred defect predictor with declared budgets and splits. Keep sensor-sequence evidence separate and pass deployment/monitoring implementation to MLOps.

Outcome: Justify a neural-model recommendation from explicit evidence and identify the engineering and domain questions remaining before use.

Bridge: Continue with unfamiliar examples and reasoned implementation practice; use the companion courses for the named specialist and operational depth.

## Sources and scope

Goodfellow, Bengio, and Courville's [Deep Learning (2016), contents](https://www.deeplearningbook.org/contents/TOC.html) provides a mathematical/architecture scope cross-check; chapter text was not accessible in this research. Zhang, Lipton, Li, and Smola's [Dive into Deep Learning](https://d2l.ai/chapter_preface/index.html) provides the worked-computation and architecture teaching comparison through selected sections, including [backpropagation](https://d2l.ai/chapter_multilayer-perceptrons/backprop.html), [initialisation](https://d2l.ai/chapter_multilayer-perceptrons/numerical-stability-and-init.html), [convolution](https://d2l.ai/chapter_convolutional-neural-networks/conv-layer.html), [recurrence](https://d2l.ai/chapter_recurrent-neural-networks/bptt.html), and [transformers](https://d2l.ai/chapter_attention-mechanisms-and-transformers/transformer.html). Neither book was read in full.

Official PyTorch [autograd](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html), [optimisation](https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html), [saving/loading](https://docs.pytorch.org/tutorials/beginner/saving_loading_models.html), [reproducibility](https://docs.pytorch.org/docs/2.14/notes/randomness.html), and [mixed-precision](https://docs.pytorch.org/docs/2.14/notes/amp_examples.html) guidance supplies the selected implementation contract. Original-paper abstracts for residual learning, attention, decoupled weight decay, contrastive learning, variational autoencoders, GANs, and diffusion inform mechanisms and boundaries; full papers/benchmarks were not audited. Direct links and inspection limits are recorded with the coverage map in [README.md](../README.md).

Specialist exclusions: exhaustive vision/detection/segmentation and NLP curricula; modern foundation-model training/post-training and alignment; full generative-model derivations/applications; reinforcement learning; graph neural networks, geometric/scientific neural methods, and neural differential equations; advanced Bayesian neural theory; hardware kernels/compiler implementation; distributed-training infrastructure and production service implementation. Adapters/low-rank adaptation, attribution, compression/distillation, and augmentation-method catalogues are deferred; parallelism remains a resource boundary only.

Intentional overlap: ML supplies general evaluation, calibration, interpretation, and responsible-use reasoning; this course adds neural mechanisms, state, objectives, architecture assumptions, and failure modes. Calculus supplies derivative/optimisation theory; backpropagation and neural update behaviour apply it here. ML Engineering/MLOps owns delivery, infrastructure, operational monitoring, and retraining systems; this plan specifies handoff requirements without implementing them.


Scope refinement checked on **2026-10-14**: GAN/diffusion/autoregressive-generation family surveys, VAE/ELBO derivations, adapters/LoRA, mixup/smoothing catalogues, adversarial/attribution algorithms, distillation/pruning and distributed implementations are deferred. Basic autoregressive sequence objectives remain because they explain transformer training. Preserve neural-specific gradient, state, masking, shape, and generalisation failures; do not repeat general statistical evaluation theory. Earlier source inspections are retained as research evidence, including sources for topics now deferred; a retained citation does not imply core coverage.
