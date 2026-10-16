'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, Laptop, Smartphone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { HostedSite } from '@/content/hosted-sites';

interface HostedSitePreviewModalProps {
  site: HostedSite | null;
  onClose: () => void;
}

type PreviewDevice = 'laptop' | 'mobile';

export function HostedSitePreviewModal({ site, onClose }: HostedSitePreviewModalProps) {
  const [device, setDevice] = useState<PreviewDevice>('laptop');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!site) return;

    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, site]);

  return (
    <AnimatePresence>
      {site ? (
        <motion.div
          className="site-preview-modal"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="site-preview-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-preview-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="site-preview-toolbar">
              <div className="site-preview-toolbar__identity">
                <span className="site-preview-toolbar__eyebrow">Live domain preview</span>
                <h2 id="site-preview-title">{site.name}</h2>
                <span className="site-preview-toolbar__domain">{site.domain}</span>
              </div>

              <div className="site-preview-toolbar__controls">
                <div className="site-preview-device-toggle" aria-label="Preview device size">
                  <button
                    type="button"
                    className={device === 'laptop' ? 'is-active' : ''}
                    aria-pressed={device === 'laptop'}
                    onClick={() => setDevice('laptop')}
                  >
                    <Laptop size={15} aria-hidden="true" />
                    <span>Laptop view</span>
                  </button>
                  <button
                    type="button"
                    className={device === 'mobile' ? 'is-active' : ''}
                    aria-pressed={device === 'mobile'}
                    onClick={() => setDevice('mobile')}
                  >
                    <Smartphone size={15} aria-hidden="true" />
                    <span>Mobile view</span>
                  </button>
                </div>
                <a href={site.href} target="_blank" rel="noreferrer" className="site-preview-open-link">
                  <span>Open domain</span>
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
                <button ref={closeButtonRef} type="button" className="site-preview-close" aria-label="Close website preview" onClick={onClose}>
                  <X size={19} aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="site-preview-device-stage">
              <div className="site-preview-stage-label" aria-hidden="true">
                <span>Scroll inside the frame</span>
                <span>{device === 'laptop' ? 'Desktop canvas' : 'Responsive canvas'}</span>
              </div>
              <div className="site-preview-frame" data-device={device}>
                <iframe
                  className="site-preview-iframe"
                  src={site.href}
                  title={`${site.name} full website preview`}
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <p className="site-preview-note">
                If this live domain does not allow embedded viewing, use <a href={site.href} target="_blank" rel="noreferrer">Open domain</a> for the full experience.
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
