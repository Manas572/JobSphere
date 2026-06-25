import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegPage from './Pages/RegPage'
import Home from './Pages/Home'
import Jobpage from './Pages/Jobpage'
import JobDetail from './Pages/Jobdetail'
import Apply from './Pages/Apply'


function App() {

  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobpage />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/apply/:id" element={<Apply />} />
      </Routes>
  )
}

export default App
