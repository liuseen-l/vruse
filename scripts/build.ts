import assert from 'node:assert'
import { execSync as exec } from 'node:child_process'
import consola from 'consola'

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

if (require.main === module) cli()
