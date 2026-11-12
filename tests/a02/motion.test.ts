import { describe, expect, it } from 'vitest'
import { advanceProgress, inputTarget, nearestView } from '../../src/a02/motion'

describe('A02 bounded camera travel', () => {
  it('bounds large wheel bursts instead of accumulating a long forced flight', () => {
    let target = 0.4
    for (let i = 0; i < 1000; i++) target = inputTarget(0.4, target, 100000)
    expect(target).toBeCloseTo(0.445)
    let progress = 0.4
    for (let i = 0; i < 90; i++) progress = advanceProgress(progress, target, 1 / 60)
    expect(target - progress).toBeLessThan(0.0001)
  })
  it('responds to reverse input without playing queued forward movement', () => {
    expect(inputTarget(0.4, 0.445, -80)).toBeLessThan(0.4)
  })
  it('limits camera speed and never overshoots on slow frames', () => {
    const next = advanceProgress(0.3, 1, 2)
    expect(next).toBeLessThanOrEqual(0.306)
    expect(advanceProgress(0.99999, 1, 0.016)).toBe(1)
    expect(advanceProgress(0.5, 0.4, -1)).toBe(0.5)
  })
  it('keeps wheel input within the path and ignores nonfinite input', () => {
    expect(inputTarget(0.99, 0.99, 1000)).toBe(1)
    expect(inputTarget(0.01, 0.01, -1000)).toBe(0)
    expect(inputTarget(0.4, 0.42, Infinity)).toBe(0.42)
  })
  it('selects stable viewpoints for reduced motion', () => {
    expect(nearestView(0.36)).toBe(1)
    expect(nearestView(0.71)).toBe(2)
    expect(nearestView(1)).toBe(3)
  })
})
