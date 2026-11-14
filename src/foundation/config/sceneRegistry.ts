import type { SceneDefinition, SceneId } from './types'
import manifest from './source-manifest.json'

export const routeOrder: SceneId[] = ['A02', 'A03', 'A04', 'A05', 'A08', 'A06', 'A01', 'A09', 'A07']
export const sceneRegistry: SceneDefinition[] = routeOrder.map(sourceId => ({
  sourceId, filename: manifest.sources.find(s => s.sourceId === sourceId)!.filename,
  title: null, creditedArtist: null, sourceUrl: null, permission: null,
  comparisonCameras: [], contentAnchors: [], assetIds: [], motionProfile: 'pending', status: 'pending',
}))
