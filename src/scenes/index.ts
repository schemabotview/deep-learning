import type { Scene } from '@graphlearning/flow'
import { tensorsScenes } from './tensors'
import { feedforwardScenes } from './feedforward'
import { backpropScenes } from './backprop'
import { trainingScenes } from './training'
import { generalisationScenes } from './generalisation'
import { convolutionScenes } from './convolution'
import { recurrentScenes } from './recurrent'
import { attentionScenes } from './attention'
import { transformersScenes } from './transformers'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...tensorsScenes, ...feedforwardScenes, ...backpropScenes, ...trainingScenes, ...generalisationScenes, ...convolutionScenes, ...recurrentScenes, ...attentionScenes, ...transformersScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
