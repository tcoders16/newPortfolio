
import  { useEffect, useState } from 'react';

const ScrollReveal = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const triggerPoint = window.innerHeight * 1.2; // 120vh scroll point
      if (window.scrollY > triggerPoint) {
        setShowImage(true);
      } else {
        setShowImage(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative bg-white h-[400px] overflow-hidden">
      {/* Black hero section (optional, before reveal) */}
      <div className="h-screen w-screen bg-black" />

      {/* Animated Image Reveal */}
      <div className="flex justify-center mt-[120vh]">
        <img
          src="/your-image.png" // <-- use correct path
          alt="Pro Display Reveal"
          className={`w-[80%] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] 
            ${showImage ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
        />
      </div>
    </div>
  );
};

export default ScrollReveal;