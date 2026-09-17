import React, { useState } from 'react';
import { useExtractSkills } from '../Queries/ExtractSkills';
import IntAnalysis from './IntAnalysis';

const Inthead = ({ onStart }) => {
  const [file, setFile] = useState(null);
  const { mutate: extractSkills, isPending, data } = useExtractSkills();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) extractSkills(file, {
      onSuccess: (data) => {
        console.log('Skills extracted:', data.skills);
      }
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a10]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('https://i.pinimg.com/736x/24/da/c8/24dac8c49f1c00396a072148ab2349c7.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a10]/80 via-[#0a0a10]/90 to-[#0a0a10]" />
      <div className="absolute -top-32 left-1/4 w-[36rem] h-72 bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-80 h-80 bg-purple-600/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-4 py-1.5 mb-7">
            <span className="size-1.5 rounded-full bg-indigo-400 animate-pulse" />
            AI-Powered Practice
          </span>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            Interviews that adapt
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400">
              to what you know.
            </span>
          </h1>

          <p className="mt-6 text-gray-400 leading-relaxed max-w-md">
            Upload your resume. The question engine reads your actual stack and
            escalates difficulty in real time — like a senior engineer across the table.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 max-w-md">
            <label
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-colors ${
                file
                  ? 'border-indigo-500/50 bg-indigo-500/10'
                  : 'border-gray-700/70 bg-gray-900/70 hover:border-indigo-500/40'
              }`}
            >
              <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.9A5 5 0 1115.9 6h.1a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3" />
              </svg>
              <span className={`text-sm font-medium truncate ${file ? 'text-gray-100' : 'text-gray-500'}`}>
                {file ? file.name : 'Upload resume (PDF)'}
              </span>
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            </label>
            <button
              type="submit"
              disabled={!file || isPending}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isPending && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isPending ? 'Analyzing resume…' : 'Start Interview'}
            </button>
          </form>
        </div>
        <IntAnalysis file={file} isPending={isPending} data={data} onStart={onStart} />
      </div>

      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-b from-transparent to-[#0a0a10] pointer-events-none" />
    </section>
  );
};

export default Inthead;