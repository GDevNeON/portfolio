import { useEffect, useMemo, useRef } from 'react'

type GlassStackProps = {
  images: string[]
  className?: string
  alt?: string
}

export default function GlassStack({ images, className, alt }: GlassStackProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null)

  const imageSrc = useMemo(() => {
    return images.find(Boolean) ?? ''
  }, [images])

  useEffect(() => {
    const el = sceneRef.current
    if (!el) return

    let frameId: number | null = null
    let lastEvent: PointerEvent | null = null

    const updateTilt = () => {
      if (!lastEvent) return
      const rect = el.getBoundingClientRect()
      const px = (lastEvent.clientX - rect.left) / rect.width
      const py = (lastEvent.clientY - rect.top) / rect.height
      const x = (px - 0.5) * 2
      const y = (py - 0.5) * 2

      el.style.setProperty('--gs-ry', `${x * 10}deg`)
      el.style.setProperty('--gs-rx', `${-y * 8}deg`)
      frameId = null
    }

    const onMove = (e: PointerEvent) => {
      lastEvent = e
      if (frameId == null) {
        frameId = window.requestAnimationFrame(updateTilt)
      }
    }

    const onLeave = () => {
      el.style.setProperty('--gs-ry', `0deg`)
      el.style.setProperty('--gs-rx', `0deg`)
      lastEvent = null
      if (frameId != null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      }
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frameId != null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <div className={['glassStack', className].filter(Boolean).join(' ')} ref={sceneRef}>
      <button type="button" className="glassPane glassPane--single" aria-label={alt ?? ''}>
        {imageSrc ? <img src={imageSrc} alt={alt ?? ''} draggable={false} /> : <div className="glassFallback" />}
      </button>
    </div>
  )
}
