import * as THREE from 'three'
import type { RuntimeSnapshot } from './types'

export class RuntimeController {
  private snapshot: RuntimeSnapshot = {
    version: 1, sceneId: 'A02', cameraProgress: 0,
    cameraPose: { position: [3, 2, 5], target: [0, 0, 0] },
    ambientSeconds: 0, quality: 'full', paused: false, reducedMotion: false,
    loadPhase: 'transfer', readingAnchor: null, completedItems: 0, totalItems: 1, error: null,
  }
  private listeners = new Set<() => void>()
  private renderer: THREE.WebGLRenderer | null = null
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  private geometry: THREE.BufferGeometry | null = null
  private material: THREE.Material | null = null
  private observer: ResizeObserver | null = null
  private abort: AbortController | null = null
  private generation = 0
  private host: HTMLElement | null = null
  getSnapshot = () => this.snapshot
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener) } }
  private publish(patch: Partial<RuntimeSnapshot>) { this.snapshot = { ...this.snapshot, ...patch }; this.listeners.forEach(fn => fn()) }

  mount(host: HTMLElement) {
    this.dispose()
    this.host = host
    const generation = ++this.generation
    this.abort = new AbortController()
    this.publish({ loadPhase: 'transfer', completedItems: 0, error: null })
    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setClearColor('#243b3a')
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
      this.renderer.domElement.setAttribute('aria-label', 'Bản thử hình khối 3D')
      host.append(this.renderer.domElement)
      this.renderer.domElement.addEventListener('webglcontextlost', this.contextLost)
      this.scene = new THREE.Scene()
      this.scene.add(new THREE.HemisphereLight('#fff4d5', '#283d46', 3))
      const light = new THREE.DirectionalLight('#ffdb9c', 4)
      light.position.set(3, 5, 2); this.scene.add(light)
      this.observer = new ResizeObserver(this.resize)
      this.observer.observe(host)
      void this.load(generation, this.abort.signal)
    } catch { this.publish({ loadPhase: 'error', error: 'Cảnh gặp sự cố khi mở' }) }
  }
  private async load(generation: number, signal: AbortSignal) {
    try {
      const response = await fetch('/foundation/lab/tracer.geometry.json', { signal })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json() as { positions: number[]; indices: number[] }
      if (generation !== this.generation) return
      this.publish({ completedItems: 1, loadPhase: 'preparing' })
      this.geometry = new THREE.BufferGeometry()
      this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3))
      this.geometry.setIndex(data.indices); this.geometry.computeVertexNormals()
      this.material = new THREE.MeshStandardMaterial({ color: '#68a69e', roughness: 0.48, metalness: 0.1 })
      this.scene.add(new THREE.Mesh(this.geometry, this.material))
      this.resize()
      if (!this.renderer || this.renderer.getContext().isContextLost()) throw new Error('Context lost')
      this.publish({ loadPhase: 'ready' })
    } catch {
      if (generation === this.generation && !signal.aborted) this.publish({ loadPhase: 'error', error: 'Cảnh gặp sự cố khi mở' })
    }
  }
  setView(progress: number) {
    const p = Math.max(0, Math.min(1, progress))
    this.publish({ cameraProgress: p, cameraPose: { position: [3 - p * 5, 2, 5], target: [0, 0, 0] } })
    this.draw()
  }
  private draw() {
    if (!this.renderer) return
    this.camera.position.fromArray(this.snapshot.cameraPose.position)
    this.camera.lookAt(...this.snapshot.cameraPose.target)
    this.renderer.render(this.scene, this.camera)
  }
  private resize = () => {
    if (!this.renderer || !this.host) return
    const width = Math.max(1, this.host.clientWidth), height = Math.max(1, this.host.clientHeight)
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height; this.camera.updateProjectionMatrix(); this.draw()
  }
  private contextLost = (event: Event) => { event.preventDefault(); this.publish({ loadPhase: 'error', error: 'Cảnh gặp sự cố khi mở' }) }
  dispose() {
    ++this.generation; this.abort?.abort(); this.abort = null
    this.observer?.disconnect(); this.observer = null
    this.geometry?.dispose(); this.geometry = null
    this.material?.dispose(); this.material = null
    if (this.renderer) {
      const canvas = this.renderer.domElement
      canvas.removeEventListener('webglcontextlost', this.contextLost)
      this.renderer.dispose(); this.renderer.forceContextLoss(); canvas.remove(); this.renderer = null
    }
    this.host = null
  }
}
