
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


