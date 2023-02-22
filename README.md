## 🚀 Features

- 🎪 [**Interactive docs & demos**](https://vueuse.org)
- 🕶 **Seamless migration**: Works for **both** Vue 3 and React 18
- ⚡ **Fully tree shakeable**: Only take what you want, [bundle size](https://vueuse.org/export-size)
- 🦾 **Type Strong**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc)
- 🔋 **SSR Friendly**
- 🌎 **No bundler required**: Usable via CDN
- 🔩 **Flexible**: Configurable event filters and targets
- 🔌 **Optional [Add-ons](https://vueuse.org/add-ons)**: Router, Firebase, RxJS, etc.

## 🦄 Usage

```ts
import { usePick } from "@vruse/core";

export default {
  setup() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const r = reactive<number[]>([]);

    const hook = usePick(
      {
        data: arr,
        pickCount: 5,
        previewCount: 10,
        previewDelay: 60,
        pickDelay: 1000,
        excludes: 4, // [4,2]
      },
      (v, _, l) => {
        r[l as number] = v;
      }
    );

    hook.run();

    return { r };
  },
};
```

Refer to [functions list](https://vueuse.org/functions) or [documentations](https://vueuse.org/) for more details.

## 📦 Install

> 🎩 From v4.0, it works for Vue 3 & React 18 **within a single package** by the power of [vue-demi](https://github.com/vueuse/vue-demi)!

```bash
npm i @vruse/core
```

[Add ons](https://vueuse.org/add-ons.html) | [Nuxt Module](https://vueuse.org/guide/index.html#nuxt)

> From v6.0, vruse requires `vue` >= v3.2 or `@vue/composition-api` >= v1.1
> From v6.0, vruse requires `react` >= v16.8 

###### Demos

- [Vite + Vue 3](https://github.com/vueuse/vueuse-vite-starter)
- [Webpack + Vue 3](https://github.com/vueuse/vueuse-vue3-example)
- [vite + React18](https://github.com/antfu/vitesse-nuxt-bridge)
- [webpack + React18](https://github.com/antfu/vitesse-nuxt-bridge)

### CDN

It will be exposed to global as `window.VueUse`

## 🪴 Project Activity

![Alt](https://repobeats.axiom.co/api/embed/a406ba7461a6a087dbdb14d4395046c948d44c51.svg "Repobeats analytics image")
