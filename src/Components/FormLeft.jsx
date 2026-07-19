import React from 'react';

const WizardLayout = ({ step, title, description, children }) => {
    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
            </style>

            <section className="bg-black px-4 py-24 min-h-screen flex items-center">
                <div className="w-full mx-auto flex flex-col lg:flex-row max-lg:items-center justify-center gap-12 lg:gap-16">
                    
                    {/* Common Left Side - Context */}
                    <div className="flex flex-col mt-10 max-w-sm">
                        <p className="text-sm max-lg:text-center font-medium text-green-600 uppercase mb-2">
                            Step {step} of 4
                        </p>
                        <h1 className="text-5xl/14 max-lg:text-center font-bold text-white mb-4">
                            {title}
                        </h1>
                        <p className="text-base/5.5 text-zinc-500 max-lg:text-center">
                            {description}
                        </p>
                        
                        {/* Dynamic Progress Indicators */}
                        <div className="flex items-center max-lg:justify-center gap-3 mt-8">
                            {[1, 2, 3, 4].map((indicator) => (
                                <div 
                                    key={indicator} 
                                    className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                                        step >= indicator ? 'bg-green-600' : 'bg-neutral-800'
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Dynamic Form Passed as Children */}
                    <div className="w-full max-w-2xl border border-neutral-800 rounded-2xl p-8 bg-black">
                        {children}
                    </div>
                    
                </div>
            </section>
        </>
    );
};

export default WizardLayout;