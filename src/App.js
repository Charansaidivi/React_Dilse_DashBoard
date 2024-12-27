import React from 'react'
import "./App.css"
import LandingPage from './Vendor_DashBoard/pages/LandingPage'
import ErrorPage from './Vendor_DashBoard/components/Forms/ErrorPage'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
    </div>
  )
}

export default App
