import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

export const appRoot = fileURLToPath(new URL('../', import.meta.url))
export const sourceRoot = path.resolve(appRoot, '../.planning/sketches/resources')
export const expectedSources = [
  ['A02', 'crystal-salt-cave.jpg'], ['A03', 'by Anton Fadeev.jpg'],
  ['A04', '7b19b5803e15801d4ba7eb6bcd3b122d.jpg'], ['A05', '8f0a87deb581ad38e298e2b21495296c.jpg'],
  ['A08', 'umeshu-lovers-mirokai-wide-environment-a.jpg'], ['A06', 'e65f183e096b8db681e3e7d7eeb47ed6.jpg'],
  ['A01', 'young-qin-10re.jpg'], ['A09', 'zhaozhe-deng-dzzx-001.jpg'], ['A07', 'g-xy-eart-cg.jpg'],
]
export function jpegDimensions(bytes) {
  if (bytes.readUInt16BE(0) !== 0xffd8) throw new Error('Not a JPEG')
  let offset = 2
  while (offset < bytes.length) {
    if (bytes[offset++] !== 0xff) throw new Error('Invalid JPEG marker')
    while (bytes[offset] === 0xff) offset++
    const marker = bytes[offset++]
    const length = bytes.readUInt16BE(offset)
    if ([0xc0, 0xc1, 0xc2].includes(marker)) return { width: bytes.readUInt16BE(offset + 5), height: bytes.readUInt16BE(offset + 3) }
    offset += length
  }
  throw new Error('JPEG dimensions missing')
}
export async function sourceRecord(sourceId, filename, root = sourceRoot) {
  const data = await fs.readFile(path.join(root, filename))
  return { sourceId, filename, sha256: createHash('sha256').update(data).digest('hex'), bytes: data.length, ...jpegDimensions(data), title: null, creditedArtist: null, sourceUrl: null, permission: null }
}
export async function verifyManifest(manifest, root = sourceRoot) {
  if (manifest.sources.length !== 9 || new Set(manifest.sources.map(s => s.sourceId)).size !== 9 || new Set(manifest.sources.map(s => s.filename)).size !== 9) throw new Error('Expected nine unique sources')
  for (let i = 0; i < expectedSources.length; i++) {
    const [id, filename] = expectedSources[i], source = manifest.sources[i]
    if (source.sourceId !== id || source.filename !== filename) throw new Error('Source identity/order mismatch')
    const actual = await sourceRecord(id, filename, root)
    for (const key of ['sha256', 'bytes', 'width', 'height']) if (source[key] !== actual[key]) throw new Error(`Source mismatch: ${filename} ${key}`)
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!process.argv.includes('--check')) throw new Error('Only --check supported; source fingerprints are immutable')
  await verifyManifest(JSON.parse(await fs.readFile(path.join(appRoot, 'src/foundation/config/source-manifest.json'), 'utf8')))
  console.log('PASS nine source identities, dimensions and SHA-256')
}
