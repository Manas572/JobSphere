import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegPage from './Pages/RegPage'
import Home from './Pages/Home'
import Jobpage from './Pages/Jobpage'
import JobDetail from './Pages/Jobdetail'
import Apply from './Pages/Apply'
import Myprofile from './Pages/Myprofile'
import EducationUpdateForm from './Components/Eduupdform'
import ProjectUpdateForm from './Components/Proupdform'
import ExperienceUpdateForm from './Components/Expupdform'
import Resume from './Pages/Resume'
import ResCreate from './Pages/ResCreate'


function App() {

  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegPage />} />
        <Route path="/profile" element={<Myprofile />} />
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/resume/createres" element={<ResCreate />} />
        <Route path="/jobs" element={<Jobpage />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/edu/:id" element={<EducationUpdateForm />} />
        <Route path="/project/:id" element={<ProjectUpdateForm />} />
        <Route path="/exp/:id" element={<ExperienceUpdateForm />} />
      </Routes>
  )
}

export default App
