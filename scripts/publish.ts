import execa from 'execa'
// import path from 'node:path'
// import consola from 'consola'
// import { version } from '../package.json'
// import { packages } from '../meta/packages'
enum Publishs {
  PUBLISH_VUE = 1,
  PUBLISH_REACT = 2,
  PUBLISH_ALL = 3,
}

const publish_path = Number(process.env.NODE_ENV)

const command = 'npm publish --access public'

switch (publish_path) {
  case Publishs.PUBLISH_VUE:
    await execa('pnpm run build:rollup', { stdio: 'inherit' })

    break
  case Publishs.PUBLISH_REACT:
    break
  case Publishs.PUBLISH_ALL:
    await execa('pnpm run build:rollup', { stdio: 'inherit' })
    break
}

// execSync('pnpm run build:rollup', { stdio: 'inherit' })

// if (version.includes('beta'))
//   command += ' --tag beta'

// for (const { name } of packages) {
//   execSync(command, {
//     stdio: 'inherit',
//     cwd: path.join('packages', name, 'dist'),
//   })
//   consola.success(`Published @vruse/${name}`)
// }
