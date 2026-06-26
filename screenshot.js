import { spawn } from 'child_process'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import os from 'os'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(os.homedir(), 'Downloads', 'cakemaster-screenshots')

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
const existing = fs.readdirSync(outputDir).filter(f => f.endsWith('.png'))
existing.forEach(f => fs.unlinkSync(path.join(outputDir, f)))

const serverProcess = spawn('npx', ['serve', 'dist', '-p', '3457', '--no-clipboard'], {
  cwd: __dirname,
  stdio: 'pipe',
  shell: true
})

await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('Server start timeout')), 15000)
  const handler = (data) => {
    if (data.toString().includes('http')) { clearTimeout(timeout); setTimeout(resolve, 1000) }
  }
  serverProcess.stdout.on('data', handler)
  serverProcess.stderr.on('data', handler)
})

let browser
const labels = ['Home', 'Browse', 'Course Detail', 'My Learning', 'Cart & Checkout']

try {
  browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 2400, height: 1400, deviceScaleFactor: 3 })

  await page.goto('http://localhost:3457', { waitUntil: 'networkidle0', timeout: 15000 })
  await page.waitForSelector('.screen-wrapper', { timeout: 10000 })

  const wrappers = await page.$$('.screen-wrapper')
  console.log(`Found ${wrappers.length} phone frames at 3x resolution`)

  for (let i = 0; i < wrappers.length; i++) {
    const name = labels[i] || `screen-${i + 1}`
    const safe = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const sp = path.join(outputDir, `${i + 1}-${safe}.png`)
    await wrappers[i].screenshot({ path: sp })
    console.log(`[${i + 1}/5] ${safe}.png`)
  }

  const fp = path.join(outputDir, '0-all-screens.png')
  await page.screenshot({ path: fp, fullPage: true })
  console.log('Full view saved')

  console.log('\nSaved to:', outputDir)
} catch (e) {
  console.error('Error:', e.message)
} finally {
  if (browser) await browser.close()
  serverProcess.kill()
  process.exit(0)
}
