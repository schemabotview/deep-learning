import type { Course } from '../types'
import { embeddings } from './01-embeddings'
import { sequenceTasks } from './02-sequence-tasks'
import { shiftedTargets } from './03-shifted-targets'
import { rnnState } from './04-rnn-state'
import { bptt } from './05-bptt'
import { lstm } from './06-lstm'
import { bidirectional } from './07-bidirectional'
import { teacherForcing } from './08-teacher-forcing'

// Chapter 7 — ordered-data contracts, recurrent computation and its training trade-offs.
export const recurrent: Course = {
  id: 'recurrent',
  title: 'Sequences, Embeddings, and Recurrent Memory',
  sections: [embeddings, sequenceTasks, shiftedTargets, rnnState, bptt, lstm, bidirectional, teacherForcing],
}
