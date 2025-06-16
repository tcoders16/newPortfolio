import { useRef, useEffect } from 'react';

const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const startDrag = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const stopDrag = () => { isDown = false; };

    const onDrag = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mouseleave', stopDrag);
    container.addEventListener('mouseup', stopDrag);
    container.addEventListener('mousemove', onDrag);

    return () => {
      container.removeEventListener('mousedown', startDrag);
      container.removeEventListener('mouseleave', stopDrag);
      container.removeEventListener('mouseup', stopDrag);
      container.removeEventListener('mousemove', onDrag);
    };
  }, []);

  return ref;
};

export default useDragScroll;