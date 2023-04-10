# 🔨 VRuse 是什么?

一款功能型、业务型的现代化快速开发 hook 仓库

# 介绍


VRuse 是一款基于 Vue [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) 和 React [Composition API](https://reactjs.org/) 的 hook 仓库. 
在使用之前，你需要对 Vue [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) 或者 React [Composition API](https://reactjs.org/) 的基本使用方式有一定的了解. 

## 安装

如果你是 Vue 项目，那么执行如下操作：
```vue
npm i @vruse/vue
```

如果你是 React 项目，那么执行如下操作：
```react
npm i @vruse/react
```

> From v6.0, vruse requires `vue` >= v3.2 or `@vue/composition-api` >= v1.1 <br/> From v6.0, vruse requires `react` >= v16.8

###### Demos

- Vite + Vue 3
- Webpack + Vue 3
- vite + Reat 18
- Creat React App + React 18

## 快速开始

> 🎩 Vue

从 `@vueuse/vue` 中导入所需的函数 

```vue
<script>
import { usePick } from '@vruse/vue'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const r = ref<number>(0)
    const { run, pickedList } = usePick([1, 2, 3, 6, 7, 8, 9, 10], {
      pickCount: 5,
      excludes: 1,
    }, (v) => {
      r.value = v
    })

    onMounted(() => {
      run()
    })

    return {
      r,
      pickedList
    }
  }
}
</script>

<template>
  <div>{{ pickedList }}</div>
  <div>{{ r }}</div>
</template>
```

> 🎩 React

从 `@vueuse/react` 中导入所需的函数 

```tsx
import { usePick } from '@vruse/react'
import React, { useEffect, useState } from 'react'

function App() {
  const [r, setR] = useState(0)

  const { run, pickedList } = usePick(
    [1, 2, 3, 6, 7, 8, 9, 10],
    {
      pickCount: 5,
    },
    (v) => {
      setR(v)
    },
  )

  useEffect(() => {
    run()
  }, [])

  return (
    <>
      <div>{pickedList}</div>
      <div>{r}</div>
    </>
  )
}
```

## 按需引入

在引入hook时，可以通过引入指定的hook目录，这样可以得到更精准的类型提示

> 🎩 Vue

从 `@vueuse/vue/usePick` 目录下导入usePick 
```ts
import { usePick } from '@vruse/vue/usePick'
```

> 🎩 React

从 `@vueuse/react/usePick` 目录下导入usePick 
```ts
import { usePick } from '@vruse/react/usePick'
```


## 浏览器支持

现代浏览器以及IE10+


