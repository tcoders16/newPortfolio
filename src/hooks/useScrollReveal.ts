import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element enters the viewport.
 *
 * @param threshold - How much of the element should be visible before triggering
 * @param once - If true, the animation triggers only once and doesn't reset
 */
export function useScrollReveal(threshold = 0.1, once = false) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          // Disconnect if only showing once
          if (once && ref.current) observer.unobserve(ref.current);
        } else {
          // Reset visibility if not `once`
          if (!once) setVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, visible };
}