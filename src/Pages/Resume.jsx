import React from 'react'
import ResumeCreator from '../Components/ResCard'
import NavbarComp from '../Components/NavbarComp'
import Resbelow from '../Components/Resbelow'
import Galaxy from '../Components/Galaxy'

const Resume = () => {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#0a0a10]">
      <Galaxy
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        transparent
        density={0.45}
        speed={0.3}
        glowIntensity={0.16}
        twinkleIntensity={0.25}
        mouseInteraction={false}
        mouseRepulsion={false}
      />
      <div className="relative z-10">
        <NavbarComp />
        <ResumeCreator />
        <Resbelow />
      </div>
    </main>
  )
}

export default Resume
