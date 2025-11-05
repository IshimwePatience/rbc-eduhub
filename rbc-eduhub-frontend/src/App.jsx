import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Homepage from './component/homepage'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Homepage />
      </div>
    </BrowserRouter>
  )
}

export default App