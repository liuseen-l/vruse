import { defineConfig } from 'vitepress'
import {
  categoryNames,
  coreCategoryNames,
  metadata,
  _categories,
} from '../metadata/metadata'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'

// guide
const Guide = [{ text: '开始', link: '/guide/' }]

// useHook
const CoreCategories = coreCategoryNames.map((c) => ({
  text: c,
  activeMatch: '___', // never active
  link: `/hooks/functions#category=${c}`,
}))

const DefaultSideBar = [
  { text: '指南', items: Guide },
  { text: '核心hook', items: CoreCategories },
]

const FunctionsSideBar = getFunctionsSideBar()

const editLink = {
  pattern: 'https://github.com/code-ManL/VRuse/tree/main/docs/:path',
  text: 'Suggest changes to this page',
}

// export default config;
export default defineConfig({
  title: '🔨  VRuse',
  description: '一款现代化快速开发 hook 仓库',
  lang: 'en-US',
  ignoreDeadLinks: true,
  lastUpdated: true,
  outDir: './dist',
  themeConfig: {
    sidebar: {
      '/guide/': DefaultSideBar,
      '/hooks/': FunctionsSideBar,
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/code-ManL/VRuse',
      },
    ],
    editLink,
  },

  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin)
    },
  },
})

function getFunctionsSideBar() {
  const links: any = []

  for (let i = 0; i < _categories.length; i++) {
    const name = _categories[i]

    const functions = (metadata.functions as any)[name]

    if (name.startsWith('_') || functions.length === 0) continue

    links.push({
      text: categoryNames[i],
      items: functions.map((i) => ({
        text: i.name,
        link: `/hooks/${i.category}/${i.name}/`,
      })),
    })
  }

  // for (const name of _categories) {

  //   const functions = (metadata.functions as any)[name]

  //   console.log(functions);

  //   if (name.startsWith('_') || functions.length === 0)
  //     continue

  //   links.push({
  //     text: categoryNames[i],
  //     items: functions.map(i => ({
  //       text: i.name,
  //       link: `/hooks/${i.category}/${i.name}/`,
  //     })),
  //   })

  // }
  return links
}
