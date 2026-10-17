import type { Scene } from '@graphlearning/flow'
import { embeddings } from './embeddings'
import { sequenceTasks } from './sequence-tasks'
import { shiftedTargets } from './shifted-targets'
import { rnnState } from './rnn-state'
import { bptt } from './bptt'
import { lstm } from './lstm'
import { bidirectional } from './bidirectional'
import { teacherForcing } from './teacher-forcing'

// Chapter 7 — Sequences, Embeddings, and Recurrent Memory. Spread into src/scenes/index.ts.
export const recurrentScenes: Scene[] = [embeddings, sequenceTasks, shiftedTargets, rnnState, bptt, lstm, bidirectional, teacherForcing]
