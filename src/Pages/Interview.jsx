import React, { useState } from 'react'
import Inthead from '../Components/Inthead'
import NavbarComp from '../Components/NavbarComp'
import Footer from '../Components/Footer'

const Interview = () => {
  const [skills, setSkills] = useState(null);

  return (
    <div>
      <NavbarComp />
    <Inthead />
    <Footer />
    </div>
  )
}

export default Interview