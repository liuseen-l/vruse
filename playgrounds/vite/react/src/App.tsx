// import React, { useEffect, useState } from 'react'
// import { usePick } from '@vruse/vue'

// function App() {
//   const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//   const [r, useR] = useState([])
//   const n = []

//   const hook = usePick(
//     {
//       data: arr,
//       pickCount: 5,
//       previewCount: 10,
//       previewDelay: 60,
//       pickDelay: 1000,
//       excludes: 4, // [4,2]
//     },
//     (v, _, l) => {
//       n[l as number] = v
//       useR([...n])
//     },
//   )

//   useEffect(() => {
//     hook.run()
//   }, [])

//   return <div>{r}</div>
// }

// export default App
