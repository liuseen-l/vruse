import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import './styles/vars.css'
import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import PreferenceSwitch from './components/PreferenceSwitch.vue'

export default Object.assign({}, VPTheme, {
  ...DefaultTheme,
  // Layout: () => {
  //   return h(VPTheme.Layout, null, {
  //     'sidebar-top': () => h(PreferenceSwitch),
  //   })
  // },
  enhanceApp({ app }: { app: App }) {
  }
})

