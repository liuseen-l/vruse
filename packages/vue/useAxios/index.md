---
category: 网络
---

# useAxios

Axios 的封装，既可以不带 await 使用，也可以带 await 使用

如果使用 `const { data } = useAxios('url')` 则 data 为一个 vue 响应式变量，初始值为 `undefined`，等待请求完成后自动变成请求结果，适用于非异步函数情景。

如果使用 `const { data } = await useAxios('url')` 则 data 直接为请求结果。

## 使用方式

### 不带 await
``` vue
<script setup lang=ts>
import { useAxios } from '@vruse/vue'

const { data, loading } = useAxios('https://wwww.demo.com/api')
</script>

<template>
  <div v-if="loading">
    loading...
  </div>
  <pre v-else>
    {{ data }}
  </pre>
</template>
```
### 异步模式使用

``` vue
<script setup lang=ts>
import { useAxios } from '@vruse/vue'
const res = ref()
const loading = ref(true)

async function run() {
  const { data } = await useAxios('https://wwww.demo.com/api')
  res.value = data.value
  loading.value = false
}
run()
</script>

<template>
  <div v-if="loading">
    loading...
  </div>
  <pre v-else>
    {{ data }}
  </pre>
</template>
```

### 使用外部自定义数据控制源
如果您觉得 useAxios 返回的 data 和 loading 还需要再次赋值给自己的源数据，比较繁琐，那么你可以提前准备好数据源，在请求时传入，我们可以将上一个示例修改为：

``` vue
<script setup lang=ts>
import { useAxios } from '@vruse/vue'
const res = ref()
const loading = ref(true)

async function run() {
  await useAxios('https://wwww.demo.com/api', {
    controller: {
      data: res,
      loading
    }
  })
}
run()
</script>

<template>
  <div v-if="loading">
    loading...
  </div>
  <pre v-else>
    {{ data }}
  </pre>
</template>
```

### 取消请求

``` vue
<script setup lang=ts>
import { useAxios } from '@vruse/vue'

const { data, loading, adbort } = useAxios('https://wwww.demo.com/api')
// 1000 后若还没有请求成功就取消
setTimeOut(adbort, 1000)
</script>

<template>
  <div v-if="loading">
    loading...
  </div>
  <pre v-else>
    {{ data }}
  </pre>
</template>
```



### 自定义 axios 实例
``` ts
import { useAxiosCreate } from '@vruse/vue'

// 可接受 axios 的配置对象
// 参考 https://axios-http.com/docs/req_config
useAxiosCreate({
  baseUrl: 'https://demo.com'
})
// 后续的 useAxios 都会使用这个实例
```
#### 维护多个实例
useAxios 默认使用最后一次创建的实例，如果您有维护多个 Axios 实例的需求，那么你可以多次调用 `useAxiosCreate()`，然后在调用 useAxios 时手动声明使用哪一个实例：

``` ts
import { useAxiosCreate } from '@vruse/vue'

// 可接受 axios 的配置对象
// 参考 https://axios-http.com/docs/req_config
const instance1 = useAxiosCreate({
  baseUrl: 'https://demo.com'
})

const instance2 = useAxiosCreate({
  baseUrl: 'https://demo2.com'
})

// 后续的 useAxios 默认会使用最后一次创建的实例
// 手动声明使用 instance1
useAxios('/api', {
  controller: {
    instance: instance1
  }
})
```

### 获取 axios 实例
``` ts
import { useAxiosInstance } from '@vruse/vue'
const instance = useAxiosInstance()
// Alter defaults after instance has been created
instance.defaults.headers.common.Authorization = AUTH_TOKEN
```
### 

### 修改 axios 配置
获取实例后修改即可

``` ts
import { useAxiosInstance } from '@vruse/vue'
const instance = useAxiosInstance()
// Alter defaults after instance has been created
instance.defaults.headers.common.Authorization = AUTH_TOKEN
```

#### 请求拦截，相应拦截
获取实例后修改即可
参考：[Axios 文档](https://axios-http.com/docs/interceptors)

``` ts
import { useAxiosInstance } from '@vruse/vue'
const instance = useAxiosInstance()
// 请求拦截
instance.interceptors.request.use(() => { /* ...*/ })
// 相应拦截
instance.interceptors.response.use(() => { /* ...*/ })
```
