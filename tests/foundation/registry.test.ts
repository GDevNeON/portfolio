// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { sceneRegistry, routeOrder } from '../../src/foundation/config/sceneRegistry'

describe('source registry', () => {
  it('retains exact route and nine unique pending worlds', () => {
    expect(routeOrder).toEqual(['A02', 'A03', 'A04', 'A05', 'A08', 'A06', 'A01', 'A09', 'A07'])
    expect(new Set(sceneRegistry.map(s => s.filename)).size).toBe(9)
    expect(sceneRegistry.every(s => s.status === 'pending' && s.creditedArtist === null && s.title === null)).toBe(true)
  })
})
