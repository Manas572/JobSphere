import React from 'react'
import { Link } from 'react-router-dom'

const JobNF = () => {
  return (
    <div>
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-200">
                <div className="flex-grow flex flex-col items-center justify-center gap-4">
                    <p className="text-zinc-500 text-lg">Job not found.</p>
                    <Link to="/jobs" className="text-green-500 hover:text-green-400 transition-colors">Return to Job Board</Link>
                </div>
            </div>
    </div>
  )
}

export default JobNF