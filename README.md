<p align="center">
<a href="https://github.com/vueuse/vueuse#gh-light-mode-only">
  <img src="https://raw.githubusercontent.com/vueuse/vueuse/main/packages/public/logo-vertical.png#gh-light-mode-only" alt="VueUse - Collection of essential Vue Composition Utilities" width="300">
</a>
<a href="https://github.com/vueuse/vueuse#gh-dark-mode-only">
  <img src="https://raw.githubusercontent.com/vueuse/vueuse/main/packages/public/logo-vertical-dark.png#gh-dark-mode-only" alt="VueUse - Collection of essential Vue Composition Utilities" width="300">
</a>
<br>
Collection of essential Vue Composition Utilities
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@vueuse/core" target="__blank"><img src="https://img.shields.io/npm/v/@vueuse/core?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@vueuse/core" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vueuse/core?color=50a36f&label="></a>
<a href="https://vueuse.org" target="__blank"><img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=1e8a7a" alt="Docs & Demos"></a>
<img alt="Function Count" src="https://vueuse.org/badge-function-count.svg">
<br>
<a href="https://github.com/vueuse/vueuse" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/vueuse/vueuse?style=social"></a>
</p>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'>
  </a>
</p>

## 🚀 Features

- 🎪 [**Interactive docs & demos**](https://vueuse.org)
- 🕶 **Seamless migration**: Works for **both** Vue 3 and 2
- ⚡ **Fully tree shakeable**: Only take what you want, [bundle size](https://vueuse.org/export-size)
- 🦾 **Type Strong**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc)
- 🔋 **SSR Friendly**
- 🌎 **No bundler required**: Usable via CDN
- 🔩 **Flexible**: Configurable event filters and targets
- 🔌 **Optional [Add-ons](https://vueuse.org/add-ons)**: Router, Firebase, RxJS, etc.

## 🦄 Usage

```ts
import { useLocalStorage, useMouse, usePreferredDark } from "@vueuse/core";

export default {
  setup() {
    // tracks mouse position
    const { x, y } = useMouse();

    // is user prefers dark theme
    const isDark = usePreferredDark();

    // persist state in localStorage
    const store = useLocalStorage("my-storage", {
      name: "Apple",
      color: "red",
    });

    return { x, y, isDark, store };
  },
};
```

Refer to [functions list](https://vueuse.org/functions) or [documentations](https://vueuse.org/) for more details.

## 📦 Install

> 🎩 From v4.0, it works for Vue 2 & 3 **within a single package** by the power of [vue-demi](https://github.com/vueuse/vue-demi)!

```bash
npm i @vueuse/core
```

[Add ons](https://vueuse.org/add-ons.html) | [Nuxt Module](https://vueuse.org/guide/index.html#nuxt)

> From v6.0, VueUse requires `vue` >= v3.2 or `@vue/composition-api` >= v1.1

###### Demos

- [Vite + Vue 3](https://github.com/vueuse/vueuse-vite-starter)
- [Webpack + Vue 3](https://github.com/vueuse/vueuse-vue3-example)
- [vite + React18](https://github.com/antfu/vitesse-nuxt-bridge)
- [webpack + React18](https://github.com/antfu/vitesse-nuxt-bridge)

### CDN

It will be exposed to global as `window.VueUse`

## 🪴 Project Activity

![Alt](https://repobeats.axiom.co/api/embed/a406ba7461a6a087dbdb14d4395046c948d44c51.svg "Repobeats analytics image")


