import React from 'react'
import Home from './pages/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
    </div>
  )
}

export default App