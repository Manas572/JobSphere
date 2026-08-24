import React from 'react'
import Controls from '../Components/Controls'
import Preview from '../Components/Preview'

const ResCreate = () => {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Controls />
      <Preview />
    </div>
  )
}

export default ResCreate