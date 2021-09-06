import React from 'react'
import './App.scss'

function App () {
  console.log(process.env)

  console.log('haroro')

  return (
    <div>
      <div className="bg-red w-375">375px</div>
      <div className="bg-red w-750">750px</div>
      <div className="bg-red w-100 h-100">100*100</div>
    </div>
  )
}

export default App
