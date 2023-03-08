import { execSync } from 'node:child_process'
import path from 'node:path'
import consola from 'consola'
import { version } from '../package.json'
import { packages } from '../meta/packages'

// execSync('pnpm run build:rollup', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta'))
  command += ' --tag beta'

for (const { name } of packages) {
  execSync(command, {
    stdio: 'inherit',
    cwd: path.join('packages', name, 'dist'),
  })
  consola.success(`Published @vruse/${name}`)
}
