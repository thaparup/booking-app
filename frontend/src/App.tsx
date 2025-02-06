import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Layout from './layout/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><p>Home page</p></Layout>} />
        <Route path='/cart' element={<Layout><p>Search page</p></Layout>} />
        <Route path='/register' element={<Layout><Register /></Layout>} />
        <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
