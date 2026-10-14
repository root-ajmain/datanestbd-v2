'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  from: 'customer' | 'business';
  text: string;
}

const script: ChatMessage[] = [
  { from: 'customer', text: 'Hi! Is the Growth plan still available?' },
  { from: 'business', text: '৳8,500/month — official WhatsApp API, multi-agent inbox included.' },
  { from: 'customer', text: 'How fast can we go live?' },
  { from: 'business', text: 'Most setups complete in 3–5 business days 🚀' },
];

/**
 * A looping, simulated WhatsApp conversation — fills the hero's visual side
 * with something that moves and is on-brand, instead of a static photo or
 * more paragraph text. Pure CSS/Framer Motion, no external assets.
 */
export function HeroChatPreview() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => (v >= script.length ? 1 : v + 1));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ds-card relative w-full max-w-sm overflow-hidden rounded-3xl p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-12), transparent 70%)' }}
      />

      <div className="relative flex items-center gap-3 border-b border-[var(--ds-border)] pb-3">
        <div className="ds-gradient-brand flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
          DN
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]">
            DataNest BD
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Online · Official WhatsApp API
          </p>
        </div>
      </div>

      <div className="relative mt-4 flex h-56 flex-col justify-end gap-2.5" aria-hidden="true">
        <AnimatePresence initial={false}>
          {script.slice(0, visible).map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed font-[family-name:var(--font-body)] ${
                message.from === 'business'
                  ? 'ds-gradient-brand ml-auto rounded-br-sm text-white'
                  : 'self-start rounded-bl-sm bg-[var(--surface-2)] text-[var(--ds-text-primary)]'
              }`}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="sr-only">
        A looping example conversation showing a customer asking about WhatsApp API pricing and
        onboarding speed, illustrating the kind of conversation DataNest BD&apos;s platform supports.
      </p>
    </div>
  );
}
