---
category: 业务型
---

# usePick

抽奖函数

## 使用方式

```vue
<script>
import { usePick } from '@vruse/vue'
import { ref } from 'vue'

export default {
  setup() {
    const r = ref<number>(0)
    const { run, pickedList } = usePick([1, 2, 3, 6, 7, 8, 9, 10], {
      pickCount: 5,
      excludes: 1,
    }, (v) => {
      r.value = v
    })

    run()

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
