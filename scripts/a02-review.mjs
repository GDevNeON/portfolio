import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'

const output = path.resolve('../.planning/spikes/001-a02-crystal-cave/evidence')
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
const errors = []
page.on('pageerror', e => { errors.push(e.message); console.log('PAGE ERROR:', e.message) })
page.on('console', msg => { if (msg.type() === 'error') { errors.push(msg.text()); console.log('CONSOLE ERROR:', msg.text()) } })
const base = process.env.A02_URL || 'http://127.0.0.1:4173/a02.html'
try {
  console.log('Opening', base)
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(5000)
  await page.screenshot({ path: path.join(output, '00-loading.png') })
  console.log('Initial DOM:', (await page.locator('body').innerText()).slice(0, 400))
  await page.getByRole('heading', { name: 'Nơi ánh sáng bắt đầu' }).waitFor({ timeout: 120000 })
  await page.waitForTimeout(1000)
  for (const [name, file] of [['Bóng tối','01-entrance'],['Pha lê','02-crystal'],['Lữ hành','03-traveller'],['Ánh sáng','04-exit']]) {
    await page.getByRole('navigation', { name: 'Các góc nhìn A02' }).getByRole('button', { name, exact: false }).click()
    await page.waitForTimeout(500)
    await page.screenshot({ path: path.join(output, file + '.png') })
    console.log('Captured', file)
  }
  await page.getByRole('navigation').getByRole('button', { name: 'Pha lê', exact: false }).click()
  await page.getByRole('button', { name: 'Tùy chỉnh' }).click()
  await page.getByText('Thông tin phiên xem', { exact: true }).click()
  const download = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Tải báo cáo phiên xem' }).click()
  await (await download).saveAs(path.join(output, 'browser-session.json'))
  await page.getByLabel('Pha lê — so sánh vật liệu').selectOption('mineral')
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Đóng tùy chỉnh' }).click()
  await page.screenshot({ path: path.join(output, '05-mineral-comparison.png') })
  await page.setViewportSize({ width: 600, height: 1200 })
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(output, '06-portrait.png') })
  const canvas = await page.locator('canvas').count()
  await fs.writeFile(path.join(output, 'browser-errors.json'), JSON.stringify({ canvas, errors }, null, 2))
  console.log(JSON.stringify({ canvas, errors, output }))
} finally {
  await fs.writeFile(path.join(output, 'browser-errors.json'), JSON.stringify({ errors }, null, 2))
  await browser.close()
}
