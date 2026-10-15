'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';

const DISPLAY_MS = 2000;

/**
 * One-time splash shown on first paint of a full page load (the root
 * layout persists across client-side <Link> transitions, so this never
 * re-shows on internal navigation — only on a hard load/refresh).
 *
 * Always starts visible, identically on the server and on the client's
 * first render, so there's nothing for React to reconcile differently
 * during hydration — it only changes state inside useEffect, which runs
 * client-side only, after hydration has already succeeded. Reduced-motion
 * is handled automatically by the MotionConfig wrapper in ThemeProvider.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => setVisible(false), DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ''; }}>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 12% -5%, #2f8fff29 0%, transparent 60%), radial-gradient(ellipse 50% 35% at 100% 8%, #ff8a3d1f 0%, transparent 55%), #050a14' }}
        >
          {/*
            No mount-triggered initial/animate transition on this wrapper or
            the image: nesting a one-shot entrance animation inside
            AnimatePresence hit a Framer Motion + React Strict Mode dev
            double-invoke quirk where it got stuck at `initial` (opacity 0)
            and never reached `animate` — the image was in the DOM, fully
            loaded, computed opacity 1 on itself, but its animated parent
            never fired. The glow and dots below are unaffected because
            they use a continuous `animate` keyframe array, not a one-time
            mount transition, which doesn't hit that path.
          */}
          <div className="relative flex items-center justify-center">
            <motion.span
              aria-hidden="true"
              className="absolute h-24 w-24 rounded-full blur-2xl"
              style={{ background: 'var(--brand)' }}
              animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.85, 1.1, 0.85] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Image
              src="/images/datanest-logo-mark.png"
              alt=""
              width={88}
              height={88}
              priority
              className="relative object-contain"
            />
          </div>

          <div className="flex items-center gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--brand)' }}
                animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </div>

          <span className="sr-only">Loading DataNest BD…</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
