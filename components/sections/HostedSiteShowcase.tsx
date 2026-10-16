'use client';

import { ArrowUpRight, ExternalLink, Eye, Globe2, Sparkles } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { hostedSites, type HostedSite } from '@/content/hosted-sites';
import { HostedSitePreviewModal } from './HostedSitePreviewModal';

export function HostedSiteShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedSite, setSelectedSite] = useState<HostedSite | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 });
  const railY = useTransform(scrollYProgress, [0, 1], [-32, 32]);

  return (
    <section ref={sectionRef} className="hosted-site-showcase" aria-labelledby="hosted-sites-title">
      <div className="hosted-site-intro">
        <div>
          <div className="hosted-site-kicker"><Sparkles size={14} aria-hidden="true" /> Live deployment index</div>
          <h2 id="hosted-sites-title">Built, shipped, and out in the world.</h2>
          <p>
            A moving index of the custom domains currently published through our Hostinger workspace. Open any project in a contained preview window, then switch between laptop and mobile canvases to inspect the responsive experience.
          </p>
        </div>
        <div className="hosted-site-rail" aria-hidden="true">
          <motion.div className="hosted-site-rail__orb" style={{ y: railY }} />
          <span>7 live domains</span>
          <span>Custom domains only</span>
          <span>Preview addresses excluded</span>
        </div>
      </div>

      <div className="hosted-site-progress" aria-hidden="true">
        <motion.div style={{ scaleX: progress }} />
      </div>

      <div className="hosted-site-grid">
        {hostedSites.map((site, index) => (
          <motion.article
            key={site.id}
            className="hosted-site-card"
            data-accent={site.accent}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.7, delay: Math.min(index % 3, 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
          >
            <div className="hosted-site-card__device-wrap">
              <div className="hosted-site-device" aria-hidden="true">
                <div className="hosted-site-device__screen">
                  <div className="hosted-site-device__browserbar">
                    <span className="hosted-site-preview__dots"><i /><i /><i /></span>
                    <span>{site.domain}</span>
                    <ExternalLink size={12} />
                  </div>
                  <div className="hosted-site-device__canvas">
                    <span className="hosted-site-device__eyebrow">{site.previewLabel}</span>
                    <strong>{site.name}</strong>
                    <span className="hosted-site-device__line" />
                    <span className="hosted-site-device__line hosted-site-device__line--short" />
                    <span className="hosted-site-device__cursor"><Globe2 size={13} /></span>
                    <span className="hosted-site-device__scan" />
                  </div>
                </div>
                <div className="hosted-site-device__hinge" />
                <div className="hosted-site-device__base" />
              </div>
              <span className="hosted-site-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="hosted-site-card__meta">
              <div className="hosted-site-card__topline">
                <span>{site.category}</span>
                <span className="hosted-site-status hosted-site-status--live">{site.status}</span>
              </div>
              <h3>{site.name}</h3>
              <p>{site.description}</p>
              <div className="hosted-site-card__actions">
                <button type="button" className="hosted-site-link hosted-site-link--preview" onClick={() => setSelectedSite(site)}>
                  <Eye size={16} aria-hidden="true" />
                  <span>Preview website</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
                <a href={site.href} target="_blank" rel="noreferrer" className="hosted-site-link hosted-site-link--external">
                  <span>Open domain</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <HostedSitePreviewModal key={selectedSite?.id ?? 'closed'} site={selectedSite} onClose={() => setSelectedSite(null)} />
    </section>
  );
}
