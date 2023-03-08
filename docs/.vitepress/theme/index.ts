import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import './styles/vars.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {},
}
