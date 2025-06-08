import React, { useEffect, useState } from 'react';

const ZoomOutOnScroll = () => {
  const [scale, setScale] = useState(1);
  const [textOffset, setTextOffset] = useState(100); // % for translateY

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 1200; // Slow scroll distance
      const minScale = 0.4;   // Final zoom-out scale

      const scrollProgress = Math.min(scrollY, maxScroll) / maxScroll;
      const easedProgress = Math.pow(scrollProgress, 0.8); // easing

      setScale(1 - easedProgress * (1 - minScale));
      setTextOffset(Math.max(0, 100 - scrollProgress * 150));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[3000px] bg-white overflow-hidden">
      {/* Text reveal */}
      <div
        className="absolute top-[100vh] w-full text-center text-3xl font-signature font-bold text-gray-900"
        style={{
          transform: `translateY(${textOffset}%)`,
          transition: 'transform 0.6s ease-out',
        }}
      >
        Solanki Omkumar
      </div>

      {/* Zooming full-screen rectangle */}
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default ZoomOutOnScroll;