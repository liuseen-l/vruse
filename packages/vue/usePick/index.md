---
category: Utilities
---

# usePick

A hook with lottery function.

## Usage

```ts
import { ref } from 'vue'
import { usePick } from './index'

const r = ref<number>(0)
const p = usePick([1, 2, 3, 6, 7, 8, 9, 10], 5, (v) => {
  r.value = v
})

p.run()
```
