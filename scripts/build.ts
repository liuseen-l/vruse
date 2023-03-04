import assert from 'node:assert'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync as exec } from 'child_process'
import consola from 'consola'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

assert(process.cwd() !== __dirname)

async function build() {
  consola.info('Clean up')
  exec('pnpm run clean', { stdio: 'inherit' })

  consola.info('Rollup')
  exec(`pnpm run build:rollup`, { stdio: 'inherit' })
}

async function cli() {
  try {
    await build()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export { build }

cli()
