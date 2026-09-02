import React from 'react';

const Inthead = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
      `}</style>
      
      <section className="flex flex-col items-center pb-48 text-center text-sm text-slate-700 max-md:px-4 bg-[url('https://i.pinimg.com/736x/24/da/c8/24dac8c49f1c00396a072148ab2349c7.jpg')] bg-cover bg-center relative overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-amber-400/20 rounded-full pointer-events-none"></div>

        <h1 className="font-outfit text-5xl/[55px] md:text-7xl/[80px] font-bold mt-8 max-w-5xl relative z-10 text-slate-950 tracking-tight">
          Next-Gen AI Interviews. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-800">
            Adaptive, Fast, Pure Signal.
          </span>
        </h1>
        
        <p className="text-base md:text-lg mt-6 max-w-2xl text-slate-500 leading-relaxed relative z-10 font-medium">
          Upload your resume and face a dynamically adjusting question engine. 
          Our fine-tuned models evaluate your mastery in real-time, escalating difficulty 
          just like a human senior engineer would.
        </p>

        <form className="flex items-center mt-10 max-w-lg h-16 w-full rounded-full border border-slate-300 bg-white/80 backdrop-blur-md relative z-10 shadow-xl focus-within:border-blue-700 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all duration-300">
          <input 
            type="file" 
            accept=".pdf,.doc,.docx"
            className="w-full outline-none bg-transparent pl-4 pr-2 text-slate-600 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 file:cursor-pointer file:transition-colors" 
          />
          <button 
            type="submit"
            className="bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white text-nowrap px-8 md:px-10 h-12 mr-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Start Interview
          </button>
        </form>
        
      </section>
    </>
  );
};

export default Inthead;