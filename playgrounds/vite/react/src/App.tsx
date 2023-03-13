import { useAxios } from '@vruse/react'
import React, { useState } from 'react'
function App() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1'
  const [loade, setLoade] = useState(true)
  async function test() {
    const { loading, data } = await useAxios(url)
    setLoade(loading)
  }
  test()

  return <>
    <div>
      {
        loade ? <div>finish</div> : <div>loading...</div>
      }

    </div>
  </>
}
export default App
