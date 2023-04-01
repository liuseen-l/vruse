import { join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import fs from 'fs-extra'
import MagicString from 'magic-string'


const globalMatchReg = /-{3}/g

export function MarkdownTransform(): Plugin {
  const DIR_TYPES = resolve(__dirname, '../../../types/packages')
  const hasTypes = fs.existsSync(DIR_TYPES)

  if (!hasTypes)
    console.warn('No types dist found, run `npm run build:types` first.')

  return {
    name: 'vruse-md-transform',
    enforce: 'pre',

    async transform(code, id) {
      
      const idAry = id.split('/')

      if (!id.match(/\.md\b/) || !['vue','react','shared'].includes(idAry[idAry.length-3]))
        return null

      const s = new MagicString(code)

      const match = Array.from(code.matchAll(globalMatchReg))[1]

      s.appendRight(match.index! + 3, '\n\n<Check/>')

      return s.toString()
    }
  }
}
