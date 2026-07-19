import React from "react";
import { Link } from "react-router-dom";

const AppSuccess = ({ job }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-200">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg mx-auto bg-[#00A63E]/5 backdrop-blur-sm border border-green-500/30 rounded-xl p-10 text-center">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h3 className="text-2xl font-semibold text-white mb-2">
            Application Sent!
          </h3>

          <p className="text-white/60 mb-6">
            Your profile has been submitted to {job.company_name} for the{" "}
            {job.title} role.
          </p>

          <Link
            to="/jobs"
            className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium border border-white/10 transition-all active:scale-95"
          >
            Browse More Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppSuccess;