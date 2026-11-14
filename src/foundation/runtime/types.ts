import type { SceneId } from '../config/types'

export type Quality = 'full' | 'low'
export type CameraPose = { position: [number, number, number]; target: [number, number, number] }
export type RuntimeSnapshot = {
  version: 1
  sceneId: SceneId
  cameraProgress: number
  cameraPose: CameraPose
  ambientSeconds: number
  quality: Quality
  paused: boolean
  reducedMotion: boolean
  loadPhase: 'transfer' | 'preparing' | 'ready' | 'error'
  readingAnchor: string | null
  completedItems: number
  totalItems: number
  error: string | null
}
