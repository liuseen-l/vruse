<script lang='ts' setup>
import { ref } from 'vue-demi'
import { useGet } from '.'

const url = ref('https://sdfsdf.dev/3p')
const res = ref()
const loading = ref(false)

function runWithoutAwait() {
  /** 不使用 await 的用法，那么 data 会是一个响应式的变量，一开始值为 null，等待请求结束后自动变成请求结果 */
  const { data } = useGet(url.value)
  res.value = data
}

async function run() {
  /** 使用 await 的用法，那么 data 就是请求结果的数据 */
  const { data } = await useGet(url.value)
  res.value = data
}

/** 使用外部数据控制源的示例 */
function runWithCustomControlSource() {
  useGet(url.value, undefined, {
    controller: {
      data: res,
      loading,
    },
  })
}

function runAndAbord() {
  const { abort } = useGet(url.value)
  /** 取消请求 */
  abort()
}
</script>

<template>
  <input v-model="url">
  <button @click="runWithoutAwait">
    执行请求（无 await 版本）
  </button>
  <button @click="run">
    执行请求
  </button>
  <button @click="runWithCustomControlSource">
    执行请求 （使用外部数据控制源的示例）
  </button>
  <button @click="runAndAbord">
    执行请求后取消
  </button>
  <pre>
    {{ res }}
  </pre>
</template>
