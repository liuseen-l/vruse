import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import './styles/vars.css'
import './styles/demo.css'
import { h, App } from 'vue'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

export default Object.assign({}, DefaultTheme, {

  enhanceApp({ app }: { app: App }) {
  }
})

