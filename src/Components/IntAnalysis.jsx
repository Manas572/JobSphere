import React from 'react';

const IntAnalysis = ({ file, isPending, data, onStart }) => {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600/15 to-purple-600/10 blur-2xl rounded-3xl pointer-events-none" />

      <div className="relative rounded-2xl border border-gray-800 bg-gray-900/70 backdrop-blur-md p-6 shadow-2xl shadow-indigo-950/40">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs uppercase tracking-widest text-gray-500">Engine analysis</p>
          <span
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
              isPending
                ? 'bg-indigo-500/15 text-indigo-300'
                : data?.skills?.length > 0
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-gray-800 text-gray-500'
            }`}
          >
            {isPending ? 'Reading…' : data?.skills?.length > 0 ? 'Skills found' : 'Waiting for resume'}
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 border border-gray-800 mb-5">
          <div className="size-9 rounded-lg bg-indigo-600/20 flex items-center justify-center shrink-0">
            <svg className="w-[18px] h-[18px] text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-medium truncate ${file ? 'text-gray-100' : 'text-gray-600'}`}>
              {file ? file.name : 'No file selected'}
            </p>
            <p className="text-[11px] text-gray-600">{file ? `${(file.size / 1024).toFixed(0)} KB · PDF` : 'PDF format only'}</p>
          </div>
        </div>

        {data?.skills?.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            {onStart && (
              <button
                onClick={() => onStart(data.skills)}
                className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5"
              >
                Begin Interview →
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 rounded-full bg-gray-800/50" style={{ width: `${85 - i * 18}%` }} />
            ))}
            <p className="text-xs text-gray-600 pt-1">
              {isPending ? 'Extracting skills from your resume…' : 'Detected skills will appear here after upload.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntAnalysis;