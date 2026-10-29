'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

interface SectionVideoProps {
  /** Matches the rendered file names: /videos/<id>.mp4, .webm and .jpg */
  id: string;
  width: number;
  height: number;
  label: string;
  className?: string;
}

/**
 * Plays only while ≥40% visible, never downloads until then (preload="none"),
 * and degrades to the static poster frame under prefers-reduced-motion —
 * matches the autoplay-without-user-gesture allowance (muted) while staying
 * off the network and off the main thread until it's actually on screen.
 */
export function SectionVideo({ id, width, height, label, className }: SectionVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useSyncExternalStore(
    (onStoreChange) => {
      const query = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onChange = () => onStoreChange();
      query.addEventListener('change', onChange);
      return () => query.removeEventListener('change', onChange);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const poster = `/videos/${id}.jpg`;

  if (reduceMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative poster, not the LCP image
      <img
        src={poster}
        alt=""
        width={width}
        height={height}
        className={className}
        style={{ aspectRatio: `${width} / ${height}`, width: '100%', height: 'auto', objectFit: 'cover' }}
      />
    );
  }

  return (
    <video
      ref={ref}
      muted
      playsInline
      loop
      preload="none"
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      className={className}
      style={{ aspectRatio: `${width} / ${height}`, width: '100%', height: 'auto', objectFit: 'cover' }}
    >
      <source src={`/videos/${id}.webm`} type="video/webm" />
      <source src={`/videos/${id}.mp4`} type="video/mp4" />
    </video>
  );
}
