import * as THREE from 'three'

export function randomSeed(seed: number) {
  let s = seed >>> 0
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296 }
}

function wave(x: number, y: number, z: number, seed: number) {
  return Math.sin(x * 3.2 + seed) * Math.cos(y * 4.1 - seed) * Math.sin(z * 3.7 + seed * 0.7)
}

// Closed, tessellated rock volume. Surface detail exists in geometry as well as shader.
export function rockGeometry(seed: number, detail = 12) {
  const geometry = new THREE.BoxGeometry(1, 1, 1, detail, detail, detail)
  const positions = geometry.getAttribute('position')
  const point = new THREE.Vector3()
  for (let i = 0; i < positions.count; i++) {
    point.fromBufferAttribute(positions, i)
    const x = point.x, y = point.y, z = point.z
    const n = wave(x * 2, y * 2, z * 2, seed) * 0.19 + wave(x * 5, y * 5, z * 5, seed + 2) * 0.035
    const round = point.clone().normalize().multiplyScalar(0.61)
    point.lerp(round, 0.83)
    point.multiplyScalar(1 + n)
    point.x += Math.sin(y * 6 + z * 3 + seed) * 0.095
    point.z += Math.cos(y * 9 + x * 4 + seed) * 0.065
    point.y += Math.sin(z * 8 + seed) * 0.035
    positions.setXYZ(i, point.x, point.y, point.z)
  }
  geometry.computeVertexNormals()
  return geometry
}

// Facets are the mineral's natural morphology, with bevelled edges and an uneven cap.
export function crystalGeometry(seed: number) {
  const random = randomSeed(seed)
  const sides = 6
  const rings = [0, 0.03, 0.75, 0.94, 1]
  const radius = Array.from({ length: sides }, () => 0.78 + random() * 0.22)
  const tipOffset = [random() * 0.13, random() * 0.14]
  const verts: number[] = []
  const point = (ring: number, side: number) => {
    const angle = side / sides * Math.PI * 2
    const r = radius[side % sides] * (ring === 4 ? 0.87 : ring === 3 ? 0.98 : ring === 0 ? 0.9 : 1)
    return new THREE.Vector3(Math.cos(angle) * r + rings[ring] * tipOffset[0], rings[ring] - (ring > 2 ? (1 + Math.sin(angle + seed)) * 0.075 : 0), Math.sin(angle) * r + rings[ring] * tipOffset[1])
  }
  const tri = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => verts.push(...a.toArray(), ...b.toArray(), ...c.toArray())
  for (let ring = 0; ring < rings.length - 1; ring++) {
    for (let i = 0; i < sides; i++) {
      const a = point(ring, i), b = point(ring, (i + 1) % sides)
      const c = point(ring + 1, (i + 1) % sides), d = point(ring + 1, i)
      tri(a, d, b); tri(b, d, c)
    }
  }
  for (let i = 0; i < sides; i++) {
    tri(new THREE.Vector3(0, 0, 0), point(0, i), point(0, (i + 1) % sides))
    tri(new THREE.Vector3(tipOffset[0], 0.925, tipOffset[1]), point(4, (i + 1) % sides), point(4, i))
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
  geometry.computeVertexNormals()
  return geometry
}

export function floorHeight(x: number, z: number) {
  return Math.sin(z * 0.21) * 0.12 + Math.sin(x * 0.4 + z * 0.3) * 0.08 + Math.pow(Math.abs(x) / 11, 3) * 1.1
}

export function terrainGeometry(low = false) {
  const g = new THREE.PlaneGeometry(40, 100, low ? 40 : 120, low ? 80 : 240)
  g.rotateX(-Math.PI / 2)
  g.translate(0, -0.12, -18)
  const p = g.getAttribute('position')
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i)
    p.setY(i, floorHeight(x, z) + Math.sin(x * 4.1 + z * 3.1) * 0.018)
  }
  g.computeVertexNormals()
  return g
}

export function traveller() {
  const group = new THREE.Group()
  const fabric = new THREE.MeshStandardMaterial({ color: '#923b25', roughness: 0.94 })
  const leather = new THREE.MeshStandardMaterial({ color: '#4a3524', roughness: 0.86 })
  const linen = new THREE.MeshStandardMaterial({ color: '#d2bea0', roughness: 1 })
  const skin = new THREE.MeshStandardMaterial({ color: '#b8865b', roughness: 0.9 })
  const metal = new THREE.MeshStandardMaterial({ color: '#aa9770', metalness: 0.65, roughness: 0.5 })
  const part = (g: THREE.BufferGeometry, m: THREE.Material, p: [number, number, number], s: [number, number, number] = [1, 1, 1]) => {
    const mesh = new THREE.Mesh(g, m); mesh.position.set(...p); mesh.scale.set(...s); mesh.castShadow = true; mesh.receiveShadow = true; group.add(mesh); return mesh
  }
  part(new THREE.CapsuleGeometry(0.115, 0.55, 8, 14), linen, [-0.13, 0.49, 0])
  part(new THREE.CapsuleGeometry(0.115, 0.54, 8, 14), linen, [0.14, 0.5, -0.03]).rotation.z = -0.09
  part(new THREE.CapsuleGeometry(0.12, 0.18, 8, 14), leather, [-0.13, 0.13, 0.07], [1, 1, 1.4])
  part(new THREE.CapsuleGeometry(0.12, 0.18, 8, 14), leather, [0.15, 0.13, 0.04], [1, 1, 1.4])
  part(new THREE.CapsuleGeometry(0.235, 0.34, 10, 20), fabric, [0, 1.08, 0], [1, 1, 0.72])
  part(new THREE.SphereGeometry(0.16, 24, 18), skin, [0, 1.57, -0.015], [0.87, 1.12, 1])
  part(new THREE.SphereGeometry(0.18, 24, 18), fabric, [0, 1.64, 0.04], [1, 0.8, 1])
  part(new THREE.CapsuleGeometry(0.078, 0.37, 8, 14), linen, [-0.3, 1.02, 0]).rotation.z = -0.2
  part(new THREE.CapsuleGeometry(0.078, 0.37, 8, 14), linen, [0.32, 1.02, 0]).rotation.z = 0.28
  part(new THREE.SphereGeometry(0.075, 16, 12), skin, [0.4, 0.8, 0.02])
  part(new THREE.CylinderGeometry(0.024, 0.031, 1.8, 10), leather, [0.46, 0.9, -0.03]).rotation.z = -0.04
  part(new THREE.SphereGeometry(0.05, 16, 12), metal, [0.5, 1.8, -0.03])
  part(new THREE.CapsuleGeometry(0.2, 0.2, 8, 18), leather, [0, 1.15, 0.23], [1, 1, 0.64])
  part(new THREE.TorusGeometry(0.24, 0.028, 6, 32), leather, [0, 0.88, 0], [1, 0.7, 1]).rotation.x = Math.PI / 2
  const cape = new THREE.PlaneGeometry(0.85, 0.95, 18, 24)
  const p = cape.getAttribute('position')
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i)
    p.setXYZ(i, x * (1.1 - y * 0.5), y, 0.10 + Math.cos(x * 5) * 0.08 + (0.5 - y) * 0.12)
  }
  cape.computeVertexNormals()
  const cloak = new THREE.Mesh(cape, new THREE.MeshStandardMaterial({ color: '#a74429', roughness: 0.93, side: THREE.DoubleSide }))
  cloak.position.set(0, 1.0, 0.2); cloak.castShadow = true; group.add(cloak)
  group.rotation.y = 0.18
  return { group, cloak, rest: Float32Array.from(p.array) }
}
