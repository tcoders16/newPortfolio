import React, { useEffect, useState } from 'react';

const ZoomOutOnScroll = () => {
  // Tracks how far the user has scrolled in relation to the hero section
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // This function calculates how much of the hero section has scrolled
    const onScroll = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) return;

      const rect = hero.getBoundingClientRect(); // Get position relative to viewport
      const viewportHeight = window.innerHeight;
      const rawProgress = -rect.top / viewportHeight; // Negative because scrolling down moves rect.top upward

      // Clamp scroll progress between 0 and 1
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clamped);
    };

    // Add scroll listener on mount
    window.addEventListener('scroll', onScroll, { passive: true });

    // Cleanup on unmount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- Animation calculations ---
  const scale = 1 - progress * 0.6; // Zoom out from 1 → 0.4
  const opacity = 1 - progress * 0.4; // Fade from 1 → 0.6
  const textOffset = Math.max(0, 100 - progress * 140); // Text slides upward into view

  return (
    <div className="relative bg-white h-[130vh] overflow-hidden">
      {/*
        Hero Section:
        - Sticky container that remains pinned while user scrolls.
        - Scales and fades as the scroll progresses.
      */}
      <div
        id="hero-section"
        className="sticky top-0 h-screen w-screen flex items-center justify-center z-10"
        style={{
          transform: `scale(${scale})`, // Zoom out
          opacity,                     // Slight fade
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        }}
      >
        {/*
          Inner Black Box:
          - Takes up the full width and height of screen initially.
          - Centered with flex container.
        */}
        <div
          className="absolute w-screen h-screen bg-black"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center it precisely
            position: 'absolute',
          }}
        />
      </div>

      {/*
        Signature Text:
        - Starts off-screen.
        - Slides upward into view after scrolling past the hero section.
      */}
      <div
        className="absolute top-[100vh] w-full text-center text-3xl font-signature font-bold text-gray-900"
        style={{
          transform: `translateY(${textOffset}%)`, // Move text upward
          transition: 'transform 0.6s ease-out',
        }}
      >
        Solanki Omkumar
      </div>
    </div>
  );
};

export default ZoomOutOnScroll;