import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useScrollReveal } from '../hooks/useScrollReveal';

const RevealSection = () => {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div className="relative bg-white flex flex-col items-center justify-center">
      {/* Animated text block */}
      <div
        ref={ref}
        className={`
          absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2
          transition-all duration-[3000ms] ease-out
          ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
        `}
      >
        <div className="w-[90vw] max-w-[1500px] px-6 py-8">
          <div className="text-7xl font-pixel font-bold text-center text-black">
            Mobile,&nbsp;
            <span className="bg-gradient-to-r from-[#007cf0] via-[#00dfd8] to-[#7928ca] bg-clip-text text-transparent transition-colors duration-700">
              <Typewriter
                words={['Web', 'Web3.0']}
                loop={0} // infinite loop
                cursor
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={100}
                delaySpeed={1500}
              />
            </span>
            , AI Agents Stitched with System‑Level 🤔💭.
          </div>
        </div>
      </div>

      {/* Static image below */}
      <div className="mt-[60vh] flex flex-col items-center z-0 mb-96">
        <img
          src="/images/final5.png"
          alt="Omkumar Solanki"
          className="w-[40%] max-w-[800px] rounded-[50px]"
        />
      </div>
    </div>
  );
};

export default RevealSection;