import { updatePackageJSON } from './utils'

async function run() {
  await Promise.all([updatePackageJSON()])
  // await fs.copy('./CONTRIBUTING.md', './packages/contributing.md')
}

run()
