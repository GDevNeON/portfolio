import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
import { startFoundationServer } from './foundation-server.mjs'

const arg = (key, fallback) => { const i = process.argv.indexOf(key); return i < 0 ? fallback : process.argv[i + 1] }
const evidence = path.resolve('../.planning/phases/01-h-thi-t-k-i-n-nh-v-n-n-ch-y-3d/evidence')
const suites = { tracer: ['tracer-open', 'old-home', 'old-contact', 'renderer-failure'] }
export async function runFoundationSuite() {
  const suite = arg('--suite', 'tracer'), selected = arg('--case', null)
  const cases = selected ? [selected] : suite === 'all' ? Object.values(suites).flat() : suites[suite]
  const receipt = { timestamp: new Date().toISOString(), command: process.argv.join(' '), source: { head: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), dirty: execFileSync('git', ['status', '--short'], { encoding: 'utf8' }).trim() }, buildIdentity: createHash('sha256').update(await fs.readFile('src/foundation/runtime/RuntimeController.ts')).digest('hex'), browser: null, device: 'Local browser; physical identity unverified', cases: [], errors: [], failedResponses: [], limitations: ['Automated behavior only; no art approval or G500s acceptance'], status: 'incomplete', exitCode: 1, unrunCases: [...(cases || [])] }
  let server, legacy, browser, timer
  await fs.mkdir(evidence, { recursive: true })
  try {
    assert.ok(cases?.length, `Unknown or empty suite: ${suite}`)
    const run = async () => {
      server = process.env.FOUNDATION_URL ? null : await startFoundationServer()
      browser = await chromium.launch({ headless: true, executablePath: arg('--executable-path', process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe') })
      receipt.browser = browser.version()
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
      page.setDefaultTimeout(18000)
      page.on('pageerror', error => receipt.errors.push(error.message))
      page.on('console', message => { if (message.type() === 'error') receipt.errors.push(message.text()) })
      page.on('response', response => { if (response.status() >= 400) receipt.failedResponses.push({ url: response.url(), status: response.status() }) })
      for (const id of cases) {
        if (id === 'tracer-open') {
          let release
          const held = new Promise(resolve => { release = resolve })
          await page.route('**/tracer.geometry.json', async route => { await held; await route.continue() })
          const transfer = page.waitForResponse('**/tracer.geometry.json', { timeout: 35000 }).catch(error => error)
          await page.goto(process.env.FOUNDATION_URL || `${server.url}/foundation.html`, { waitUntil: 'domcontentloaded' })
          const link = page.getByRole('link', { name: 'Xem dự án', exact: true })
          await link.focus(); release()
          const transferred = await transfer
          if (transferred instanceof Error) throw transferred
          assert.equal(transferred.status(), 200)
          await page.locator('[data-phase=ready]').waitFor()
          assert.equal(await page.locator('canvas').count(), 1)
          assert.equal(await link.evaluate(el => el === document.activeElement), true)
          const slider = page.getByRole('slider', { name: 'Góc nhìn' })
          const before = await page.locator('canvas').screenshot()
          await slider.fill('0.6'); assert.equal(await slider.inputValue(), '0.6')
          assert.notDeepEqual(await page.locator('canvas').screenshot(), before, 'View control changes rendered pixels')
          assert.equal(await page.locator('article').count(), 3)
          assert.equal(await page.locator('a[href^="mailto:"]').count(), 1)
          assert.equal(await page.locator('section[aria-label="Chín nguồn art"] li').count(), 9)
          await page.screenshot({ path: path.join(evidence, '01-01-tracer.png'), fullPage: true })
        } else if (id === 'old-home' || id === 'old-contact') {
          legacy ||= await startFoundationServer({ legacy: true })
          const response = await page.goto(`${legacy.url}${id === 'old-home' ? '/' : '/contact'}`, { waitUntil: 'domcontentloaded' })
          assert.equal(response.status(), 200)
          await page.locator(id === 'old-home' ? 'main' : '#email').first().waitFor()
        } else if (id === 'renderer-failure') {
          const fallback = await browser.newPage()
          await fallback.addInitScript(() => {
            const getContext = HTMLCanvasElement.prototype.getContext
            HTMLCanvasElement.prototype.getContext = function(type, ...args) { return type.startsWith('webgl') ? null : getContext.call(this, type, ...args) }
          })
          await fallback.goto(process.env.FOUNDATION_URL || `${server.url}/foundation.html`)
          await fallback.locator('[data-phase=error]').waitFor()
          assert.equal(await fallback.locator('article').count(), 3)
          assert.equal(await fallback.locator('section[aria-label="Chín nguồn art"] li').count(), 9)
          await fallback.close()
        } else if (id === 'intentional-failure') {
          assert.fail('Deliberate failure fixture: must produce failed receipt and process exit 1')
        } else throw new Error(`Unknown case ${id}`)
        receipt.cases.push({ id, status: 'pass' }); receipt.unrunCases.shift()
      }
      assert.deepEqual(receipt.errors, [], 'No browser errors')
      assert.deepEqual(receipt.failedResponses, [], 'No HTTP failures')
    }
    await Promise.race([run(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Whole suite deadline exceeded')), 43000) })])
    receipt.status = 'complete'; receipt.exitCode = 0
  } catch (error) { receipt.status = 'failed'; receipt.failure = String(error) }
  finally {
    clearTimeout(timer)
    await browser?.close(); await legacy?.close(); await server?.close()
    await fs.writeFile(path.join(evidence, `01-01-${selected || suite}.json`), JSON.stringify(receipt, null, 2))
  }
  console.log(JSON.stringify(receipt, null, 2)); process.exitCode = receipt.exitCode
}
await runFoundationSuite()
