export type SceneId = 'A01' | 'A02' | 'A03' | 'A04' | 'A05' | 'A06' | 'A07' | 'A08' | 'A09'
export type SceneDefinition = {
  sourceId: SceneId
  filename: string
  title: string | null
  creditedArtist: string | null
  sourceUrl: string | null
  permission: string | null
  comparisonCameras: { id: 'overall' | 'subject' | 'addition'; position: [number, number, number] }[]
  contentAnchors: { id: string; position: [number, number, number] }[]
  assetIds: string[]
  motionProfile: string
  status: 'pending' | 'study' | 'implemented'
}
