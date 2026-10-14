'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ArrowDown, ArrowUpRight, ArrowRight, Check, MessageSquare, Workflow, Code2, ChartNoAxesCombined, Mouse, Layers, CheckCheck } from 'lucide-react';
import { useTheme } from '@/components/shell/ThemeProvider';
import { siteConfig } from '@/content/site';
import { projects } from '@/content/projects';

const chapters = [
  { label: 'The everyday reality', title: 'You built a business.\nThen became its busiest person.', description: 'The messages keep coming. Orders live in spreadsheets. Your team waits for answers only you have. Growth should feel like progress, not a longer to-do list.', items: ['Customer questions get buried', 'The same data, entered again', 'Too much depends on you'] },
  { label: 'A partner in your corner', title: 'Let’s connect\nthe moving pieces.', description: 'We listen first. Then we connect your conversations, website, and workflows into a system that fits how your business actually works.', items: ['One inbox for the whole team', 'Useful automation, with human handoff', 'Your website and operations, connected'] },
  { label: 'Room for what’s next', title: 'Less chasing tasks.\nMore building your future.', description: 'Your team knows what comes next. Customers get a clearer response. And you get space to lead—with a technology partner to help your systems grow with you.', items: ['Clear ownership across your team', 'Better visibility into daily operations', 'A foundation you can build on'] },
];

function TypedPromise({ reduceMotion }: { reduceMotion: boolean }) {
  const text = 'Less busywork. More possibility.';
  const [length, setLength] = useState(text.length);
  useEffect(() => {
    if (reduceMotion) return;
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setLength(count);
      if (count >= text.length) window.clearInterval(timer);
    }, 65);
    return () => window.clearInterval(timer);
  }, [reduceMotion, text.length]);
  return <span className="typed-promise"><span className="sr-only">{text}</span><span aria-hidden="true">{reduceMotion ? text : text.slice(0, length)}<i /></span></span>;
}

function Workspace({ stage = 2 }: { stage?: number }) {
  return <div className={`workspace stage-${stage}`} aria-label="Illustrative connected business workspace">
    <div className="workspace-grid" aria-hidden="true" />
    <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
    <div className="system-core"><Layers size={34} strokeWidth={1.3} /><span>DataNest<span className="core-dot">.</span></span><small>YOUR CONNECTED BUSINESS</small></div>
    <div className="float-panel inbox-panel"><div className="panel-heading"><span className="panel-icon"><MessageSquare size={16} /></span><strong>Customer conversations</strong><span className="status-dot" /></div><div className="demo-message">Hi! Can I check my order?</div><div className="demo-reply">Of course. Let me help you.<CheckCheck size={13} /></div><div className="panel-foot"><span className="mini-avatar">S</span>{stage === 0 ? 'Waiting for an available teammate' : 'Assigned to your support team'}</div></div>
    <div className="float-panel automation-panel"><div className="panel-heading"><span className="panel-icon"><Workflow size={16} /></span><strong>Workflows, connected</strong></div>{['New inquiry received', 'Customer record updated', 'Your team notified'].map((text, i) => <div className="flow-row" key={text}><span className={stage === 0 ? 'pending-dot' : 'flow-check'}>{stage !== 0 && <Check size={11} />}</span>{text}<small>0{i + 1}</small></div>)}</div>
    <div className="float-panel growth-panel"><div className="panel-heading"><ChartNoAxesCombined size={16} /><strong>Space to grow</strong><ArrowUpRight size={15} /></div><div className="growth-bars" aria-hidden="true">{[28, 39, 33, 54, 47, 65, 78, 95].map((height, i) => <span key={i} style={{ height: `${stage === 0 ? 22 + i * 3 : height}%` }} />)}</div><small>Less busywork. More possibility.</small></div>
    <div className="connection-label"><span className="status-dot" />{stage === 0 ? 'Waiting to connect' : stage === 1 ? 'Connecting your operations' : 'People + technology, working together'}</div>
  </div>;
}

export function GrowthExperience() {
  const hero = useRef<HTMLElement>(null);
  const story = useRef<HTMLElement>(null);
  const { reduceMotion, setReduceMotion } = useTheme();
  const [stage, setStage] = useState(0);
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const rotateX = useTransform(heroProgress, [0, 1], [9, 0]);
  const rotateY = useTransform(heroProgress, [0, 1], [-12, 3]);
  const y = useTransform(heroProgress, [0, 1], [0, 90]);
  const { scrollYProgress } = useScroll({ target: story, offset: ['start center', 'end center'] });
  useMotionValueEvent(scrollYProgress, 'change', value => setStage(Math.min(2, Math.floor(value * 3))));
  return <div className="growth-experience">
    <section className="growth-hero" id="overview" ref={hero}>
      <div className="hero-copy"><div className="hero-kicker"><span className="status-dot" /> Your ambition. Our technology.</div>
        <h1>A business<br />that runs better.<br /><span>A future that<br className="desktop-break" /> grows bigger.</span></h1>
        <p>You didn’t start a business to chase spreadsheets and unanswered messages. We build the technology that gives you room to grow.</p>
        <div className="hero-actions"><Link href="/contact" className="premium-button">Let’s build your next chapter <ArrowUpRight size={18} /></Link><a href="#your-story" className="story-link">See how we get there <ArrowDown size={16} /></a></div>
        <div className="hero-signoff"><span className="tiny-line" /><TypedPromise reduceMotion={reduceMotion} /></div>
      </div>
      <div className="hero-art"><div className="hero-art-glow" /><motion.div className="hero-3d" style={reduceMotion ? {} : { rotateX, rotateY, y }}><Workspace /></motion.div><div className="art-caption"><span>THE CONNECTED BUSINESS</span><span>Illustrative workflow / 01</span></div></div>
      <div className="hero-bottom"><a href="#your-story"><Mouse size={17} /> Scroll to see your next chapter</a><button type="button" onClick={() => setReduceMotion(!reduceMotion)} aria-pressed={reduceMotion}>{reduceMotion ? 'Motion off' : 'Motion on'}<span className={`motion-switch ${reduceMotion ? '' : 'is-on'}`} /></button></div>
    </section>
    <div className="capability-strip"><span>Thoughtfully connected.</span><strong>WhatsApp Business API</strong><span className="strip-plus">+</span><strong>Web & software</strong><span className="strip-plus">+</span><strong>AI & automation</strong><a href={siteConfig.partner.credentialUrl} target="_blank" rel="noopener noreferrer">WhatChimp partner <ArrowUpRight size={14} /></a></div>
    <section className="business-story" id="your-story" ref={story}>
      <div className="story-sticky"><div className="story-visual-header"><span className="eyebrow">Your next chapter</span><span className="story-counter">0{stage + 1} / 03</span></div><Workspace stage={stage} /><div className="chapter-progress" aria-hidden="true">{chapters.map((chapter, i) => <span key={chapter.label} className={i <= stage ? 'active' : ''} />)}</div><p className="illustration-note">An illustrative business journey. Outcomes depend on your scope and operations.</p></div>
      <div className="story-chapters">{chapters.map((chapter, i) => <article className={`story-chapter ${stage === i ? 'current' : ''}`} key={chapter.label}><span className="eyebrow">0{i + 1} — {chapter.label}</span><h2>{chapter.title}</h2><p>{chapter.description}</p><ul>{chapter.items.map(item => <li key={item}><span>{i === 0 ? '−' : <Check size={13} />}</span>{item}</li>)}</ul>{i === 2 && <Link className="story-link" href="/contact">Let’s write your next chapter <ArrowUpRight size={17} /></Link>}</article>)}</div>
    </section>
    <section className="solutions-section" id="services"><div className="section-intro"><div><span className="eyebrow">Made to work together</span><h2>The right tools.<br />One invested partner.</h2></div><p>Start with the bottleneck that matters most. Build a connected foundation, one useful solution at a time.</p></div>
      <div className="solution-grid">{[
        { icon: MessageSquare, number: '01', title: 'Every conversation, cared for.', text: 'Bring your WhatsApp conversations into a shared team inbox. Route inquiries, organize follow-ups, and keep people in the loop.', label: 'WhatsApp & customer operations', href: '/services#whatsapp', code: 'message.received → team.assigned' },
        { icon: Code2, number: '02', title: 'A digital home that works harder.', text: 'Fast websites, useful business software, and portals that connect your customers to the way you work.', label: 'Web & software development', href: '/services#development', code: 'idea → build → launch → improve' },
        { icon: Workflow, number: '03', title: 'Give the repetitive work a system.', text: 'Connect your tools and automate the routine. Keep human judgment where it matters with clear review and handoff.', label: 'AI & workflow automation', href: '/services#ai', code: 'if (routine) { automate(); }' },
        { icon: ChartNoAxesCombined, number: '04', title: 'Turn attention into opportunity.', text: 'Connect your marketing to the customer journey, with focused campaigns and a clearer path from interest to inquiry.', label: 'Growth & digital marketing', href: '/services#marketing', code: 'discover → connect → convert' },
      ].map(item => <Link href={item.href} className="solution-card" key={item.number}><div className="solution-top"><item.icon size={25} strokeWidth={1.4} /><span>{item.number}</span></div><div className="solution-code" aria-hidden="true"><span>›</span> {item.code}<i /></div><span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><span className="solution-arrow"><ArrowUpRight size={22} /></span></Link>)}</div>
      <p className="policy-note">Official WhatsApp infrastructure still follows Meta’s rules. Opt-in, approved templates, account quality, and applicable messaging fees remain part of every implementation. <Link href="/pricing">Explore pricing and boundaries <ArrowRight size={13} /></Link></p>
    </section>
    <section className="reference-section" id="work"><div className="section-intro"><div><span className="eyebrow">From possibility to a plan</span><h2>See what connected<br />could look like.</h2></div><Link href="/work" className="story-link">Explore our reference work <ArrowUpRight size={18} /></Link></div><div className="reference-list">{projects.slice(0, 3).map((project, i) => <Link href={`/work/${project.slug}`} key={project.id}><span className="reference-index">0{i + 1}</span><div><small>{project.category} · Illustrative architecture</small><h3>{project.title}</h3></div><ArrowUpRight size={25} /></Link>)}</div></section>
    <section className="partnership-section" id="about"><span className="eyebrow">A shared direction</span><h2>Your business knowledge.<br />Our technical craft.<br /><span>Better, together.</span></h2><p>Our vision is simple: smoother operations, fewer daily roadblocks, and technology that helps business owners move forward. We listen, build, and help you take the next step.</p><Link href="/about" className="premium-button">Meet your technology partner <ArrowUpRight size={18} /></Link><div className="partnership-orbit" aria-hidden="true"><span>YOU</span><span>DataNest</span></div></section>
  </div>;
}
