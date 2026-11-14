// @vitest-environment node
import { it, expect } from 'vitest'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { verifyManifest, sourceRoot } from '../../scripts/foundation-manifest.mjs'

it('rejects duplicates and changed source bytes without replacing fingerprints', async () => {
  const manifest = JSON.parse(await fs.readFile('src/foundation/config/source-manifest.json', 'utf8'))
  await verifyManifest(manifest)
  const duplicate = structuredClone(manifest)
  duplicate.sources[1] = duplicate.sources[0]
  await expect(verifyManifest(duplicate)).rejects.toThrow('unique')
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'foundation-manifest-'))
  try {
    for (const source of manifest.sources) await fs.copyFile(path.join(sourceRoot, source.filename), path.join(temp, source.filename))
    await fs.appendFile(path.join(temp, manifest.sources[0].filename), 'mutation')
    await expect(verifyManifest(manifest, temp)).rejects.toThrow('Source mismatch')
  } finally {
    for (const source of manifest.sources) await fs.unlink(path.join(temp, source.filename))
    await fs.rmdir(temp)
  }
})
