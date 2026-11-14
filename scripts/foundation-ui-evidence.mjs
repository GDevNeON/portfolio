import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { startFoundationServer } from './foundation-server.mjs'

const output = path.resolve(`../.planning/phases/01-h-thi-t-k-i-n-nh-v-n-n-ch-y-3d/evidence/${process.argv.includes('--confirm') ? 'ui-confirm' : 'ui-baseline'}`)
await fs.mkdir(output, { recursive: true })
let server, browser
const receipt = { timestamp: new Date().toISOString(), status: 'incomplete', exitCode: 1, viewports: [], limitations: ['Viewport emulation, not physical touch testing', 'Technical tracer, not complete Phase 1 UI', 'No art approval'] }
try {
  server = await startFoundationServer()
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
  const page = await browser.newPage()
  page.setDefaultTimeout(12000)
  await page.goto(`${server.url}/foundation.html`, { waitUntil: 'domcontentloaded', timeout: 20000 })
  await page.locator('[data-phase=ready]').waitFor()
  for (const width of [320, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.screenshot({ path: path.join(output, `${width}.png`), fullPage: true })
    receipt.viewports.push(await page.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth, controls: [...document.querySelectorAll('a,button,input,summary')].map(el => { const r = el.getBoundingClientRect(); return { label: el.textContent || el.getAttribute('aria-label'), width: r.width, height: r.height } }), font: getComputedStyle(document.querySelector('main')).fontFamily })))
  }
  receipt.status = 'complete'; receipt.exitCode = 0
} catch (error) { receipt.status = 'failed'; receipt.error = String(error) }
finally {
  await browser?.close(); await server?.close()
  await fs.writeFile(path.join(output, 'receipt.json'), JSON.stringify(receipt, null, 2))
}
console.log(JSON.stringify(receipt, null, 2))
process.exitCode = receipt.exitCode
