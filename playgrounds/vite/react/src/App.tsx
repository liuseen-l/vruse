import React from 'react'
import { useCountDown } from '@vruse/react'

function App() {
  const { days, hours, minutes, seconds } = useCountDown(1000 * 60 * 60 * 24, { immediate: true })

  return <>
    <div>
      {days}天{hours}时{minutes}分{seconds}秒
    </div>
  </>
}

export default App
