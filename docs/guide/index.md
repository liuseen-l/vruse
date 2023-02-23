# 🔨 vruse 是什么?

一款功能型、业务型的现代化快速开发 hook 仓库

## Features

- ⚡️ Vue 3, Vite 4, pnpm, ESBuild - born with fastness
- 🦾 TypeScript, of course
- 🗂 File based routing
- ⚙️ Unit Testing with Vitest
- 😃 Eslint + Prittier
- 🎨 UnoCSS - the instant on-demand atomic CSS engine
- 🌍 I18n ready
- 🚘 CI/CD with GithubActions

## Install

```bash
npm i @vruse/core
```

## Quick Start

for vue
```vue
<template>
  <div>{{ r }}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { usePick } from '@vruse/core'
const arr = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

const r = reactive<number[]>([])

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
    r[l as number] = v
  },
)

hook.run()
</script>
```


> 🎩 for react
```tsx
import React, { useState } from 'react'
import { usePick } from '@vruse/core'

function App() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [r, useR] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

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
      r[l as number] = v
    },
  )

  hook.run()

  return <div>{{ r }}</div>
}
```

## Browser Support

Modern browsers and Internet Explorer 10+.

## Join Discussion Group

Scan the QR code using [Dingtalk App](https://www.dingtalk.com/) to join in discussion group :

<img alt="Join Discusion Group" src="https://github.com/smarty-team/smarty-admin/blob/main/assets/dingding.jpeg" width="300">
