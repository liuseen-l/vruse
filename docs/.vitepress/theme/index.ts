import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import './styles/vars.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import Home from './components/Home.vue'

export default {
  Home,
  ...DefaultTheme,
  enhanceApp({ app }) {},
}
