import { join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import fs from 'fs-extra'
import MagicString from 'magic-string'

export function MarkdownTransform(): Plugin {
  
  return {
    name: 'vruse-md-transform',
    enforce: 'pre',

    async transform(code, id) {
      
      const idAry = id.split('/')
      const pkgName= idAry[idAry.length-3]
      const functionName = idAry[idAry.length-2]

      if (!id.match(/\.md\b/) || !['vue','react','shared'].includes(pkgName))
        return null

      const s = new MagicString(code)

      const matchCategory = Array.from(code.matchAll( /-{3}/g))[1]

      
      const { footer, header } = await getFunctionMarkdown(pkgName, functionName)
      
      code = s.appendRight(matchCategory.index! + 3, '\n\n<Check/>\n' + header).toString()

      return code
    }
  }
}

const DIR_SRC = resolve(__dirname, '../../../packages/')
const GITHUB_BLOB_URL = 'https://github.com/VR-use/vruse/tree/main/packages'

export async function getFunctionMarkdown(pkg: string, name: string) {
  const URL = `${GITHUB_BLOB_URL}/${pkg}/${name}`

  const dirname = join(DIR_SRC, pkg, name)
  const demoPath = ['demo.vue'].find(i => fs.existsSync(join(dirname, i)))
 
  const links = ([
    ['Source', `${URL}/index.ts`],
    demoPath ? ['Demo', `${URL}/${demoPath}`] : undefined,
    ['Docs', `${URL}/index.md`],
  ])
    .filter(i => i)
    .map(i => `[${i![0]}](${i![1]})`).join(' • ')

  const sourceSection = `## Source\n\n${links}\n`

  const ContributorsSection = `
## Contributors

<Contributors fn="${name}" />
  `

  const demoSection = demoPath ?
 `
<script setup>
import Demo from \'../../../packages/${pkg}/${name}/${demoPath}\'
</script>

## 示例

<DemoContainer>
<p class="demo-source-link"><a href="${URL}/${demoPath}" target="_blank">source</a></p>
<Demo/>
</DemoContainer>
`
: ''

  const footer = `${sourceSection}\n${ContributorsSection}\n`

  const header = demoSection 

  return {
    footer,
    header,
  }
}
