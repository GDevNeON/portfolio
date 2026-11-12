import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { advanceProgress, clamp, inputTarget, nearestView, viewpoints } from './motion'
import { crystalGeometry, floorHeight, randomSeed, rockGeometry, terrainGeometry, traveller } from './geometry'
import { crystalMaterial, dustMaterial, stoneMaterial } from './materials'

gsap.registerPlugin(ScrollTrigger)

export type Quality = 'full' | 'low'
export type CrystalMode = 'physical' | 'mineral'
export type Snapshot = {
  progress: number; stage: number; fps: number; triangles: number; calls: number;
  quality: Quality; material: CrystalMode; paused: boolean; reduced: boolean; look: boolean; ready: boolean;
}
type Callbacks = { onState: (state: Snapshot) => void; onLoad: (percent: number) => void; onError: (message: string) => void }
type LogEvent = { at: string; event: string; data?: unknown }

export class CaveExperience {
  readonly renderer: THREE.WebGLRenderer
  readonly scene = new THREE.Scene()
  readonly camera = new THREE.PerspectiveCamera(52, 1, 0.08, 160)
  private readonly world = new THREE.Group()
  private readonly callbacks: Callbacks
  private readonly host: HTMLDivElement
  private readonly events: LogEvent[] = []
  private readonly path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.2, 3.3, 21), new THREE.Vector3(0.7, 3.1, 13),
    new THREE.Vector3(1.6, 3.0, 6), new THREE.Vector3(2.2, 2.8, 0),
    new THREE.Vector3(2.6, 2.6, -6), new THREE.Vector3(3.0, 3.0, -17),
    new THREE.Vector3(2.8, 4.1, -27),
  ], false, 'centripetal')
  private readonly gaze = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.7, 8, -17), new THREE.Vector3(-1.9, 8, -17),
    new THREE.Vector3(-2, 9.2, -17), new THREE.Vector3(0.4, 5, -14),
    new THREE.Vector3(2.3, 3.0, -16), new THREE.Vector3(1, 6, -32),
    new THREE.Vector3(0, 9, -52),
  ], false, 'centripetal')
  private readonly eye = new THREE.Vector3()
  private readonly aim = new THREE.Vector3()
  private readonly pointer = new THREE.Vector2()
  private readonly drift = new THREE.Vector2()
  private readonly observer: ReturnType<typeof ScrollTrigger.observe>
  private readonly resizeObserver: ResizeObserver
  private readonly osMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  private readonly materials = { wall: stoneMaterial('wall'), floor: stoneMaterial('floor'), pale: stoneMaterial('pale') }
  private crystals: THREE.Mesh[] = []
  private geometryProfiles: { mesh: THREE.Mesh; full: THREE.BufferGeometry; low: THREE.BufferGeometry }[] = []
  private crystalMaterials = [crystalMaterial(true, 0), crystalMaterial(true, 1), crystalMaterial(true, -1)]
  private dust: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null
  private explorer: ReturnType<typeof traveller> | null = null
  private environmentTarget: THREE.WebGLRenderTarget | null = null
  private readonly sun = new THREE.DirectionalLight('#fff0c6', 3.1)
  private readonly fill = new THREE.PointLight('#b8e9ed', 22, 35, 2)
  private raf = 0
  private disposed = false
  private ready = false
  private hidden = document.hidden
  private needsFrame = true
  private progress = 0
  private target = 0
  private paused = false
  private reduced = false
  private look = false
  private quality: Quality = 'full'
  private material: CrystalMode = 'physical'
  private aliveTime = 0
  private previous = 0
  private reportAt = 0
  private frames = 0
  private fps = 0
  private lastStored = 0
  private lastTravelInput = 0
  private drag: {x: number; y: number} | null = null

  constructor(host: HTMLDivElement, callbacks: Callbacks) {
    this.host = host; this.callbacks = callbacks
    try { this.quality = localStorage.getItem('a02:quality') === 'low' ? 'low' : 'full' } catch { /* preferences are optional */ }
    this.reduced = this.osMotion.matches
    try { this.progress = clamp(Number(sessionStorage.getItem('a02:progress')) || 0) } catch { /* session state is optional */ }
    if (this.reduced) this.progress = viewpoints[nearestView(this.progress)].progress
    this.target = this.progress
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    this.renderer.setClearColor('#b7dfdf')
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 0.95
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.transmissionResolutionScale = 0.65
    this.renderer.domElement.setAttribute('aria-label', 'Không gian hang pha lê 3D; cuộn hoặc dùng các mốc để di chuyển')
    this.renderer.domElement.tabIndex = 0
    host.appendChild(this.renderer.domElement)
    this.scene.background = new THREE.Color('#bce4e3')
    this.scene.add(this.world)
    this.scene.environmentIntensity = 0.45
    this.scene.add(new THREE.HemisphereLight('#c6e5ee', '#493220', 0.65))
    this.sun.position.set(-9, 48, -14); this.sun.target.position.set(1, 0, -5)
    this.sun.castShadow = true
    Object.assign(this.sun.shadow.camera, { left: -23, right: 23, top: 30, bottom: -30, near: 0.5, far: 90 })
    this.sun.shadow.normalBias = 0.045; this.sun.shadow.bias = -0.00008
    this.scene.add(this.sun, this.sun.target)
    this.fill.position.set(1, 11, -13); this.scene.add(this.fill)
    const entranceFill = new THREE.DirectionalLight('#b3c6d0', 0.24)
    entranceFill.position.set(2, 12, 20); this.scene.add(entranceFill)
    this.observer = ScrollTrigger.observe({
      target: this.renderer.domElement, type: 'wheel,touch', preventDefault: true, tolerance: 2,
      onChangeY: self => {
        if (this.disposed || !this.ready || this.paused || this.look || this.reduced) return
        const delta = self.event?.type === 'wheel' ? self.deltaY : -self.deltaY
        this.target = inputTarget(this.progress, this.target, delta)
        this.lastTravelInput = performance.now()
        this.needsFrame = true
      },
    })
    this.resizeObserver = new ResizeObserver(this.resize)
    this.resizeObserver.observe(host)
    this.renderer.domElement.addEventListener('webglcontextlost', this.contextLost)
    this.renderer.domElement.addEventListener('pointermove', this.pointerMove)
    this.renderer.domElement.addEventListener('pointerdown', this.pointerDown)
    this.renderer.domElement.addEventListener('pointerup', this.pointerUp)
    this.renderer.domElement.addEventListener('pointercancel', this.pointerUp)
    this.renderer.domElement.addEventListener('keydown', this.keyDown)
    this.osMotion.addEventListener('change', this.motionChanged)
    document.addEventListener('visibilitychange', this.visibilityChanged)
    this.log('created', { revision: THREE.REVISION, viewport: [host.clientWidth, host.clientHeight], reduced: this.reduced })
  }

  async start() {
    this.callbacks.onLoad(8)
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    if (this.disposed) return
    this.buildWorld()
    this.callbacks.onLoad(45)
    this.buildEnvironment()
    this.applyQuality()
    this.resize()
    this.updateCamera(0)
    this.callbacks.onLoad(65)
    await this.renderer.compileAsync(this.scene, this.camera)
    if (this.disposed) return
    this.renderer.render(this.scene, this.camera)
    this.ready = true
    this.callbacks.onLoad(100)
    this.log('ready', { meshes: this.world.children.length, geometries: this.renderer.info.memory.geometries })
    this.emit()
    this.raf = requestAnimationFrame(this.frame)
  }

  private buildWorld() {
    const rand = randomSeed(20261112)
    const rockShapes = Array.from({ length: 8 }, (_, i) => rockGeometry(i + 1, 12))
    const lowShapes = Array.from({ length: 8 }, (_, i) => rockGeometry(i + 1, 4))
    const walls: THREE.BufferGeometry[] = [], chalk: THREE.BufferGeometry[] = []
    const lowWalls: THREE.BufferGeometry[] = [], lowChalk: THREE.BufferGeometry[] = []
    const transform = new THREE.Object3D()
    const addRock = (x: number, y: number, z: number, sx: number, sy: number, sz: number, pale = false) => {
      transform.position.set(x, y, z)
      transform.rotation.set((rand() - 0.5) * 0.5, (rand() - 0.5) * 0.5, (rand() - 0.5) * 0.4)
      transform.scale.set(sx, sy, sz); transform.updateMatrix()
      const shape = Math.floor(rand() * rockShapes.length)
      const geo = rockShapes[shape].clone().applyMatrix4(transform.matrix)
      ;(pale ? chalk : walls).push(geo)
      ;(pale ? lowChalk : lowWalls).push(lowShapes[shape].clone().applyMatrix4(transform.matrix))
    }
    // Orange canyon sides are solid irregular volumes, not flat image surfaces.
    for (const side of [-1, 1]) {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 7; col++) {
          const z = 19 - col * 10 + (rand() - 0.5) * 3
          const y = 2.7 + row * 7 + rand()
          const inset = row === 0 ? 0 : row === 3 ? -1.8 : -0.5
          const x = side * (10 + inset + rand() * 1.7)
          addRock(x, y, z, 8 + rand() * 3, 9 + rand() * 4, 14 + rand() * 4, row === 0 && rand() > 0.55)
        }
      }
      for (let i = 0; i < 55; i++) {
        const z = 19 - rand() * 67
        const x = side * (7.8 + rand() * 3.4)
        const y = floorHeight(x, z)
        const s = 0.4 + rand() * 2.1
        addRock(x, y + s * 0.4, z, s * 1.7, s, s * (0.8 + rand()), true)
      }
    }
    // Entrance overhang gives a dark interior without concealing a scene swap.
    addRock(-5, 14.5, 19, 13, 8, 12)
    addRock(6.8, 16, 19, 11, 7, 11)
    addRock(-9, 1.0, 17, 8, 3.5, 8, true)
    addRock(8, 0.7, 15, 7, 2.6, 7, true)
    addRock(-16, 13, -61, 15, 28, 14, true)
    addRock(19, 10, -65, 17, 24, 18, true)
    addRock(-22, 21, -70, 12, 30, 15, true)
    for (const [list, lowList, material] of [[walls, lowWalls, this.materials.wall], [chalk, lowChalk, this.materials.pale]] as const) {
      const merged = mergeGeometries(list)
      const low = mergeGeometries(lowList)
      if (merged && low) { const mesh = new THREE.Mesh(merged, material); mesh.castShadow = true; mesh.receiveShadow = true; this.world.add(mesh); this.geometryProfiles.push({ mesh, full: merged, low }) }
      list.forEach(g => g.dispose())
      lowList.forEach(g => g.dispose())
    }
    rockShapes.forEach(g => g.dispose())
    lowShapes.forEach(g => g.dispose())
    const floor = new THREE.Mesh(terrainGeometry(), this.materials.floor)
    floor.receiveShadow = true; this.world.add(floor)
    this.geometryProfiles.push({ mesh: floor, full: floor.geometry, low: terrainGeometry(true) })
    const debris = new THREE.InstancedMesh(rockGeometry(18, 3), this.materials.pale, 580)
    for (let i = 0; i < 580; i++) {
      const x = (rand() - 0.5) * 19, z = 23 - rand() * 76
      const s = 0.04 + rand() ** 2 * 0.48
      transform.position.set(x, floorHeight(x, z) + s * 0.16, z)
      transform.rotation.set(rand(), rand() * Math.PI, rand() * 0.5)
      transform.scale.set(s * 1.7, s * 0.7, s)
      transform.updateMatrix(); debris.setMatrixAt(i, transform.matrix)
    }
    debris.name = 'debris'; debris.receiveShadow = true; debris.castShadow = true; this.world.add(debris)
    const crystalShapes = Array.from({ length: 4 }, (_, i) => crystalGeometry(50 + i))
    const addCrystal = (x: number, z: number, height: number, radius: number, lean: number, shade: number) => {
      const mesh = new THREE.Mesh(crystalShapes[Math.floor(rand() * 4)], this.crystalMaterials[shade % 3])
      mesh.position.set(x, floorHeight(x, z) - 0.25, z)
      mesh.scale.set(radius, height, radius * (0.7 + rand() * 0.4))
      mesh.rotation.set((rand() - 0.5) * 0.13, rand() * Math.PI, lean)
      mesh.userData.shade = shade % 3
      mesh.castShadow = true; mesh.receiveShadow = true
      this.crystals.push(mesh); this.world.add(mesh)
    }
    // Dominant asymmetric cathedral of crystals, with a dark fissure between pillars.
    addCrystal(-2.9, -18, 25, 2.8, -0.085, 0)
    addCrystal(-5.4, -21, 20, 2.3, -0.18, 1)
    addCrystal(0.1, -23.5, 18, 1.8, 0.025, 0)
    addCrystal(-1.0, -27, 28, 1.9, -0.11, 1)
    addCrystal(-5.6, -16.5, 14, 1.6, -0.23, 1)
    addCrystal(0.5, -26.5, 15, 1.4, 0.04, 2)
    addCrystal(-3.8, -14, 10, 1.65, -0.16, 1)
    // Cleaved, unequal growth along the great pillars breaks the uniform silhouette.
    for (let i = 0; i < 30; i++) {
      const x = -6.2 + rand() * 7, z = -17 - rand() * 10
      addCrystal(x, z, 6 + rand() * 19, 0.22 + rand() * 0.52, -0.05 - rand() * 0.12, i % 3 === 0 ? 2 : 1)
    }
    for (let i = 0; i < 44; i++) {
      const side = i % 2 ? -1 : 1
      const x = side * (6.6 + rand() * 2.7), z = 7 - rand() * 49
      addCrystal(x, z, 0.9 + rand() ** 1.4 * 6, 0.19 + rand() * 0.6, side * (0.08 + rand() * 0.28), i)
    }
    // Smaller pale growing points at the base of the central structure.
    for (let i = 0; i < 23; i++) addCrystal(-4 + rand() * 5, -12 - rand() * 11, 0.7 + rand() * 3.8, 0.12 + rand() * 0.4, (rand() - 0.5) * 0.55, i + 1)
    const dustGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(600 * 3), seeds = new Float32Array(600)
    for (let i = 0; i < 600; i++) { positions[i * 3] = (rand() - 0.5) * 16; positions[i * 3 + 1] = rand() * 17; positions[i * 3 + 2] = 15 - rand() * 52; seeds[i] = rand() }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    dustGeometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    this.dust = new THREE.Points(dustGeometry, dustMaterial()); this.world.add(this.dust)
    this.explorer = traveller()
    this.explorer.group.position.set(3.2, floorHeight(3.2, -21), -21)
    this.explorer.group.scale.setScalar(0.88)
    this.world.add(this.explorer.group)
  }

  private buildEnvironment() {
    const stage = new THREE.Scene()
    stage.background = new THREE.Color('#b7d8dc')
    const amber = new THREE.MeshBasicMaterial({ color: '#b78352', side: THREE.BackSide })
    const room = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), amber)
    stage.add(room)
    const opening = new THREE.Mesh(new THREE.PlaneGeometry(7, 18), new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 3.8, 3.7), side: THREE.DoubleSide }))
    opening.position.set(0, 0, -9.9); stage.add(opening)
    const skylight = new THREE.Mesh(new THREE.PlaneGeometry(6, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(3.5, 3.3, 2.7), side: THREE.DoubleSide }))
    skylight.rotation.x = Math.PI / 2; skylight.position.y = 9.9; stage.add(skylight)
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.environmentTarget = pmrem.fromScene(stage, 0.08, 0.1, 50)
    this.scene.environment = this.environmentTarget.texture
    stage.traverse(obj => { if (obj instanceof THREE.Mesh) { obj.geometry.dispose(); (obj.material as THREE.Material).dispose() } })
    pmrem.dispose()
  }

  private applyQuality() {
    const low = this.quality === 'low'
    this.geometryProfiles.forEach(profile => { profile.mesh.geometry = low ? profile.low : profile.full })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, low ? 1 : 1.5))
    this.renderer.transmissionResolutionScale = low ? 0.35 : 0.65
    this.sun.shadow.mapSize.setScalar(low ? 1024 : 2048)
    if (this.sun.shadow.map) { this.sun.shadow.map.dispose(); this.sun.shadow.map = null }
    const debris = this.world.getObjectByName('debris') as THREE.InstancedMesh | undefined
    if (debris) debris.count = low ? 200 : 580
    if (this.dust) { this.dust.geometry.setDrawRange(0, low ? 130 : 600); this.dust.material.uniforms.uPixelRatio.value = this.renderer.getPixelRatio() }
    this.needsFrame = true
  }

  private resize = () => {
    if (this.disposed) return
    const width = Math.max(1, this.host.clientWidth), height = Math.max(1, this.host.clientHeight)
    this.camera.aspect = width / height
    this.camera.fov = width < height ? 67 : 52
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.needsFrame = true
  }

  private updateCamera(dt: number) {
    if (!this.paused && !this.reduced) this.progress = advanceProgress(this.progress, this.target, dt)
    this.path.getPoint(this.progress, this.eye)
    this.gaze.getPoint(this.progress, this.aim)
    if (!this.paused && !this.reduced) this.drift.lerp(this.pointer, 1 - Math.exp(-5 * dt))
    const lookScale = this.look ? 5.5 : 0.22
    if (!this.reduced) { this.aim.x += this.drift.x * lookScale; this.aim.y += this.drift.y * lookScale * 0.65 }
    this.camera.position.copy(this.eye)
    this.camera.lookAt(this.aim)
  }

  private frame = (now: number) => {
    if (this.disposed) return
    this.raf = requestAnimationFrame(this.frame)
    if (this.hidden || !this.ready) { this.previous = now; return }
    const dt = this.previous ? Math.min((now - this.previous) / 1000, 0.05) : 0.016
    this.previous = now
    const animated = !this.paused && !this.reduced
    if (!animated && !this.needsFrame) return
    // Stop residual travel on wall-clock time, including a slow GPU's long frames.
    if (now - this.lastTravelInput > 900) this.target = this.progress
    this.updateCamera(dt)
    if (animated) {
      this.aliveTime += dt
      if (this.dust) this.dust.material.uniforms.uTime.value = this.aliveTime
      if (this.explorer) {
        const pos = this.explorer.cloak.geometry.getAttribute('position'), rest = this.explorer.rest
        for (let i = 0; i < pos.count; i++) {
          const y = rest[i * 3 + 1]
          pos.setZ(i, rest[i * 3 + 2] + Math.sin(this.aliveTime * 1.3 + rest[i * 3] * 6 + y * 3) * 0.035 * (0.6 - y))
        }
        pos.needsUpdate = true
        this.explorer.group.rotation.z = Math.sin(this.aliveTime * 0.8) * 0.005
      }
    }
    this.renderer.render(this.scene, this.camera)
    this.needsFrame = false
    this.frames++
    if (now - this.reportAt > 700) {
      this.fps = this.reportAt ? this.frames / ((now - this.reportAt) / 1000) : 0
      this.frames = 0; this.reportAt = now; this.emit()
    }
    if (now - this.lastStored > 1800) {
      try { sessionStorage.setItem('a02:progress', String(this.progress)) } catch { /* optional */ }
      this.lastStored = now
    }
  }

  jump(progress: number) {
    this.progress = clamp(progress); this.target = this.progress; this.pointer.set(0, 0); this.drift.set(0, 0)
    this.updateCamera(0); this.needsFrame = true
    try { sessionStorage.setItem('a02:progress', String(this.progress)) } catch { /* optional */ }
    this.log('viewpoint', this.progress); this.emit()
  }
  setQuality(quality: Quality) { this.quality = quality; this.applyQuality(); this.resize(); try { localStorage.setItem('a02:quality', quality) } catch { /* optional */ } this.log('quality', quality); this.emit() }
  setPaused(paused: boolean) { this.paused = paused; this.target = this.progress; this.needsFrame = true; this.log('pause', paused); this.emit() }
  setReduced(reduced: boolean) { this.reduced = reduced; this.target = this.progress; this.pointer.set(0, 0); this.drift.set(0, 0); if (reduced) this.jump(viewpoints[nearestView(this.progress)].progress); this.needsFrame = true; this.log('reduced-motion', reduced); this.emit() }
  setLook(look: boolean) { this.look = look; this.pointer.set(0, 0); this.drift.set(0, 0); this.target = this.progress; this.needsFrame = true; this.emit() }
  setMaterial(mode: CrystalMode) {
    this.material = mode
    const old = this.crystalMaterials
    this.crystalMaterials = [0, 1, -1].map(shade => crystalMaterial(mode === 'physical', shade))
    this.crystals.forEach(mesh => mesh.material = this.crystalMaterials[mesh.userData.shade as number])
    old.forEach(material => material.dispose())
    this.needsFrame = true; this.log('material', mode); this.emit()
  }
  exportReport() {
    const gl = this.renderer.getContext()
    const debug = gl.getExtension('WEBGL_debug_renderer_info')
    return { prototype: 'A02', revision: THREE.REVISION, at: new Date().toISOString(), state: this.snapshot(), ambientTime: this.aliveTime, renderFrame: this.renderer.info.render.frame, gpu: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), camera: this.camera.position.toArray(), viewport: [this.host.clientWidth, this.host.clientHeight], pixelRatio: this.renderer.getPixelRatio(), userAgent: navigator.userAgent, events: [...this.events], limitations: 'Prototype for review. Fidelity and target-device performance are not accepted.' }
  }
  private snapshot(): Snapshot { return { progress: this.progress, stage: nearestView(this.progress), fps: Math.round(this.fps), triangles: this.renderer.info.render.triangles, calls: this.renderer.info.render.calls, quality: this.quality, material: this.material, paused: this.paused, reduced: this.reduced, look: this.look, ready: this.ready } }
  private emit() { if (!this.disposed) this.callbacks.onState(this.snapshot()) }
  private log(event: string, data?: unknown) { this.events.push({ at: new Date().toISOString(), event, data }); if (this.events.length > 200) this.events.shift() }
  private contextLost = (event: Event) => { event.preventDefault(); this.ready = false; this.log('context-lost'); this.callbacks.onError('Cảnh 3D tạm gián đoạn. Chọn Thử lại để mở lại hang pha lê.'); this.emit() }
  private pointerDown = (event: PointerEvent) => { if (this.look && !this.paused && !this.reduced) { this.drag = { x: event.clientX, y: event.clientY }; this.renderer.domElement.setPointerCapture(event.pointerId) } }
  private pointerUp = () => { this.drag = null }
  private pointerMove = (event: PointerEvent) => {
    if (this.paused || this.reduced) return
    if (this.look && this.drag) {
      this.pointer.x = clamp(this.pointer.x + (event.clientX - this.drag.x) / 300, -1, 1)
      this.pointer.y = clamp(this.pointer.y - (event.clientY - this.drag.y) / 300, -1, 1)
      this.drag = { x: event.clientX, y: event.clientY }
    } else if (!this.look && event.pointerType !== 'touch') {
      this.pointer.set((event.clientX / this.host.clientWidth - 0.5) * 2, (0.5 - event.clientY / this.host.clientHeight) * 2)
    }
    this.needsFrame = true
  }
  private keyDown = (event: KeyboardEvent) => {
    if (event.key === 'Home') { event.preventDefault(); this.jump(0) }
    else if (event.key === 'End') { event.preventDefault(); this.jump(1) }
    else if (['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'].includes(event.key)) {
      event.preventDefault()
      if (this.paused) return
      const dir = ['ArrowDown', 'PageDown'].includes(event.key) ? 1 : -1
      if (this.reduced) this.jump(viewpoints[clamp(nearestView(this.progress) + dir, 0, 3)].progress)
      else { this.target = inputTarget(this.progress, this.target, dir * 160); this.lastTravelInput = performance.now() }
      this.needsFrame = true
    }
  }
  private motionChanged = () => this.setReduced(this.osMotion.matches)
  private visibilityChanged = () => { this.hidden = document.hidden; this.previous = 0; this.needsFrame = true }

  dispose() {
    this.disposed = true; cancelAnimationFrame(this.raf); this.observer.kill(); this.resizeObserver.disconnect()
    document.removeEventListener('visibilitychange', this.visibilityChanged)
    this.osMotion.removeEventListener('change', this.motionChanged)
    const canvas = this.renderer.domElement
    canvas.removeEventListener('webglcontextlost', this.contextLost)
    canvas.removeEventListener('pointermove', this.pointerMove); canvas.removeEventListener('pointerdown', this.pointerDown)
    canvas.removeEventListener('pointerup', this.pointerUp); canvas.removeEventListener('pointercancel', this.pointerUp); canvas.removeEventListener('keydown', this.keyDown)
    const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>()
    this.scene.traverse(obj => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        geometries.add(obj.geometry)
        if (Array.isArray(obj.material)) obj.material.forEach(material => materials.add(material)); else materials.add(obj.material)
      }
    })
    this.geometryProfiles.forEach(profile => { geometries.add(profile.full); geometries.add(profile.low) })
    Object.values(this.materials).forEach(material => materials.add(material))
    this.crystalMaterials.forEach(material => materials.add(material))
    geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose())
    this.environmentTarget?.dispose(); this.sun.shadow.map?.dispose()
    this.renderer.dispose(); this.renderer.forceContextLoss(); canvas.remove()
  }
}
