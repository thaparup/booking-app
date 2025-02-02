import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Layout from './layout/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><p>Home page</p></Layout>} />
        <Route path='/cart' element={<Layout><p>Search page</p></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
