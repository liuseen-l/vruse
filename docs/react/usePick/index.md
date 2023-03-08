---
category: 业务型
---

# usePick

抽奖函数.

## 使用方式

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
      // setR(v)
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
export default App
```
