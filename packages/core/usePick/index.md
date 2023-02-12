---
category: Utilities
---

# usePick

A hook with lottery function.

## Usage

```ts
import { reactive } from 'vue-demi'
import { usePick } from './index'
const arr = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

const r = reactive<number[]>([])

const hook = usePick(
  {
    data: arr,
    count: 5,
    pickDelay: 1000,
    previewDelay: 60,
  },
  (v, _, l) => {
    r[l as number] = v
  },
)

hook.run()
```
