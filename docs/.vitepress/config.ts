import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import { defineConfig } from 'vitepress'
import {
  addonCategoryNames,
  categoryNames,
  coreCategoryNames,
  metadata,
} from '../metadata/metadata'
import { currentVersion, versions } from '../../meta/versions'

// guide
const Guide = [{ text: '开始', link: '/guide/' }]

/**
 * guide 目录
 */
// 二级目录
const CoreCategories = coreCategoryNames.map((c) => ({
  text: c,
  activeMatch: '___', // never active
  link: `/hooks#category=${c}`,
}))
// 一级目录
const DefaultSideBar = [
  { text: '指南', items: Guide },
  { text: '核心函数', items: CoreCategories },
]

/**
 *
 * vruse目录
 */
function getFunctionsSideBar() {
  const links = []

  for (const name of categoryNames) {
    if (name.startsWith('_')) continue

    // 获取隶属于当前目录下的函数
    const functions = metadata.functions.filter(
      (i) => i.category === name && !i.internal,
    )

    links.push({
      text: name, // 一级目录
      items: functions.map((i) => ({
        // 二级目录
        text: i.name,
        link: i.external || `/${i.package}/${i.name}/`,
      })),
      link: name.startsWith('@')
        ? functions[0].external || `/${functions[0].package}/README`
        : undefined,
    } as never)
  }
  return links
}

const FunctionsSideBar = getFunctionsSideBar()

/**
 *
 */
const editLink = {
  pattern: 'https://github.com/VR-use/VRuse/tree/main/docs/:path',
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
      '/vue/': FunctionsSideBar,
      '/hooks': FunctionsSideBar,
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/VR-use/VRuse',
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
