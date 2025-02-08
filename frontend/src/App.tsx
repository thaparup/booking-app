import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Layout from './layout/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { useAppContext } from './context/AppContext'
import AddHotel from './pages/AddHotel'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'

function App() {
  const { isLoggedIn } = useAppContext()
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><p>Home page</p></Layout>} />
        <Route path='/cart' element={<Layout><p>Search page</p></Layout>} />
        <Route path='/register' element={<Layout><Register /></Layout>} />
        <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />
        {isLoggedIn && <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />

          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
        </>


        }
      </Routes>
    </Router>
  )
}

export default App
