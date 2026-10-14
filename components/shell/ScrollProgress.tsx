'use client';

import { useEffect, useRef } from 'react';

/**
 * A thin fixed bar at the very top of the viewport tracking scroll depth.
 * Mounted once in the root layout so every page gets it for free. Reads
 * the DOM directly via a ref instead of state so scroll doesn't trigger
 * React re-renders.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="ds-scroll-progress">
      <div ref={barRef} className="ds-scroll-progress-bar" />
    </div>
  );
}
