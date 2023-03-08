import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import './styles/vars.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import { h } from 'vue'
export default {
  ...DefaultTheme,
  PreferenceSwitch: PreferenceSwitch,
  enhanceApp({ app }) {},
}
