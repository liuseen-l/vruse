---
category: 业务型
---

# usePick

抽奖函数

## 使用方式

```ts
import { ref } from 'vue'
import { usePick } from './index'

const r = ref<number>(0)
const p = usePick([1, 2, 3, 6, 7, 8, 9, 10], 5, (v) => {
  r.value = v
})

p.run()
```
