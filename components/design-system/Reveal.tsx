'use client';

import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** 'up' (default) for sections, 'scale' for cards/tiles in a grid. */
  variant?: 'up' | 'scale';
}

/**
 * The standard modern-software-site scroll animation: content fades and
 * lifts into place once, the first time it enters the viewport. Runs once
 * (not on every re-scroll) and honours prefers-reduced-motion automatically
 * via the MotionConfig wrapper already set up in ThemeProvider.
 */
export function Reveal({ children, delay = 0, className = '', variant = 'up' }: RevealProps) {
  const initial = variant === 'scale' ? { opacity: 0, y: 16, scale: 0.97 } : { opacity: 0, y: 28 };
  const animate = variant === 'scale' ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
