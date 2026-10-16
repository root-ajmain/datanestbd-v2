'use client';

import { ArrowUpRight, ExternalLink, Globe2, Sparkles } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { hostedSites } from '@/content/hosted-sites';

export function HostedSiteShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
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
            A moving index of the sites currently published through our Hostinger workspace. Each build has a different job, audience and rhythm — the common thread is a clearer digital front door.
          </p>
        </div>
        <div className="hosted-site-rail" aria-hidden="true">
          <motion.div className="hosted-site-rail__orb" style={{ y: railY }} />
          <span>10 live entries</span>
          <span>7 custom domains</span>
          <span>3 preview addresses</span>
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
            <div className="hosted-site-preview">
              <div className="hosted-site-preview__bar">
                <span className="hosted-site-preview__dots" aria-hidden="true"><i /><i /><i /></span>
                <span>{site.domain}</span>
                <ExternalLink size={13} aria-hidden="true" />
              </div>
              <div className="hosted-site-preview__canvas">
                <div className="hosted-site-preview__scan" aria-hidden="true" />
                <span className="hosted-site-preview__eyebrow">{site.previewLabel}</span>
                <strong>{site.name}</strong>
                <span className="hosted-site-preview__line" aria-hidden="true" />
                <span className="hosted-site-preview__line hosted-site-preview__line--short" aria-hidden="true" />
                <span className="hosted-site-preview__cursor" aria-hidden="true"><Globe2 size={13} /></span>
              </div>
              <span className="hosted-site-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="hosted-site-card__meta">
              <div className="hosted-site-card__topline">
                <span>{site.category}</span>
                <span className={`hosted-site-status hosted-site-status--${site.status === 'Custom domain' ? 'live' : 'preview'}`}>
                  {site.status}
                </span>
              </div>
              <h3>{site.name}</h3>
              <p>{site.description}</p>
              <a href={site.href} target="_blank" rel="noreferrer" className="hosted-site-link">
                <span>Open live site</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
