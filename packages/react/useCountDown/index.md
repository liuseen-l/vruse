---
category: 业务型
---

# useCountDown

倒计时函数

## 使用方式

```vue
<script>
import { useCountDown } from '@vruse/react'

export default {
  setup() {
    const { days, hours, minutes, seconds } = useCountDown(1000 * 60 * 60 * 24, { immediate: true })

    return {
      days,
      hours,
      minutes,
      seconds
    }
  }
}
</script>

<template>
  <div>
    {{ days }}天{{ hours }}时{{ minutes }}分{{ seconds }}秒
  </div>
</template>
```
