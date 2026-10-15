'use client';

import React, { useEffect, useId, useRef } from 'react';
import { useTheme } from '@/components/shell/ThemeProvider';

/**
 * Animated DataNest BD mark: the logo assembles from envelope-message
 * chips, a tagline rises under it, then it settles to one side while four
 * service headlines cycle through in turn — a brand intro built as a pure
 * function of loop-progress `p`, driven by rAF and mutated directly on SVG
 * refs (not React state) so a 15s loop stays smooth at 60fps.
 *
 * Ported from a standalone animation prototype; colors here are pulled
 * from the site's own tokens so it reskins with the theme automatically,
 * except the logo's own mark gradients, which are fixed brand colors
 * matching /images/datanest-logo-mark.png.
 */

const LOGO = {
  bubbleTop: '#2b8eff',
  bubbleBottom: '#0a62e0',
  plateFrom: '#ff3b2f',
  plateTo: '#ffb000',
  letter: '#0c1a33',
  chevron: '#ff5a24',
};
const INK = 'var(--ds-text-primary)';
const INK_SOFT = 'var(--ds-text-secondary)';
const HIGHLIGHT = 'var(--brand)';
const FONT_BODY = 'var(--font-body)';

interface Slide {
  eyebrow: string;
  headline: [string, string];
  highlight: string;
  subline: string;
}

const SLIDES: Slide[] = [
  { eyebrow: 'DATANEST BD · WHATSAPP OFFICIAL API', headline: ['Every message,', 'answered on time.'], highlight: 'on time.', subline: 'Automated replies for Bangladesh’s busiest inboxes.' },
  { eyebrow: 'DATANEST BD · THE AUTOMATIONS', headline: ['Repetitive work,', 'run by AI agents.'], highlight: 'AI agents.', subline: 'Lead capture, follow-ups and order updates on autopilot.' },
  { eyebrow: 'DATANEST BD · SAAS / WEBSITE / WEB APP DEVELOPMENT', headline: ['Built to launch,', 'built to scale.'], highlight: 'built to scale.', subline: 'Websites, web apps and SaaS products, from idea to live.' },
  { eyebrow: 'DATANEST BD · OFFICIAL META PARTNER, POWERED BY WHATCHIMP', headline: ['Set up, verified,', 'ready to grow.'], highlight: 'ready to grow.', subline: 'Meta Business setup, verification and marketing, end to end.' },
];

const SLOGAN_WORDS = ['Build.', 'Automate.', 'Grow 10X Faster.'];
const SLOGAN_HIGHLIGHT = '10X';

const DURATION = 15;
const PHASES: Record<string, [number, number]> = {
  intro: [0, 2.6],
  build: [2.6, 4.8],
  resolve: [4.8, 6.6],
  services: [6.6, 13.8],
  hold: [13.8, 14.3],
  return: [14.3, 15],
};
const REF_END = Math.max(...Object.values(PHASES).map(([, b]) => b));
const PH: Record<string, [number, number]> = {};
Object.entries(PHASES).forEach(([k, [a, b]]) => { PH[k] = [a / REF_END, b / REF_END]; });
const CHIP_STAGGER = 0.07;
const RESOLVED_STILL = 6.4;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

function bezier([x1, y1, x2, y2]: [number, number, number, number]) {
  const B = (a: number, b: number, t: number) => 3 * a * t * (1 - t) * (1 - t) + 3 * b * t * t * (1 - t) + t * t * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 24; i++) {
      t = (lo + hi) / 2;
      if (B(x1, x2, t) < x) lo = t; else hi = t;
    }
    return B(y1, y2, t);
  };
}
const E = {
  enter: bezier([0.22, 1, 0.36, 1]),
  move: bezier([0.65, 0, 0.35, 1]),
  exit: bezier([0.45, 0, 0.55, 1]),
};

function seg(p: number, phase: string, a: number, b: number) {
  const [p0, p1] = PH[phase];
  const span = p1 - p0;
  const s = p0 + a * span, e = p0 + b * span;
  return clamp((p - s) / (e - s));
}
const SWAPS = Math.max(1, SLIDES.length - 1);
function slotSeg(p: number, s: number, a: number, b: number) {
  return seg(p, 'services', (s + a) / SWAPS, (s + b) / SWAPS);
}

const W = 1600;
const H = 900;
const CY = H / 2;
const MARK_MID = 0.78;
const GEO = {
  start: { cx: 800 - MARK_MID * 148, r: 148 },
  focal: { cx: 800 - MARK_MID * 180, r: 180 },
  lift: 90,
  sloganGap: 80,
  sloganSize: 46,
  sloganWordGap: 22,
  build: { cx: 600, r: 160 },
  resolve: { cx: 292, r: 110 },
  chips: [
    { x: -1.32, y: -1.81, s: 0.64 },
    { x: -0.94, y: -1.32, s: 0.82 },
    { x: 0.02, y: -1.49, s: 0.64 },
    { x: -1.43, y: -0.04, s: 0.66 },
    { x: -1.3, y: 0.81, s: 0.62 },
    { x: -1.17, y: 1.57, s: 0.85 },
  ],
  burst: 1.3,
  pulse: 0.07,
  textX: 650,
  textRight: 1544,
};

interface LineSpec {
  dy: number;
  family: string;
  size: number;
  weight: number;
  tracking?: number;
  fill: string;
  hl: boolean;
}
const LINE_SPECS: LineSpec[] = [
  { dy: -128, family: 'monospace', size: 20, weight: 400, tracking: 2.5, fill: INK_SOFT, hl: false },
  { dy: -30, family: FONT_BODY, size: 80, weight: 600, tracking: -1.5, fill: INK, hl: true },
  { dy: 60, family: FONT_BODY, size: 80, weight: 600, tracking: -1.5, fill: INK, hl: true },
  { dy: 132, family: FONT_BODY, size: 30, weight: 400, fill: INK_SOFT, hl: false },
];
const RESOLVE_WIN: [number, number][] = [[0.05, 0.45], [0.12, 0.52], [0.2, 0.6], [0.28, 0.7]];

function splitHighlight(str: string, highlight: string) {
  const idx = str.indexOf(highlight);
  if (idx < 0) return null;
  return { before: str.slice(0, idx), mid: highlight, after: str.slice(idx + highlight.length) };
}

const PAGER_Y = CY + 186, PAGER_W = 30, PAGER_H = 4, PAGER_GAP = 10;

export function BrandLogoMotion({ className = '' }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const { reduceMotion } = useTheme();

  const markRef = useRef<SVGGElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const chipRefs = useRef<(SVGUseElement | null)[]>([]);
  const sloganGroupRef = useRef<SVGGElement>(null);
  const sloganWordRefs = useRef<(SVGTextElement | null)[]>([]);
  const copyRefs = useRef<(SVGTextElement | null)[]>([]);
  const pagerGroupRef = useRef<SVGGElement>(null);
  const pagerActiveRef = useRef<SVGRectElement>(null);

  // One-time layout: centre the slogan words, shrink any copy line that
  // would otherwise overrun the frame. Both depend on measuring the text
  // as rendered, so they run post-mount rather than being baked into JSX.
  useEffect(() => {
    const words = sloganWordRefs.current;
    let widths: number[];
    try {
      widths = words.map((el) => (el ? el.getComputedTextLength() : 0));
    } catch {
      widths = words.map((_, i) => SLOGAN_WORDS[i].length * GEO.sloganSize * 0.5);
    }
    const total = widths.reduce((s, w) => s + w, 0) + GEO.sloganWordGap * (widths.length - 1);
    let x = -total / 2;
    words.forEach((el, i) => {
      if (!el) return;
      el.setAttribute('x', x.toFixed(2));
      x += widths[i] + GEO.sloganWordGap;
    });

    const maxW = GEO.textRight - GEO.textX;
    copyRefs.current.forEach((el) => {
      if (!el) return;
      try {
        const len = el.getComputedTextLength();
        if (len > maxW) {
          const base = parseFloat(el.getAttribute('font-size') || '0');
          el.setAttribute('font-size', ((base * maxW) / len).toFixed(2));
        }
      } catch {
        /* not measurable yet; keep base size */
      }
    });
  }, []);

  useEffect(() => {
    function render(p: number) {
      const kRet = E.exit(seg(p, 'return', 0, 1));
      const kIn = E.enter(seg(p, 'intro', 0, 1));
      const kOp = E.enter(seg(p, 'intro', 0, 0.7));
      const kB = E.move(seg(p, 'build', 0, 0.55));
      const kR = E.move(seg(p, 'resolve', 0, 0.6));
      let cx = lerp(lerp(GEO.start.cx, GEO.focal.cx, kIn), GEO.build.cx, kB);
      cx = lerp(cx, GEO.resolve.cx, kR);
      let r = lerp(lerp(GEO.start.r, GEO.focal.r, kIn), GEO.build.r, kB);
      r = lerp(r, GEO.resolve.r, kR);
      cx = lerp(cx, GEO.start.cx, kRet);
      r = lerp(r, GEO.start.r, kRet);
      let my = CY - GEO.lift * (1 - kB);
      my = lerp(my, CY - GEO.lift, kRet);

      if (markRef.current) {
        markRef.current.setAttribute('transform', `translate(${cx.toFixed(2)} ${my.toFixed(2)}) scale(${r.toFixed(3)})`);
        markRef.current.setAttribute('opacity', (kOp * (1 - kRet)).toFixed(3));
      }

      if (sloganGroupRef.current) {
        sloganGroupRef.current.setAttribute(
          'transform',
          `translate(${(cx + MARK_MID * r).toFixed(2)} ${(my + 1.72 * r + GEO.sloganGap).toFixed(2)})`
        );
      }
      sloganWordRefs.current.forEach((el, i) => {
        if (!el) return;
        const kWIn = E.enter(seg(p, 'intro', 0.36 + i * 0.12, 0.68 + i * 0.12));
        const kWOut = E.exit(seg(p, 'build', 0.02 + i * 0.06, 0.3 + i * 0.06));
        const sOp = kWIn * (1 - kWOut);
        el.setAttribute('y', (22 * (1 - kWIn) - 16 * kWOut).toFixed(2));
        el.setAttribute('opacity', sOp.toFixed(3));
        el.setAttribute('visibility', sOp < 0.002 ? 'hidden' : 'visible');
      });

      if (ringRef.current) {
        const kRing = E.enter(seg(p, 'intro', 0.2, 1));
        const ringOut = E.move(seg(p, 'resolve', 0, 0.45));
        ringRef.current.setAttribute('cx', cx.toFixed(2));
        ringRef.current.setAttribute('cy', my.toFixed(2));
        ringRef.current.setAttribute('r', (r * (1 + 0.16 * kRing)).toFixed(2));
        ringRef.current.setAttribute('opacity', (0.45 * kRing * (1 - ringOut) * (1 - kRet)).toFixed(3));
      }

      const st = CHIP_STAGGER;
      chipRefs.current.forEach((chip, i) => {
        if (!chip) return;
        const c = GEO.chips[i];
        const kA = E.enter(seg(p, 'build', 0.12 + i * st, 0.62 + i * st));
        const kS = E.move(seg(p, 'resolve', i * 0.05, 0.5 + i * 0.05));
        let bump = 0;
        for (let s = 0; s < SLIDES.length - 1; s++) {
          bump += Math.sin(Math.PI * E.move(slotSeg(p, s, 0.04 + i * 0.03, 0.4 + i * 0.03)));
        }
        let x = lerp(lerp(0, c.x * GEO.burst, kA), c.x, kS);
        let y = lerp(lerp(0, c.y * GEO.burst, kA), c.y, kS);
        let s = c.s * lerp(0.4, 1, kA) * (1 + GEO.pulse * bump);
        x = lerp(x, 0, kRet);
        y = lerp(y, 0, kRet);
        s = lerp(s, c.s * 0.4, kRet);
        chip.setAttribute('transform', `translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${s.toFixed(3)})`);
        chip.setAttribute('opacity', (kA * (1 - kRet)).toFixed(3));
      });

      const textOut = E.exit(seg(p, 'return', 0, 0.55));
      const lastSlide = SLIDES.length - 1;
      SLIDES.forEach((_, si) => {
        for (let li = 0; li < LINE_SPECS.length; li++) {
          const el = copyRefs.current[si * LINE_SPECS.length + li];
          if (!el) continue;
          const y = CY + LINE_SPECS[li].dy;
          const kIn = si === 0
            ? E.enter(seg(p, 'resolve', RESOLVE_WIN[li][0], RESOLVE_WIN[li][1]))
            : E.enter(slotSeg(p, si - 1, 0.17 + li * 0.05, 0.47 + li * 0.05));
          const kOut = si < lastSlide ? E.exit(slotSeg(p, si, li * 0.035, 0.15 + li * 0.035)) : 0;
          const yy = y + 26 * (1 - kIn) - 18 * kOut;
          const op = kIn * (1 - kOut) * (si === lastSlide ? 1 - textOut : 1);
          el.setAttribute('y', yy.toFixed(2));
          el.setAttribute('opacity', op.toFixed(3));
          el.setAttribute('visibility', op < 0.002 ? 'hidden' : 'visible');
        }
      });

      let active = 0;
      for (let s = 0; s < SLIDES.length - 1; s++) active += E.move(slotSeg(p, s, 0.08, 0.5));
      if (pagerActiveRef.current) {
        pagerActiveRef.current.setAttribute('x', (GEO.textX + active * (PAGER_W + PAGER_GAP)).toFixed(2));
      }
      if (pagerGroupRef.current) {
        const kPager = E.enter(seg(p, 'resolve', 0.35, 0.8));
        pagerGroupRef.current.setAttribute('opacity', (kPager * (1 - textOut)).toFixed(3));
      }
    }

    if (reduceMotion) {
      render(clamp(RESOLVED_STILL / REF_END, 0, 0.99999));
      return;
    }

    let t = 0;
    let last: number | null = null;
    let raf = 0;
    function frame(ts: number) {
      if (last != null) t = (t + Math.min(0.1, (ts - last) / 1000)) % DURATION;
      last = ts;
      render(clamp(t / DURATION, 0, 0.99999));
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [reduceMotion]);

  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label="Animated DataNest BD mark introducing WhatsApp API, AI automation, web and SaaS development, and Meta partner services."
    >
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="block h-full w-full">
        <defs>
          <linearGradient id={`${uid}-gBubble`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={LOGO.bubbleTop} />
            <stop offset="1" stopColor={LOGO.bubbleBottom} />
          </linearGradient>
          <linearGradient id={`${uid}-gPlate`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={LOGO.plateFrom} />
            <stop offset="1" stopColor={LOGO.plateTo} />
          </linearGradient>
          <linearGradient id={`${uid}-gShade`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" stopOpacity={0.22} />
            <stop offset="1" stopColor="#000" stopOpacity={0} />
          </linearGradient>
          <clipPath id={`${uid}-clipBubble`}><circle cx="0" cy="0" r="1" /></clipPath>
          <g id={`${uid}-chipShape`}>
            <rect x="-0.5" y="-0.38" width="1" height="0.76" rx="0.16" fill={`url(#${uid}-gPlate)`} />
            <path d="M -0.34 0.30 L -0.40 0.62 L -0.08 0.36 Z" fill={`url(#${uid}-gPlate)`} />
            <rect x="-0.32" y="-0.22" width="0.64" height="0.44" rx="0.07" fill={LOGO.letter} />
            <path d="M -0.2 -0.1 L 0 0.06 L 0.2 -0.1" fill="none" stroke={LOGO.chevron} strokeWidth={0.07} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </defs>

        <circle ref={ringRef} fill="none" stroke={HIGHLIGHT} strokeWidth={2} opacity={0} />

        <g ref={markRef} opacity={0}>
          <g>
            {GEO.chips.map((_, i) => (
              <use key={i} ref={(el) => { chipRefs.current[i] = el; }} href={`#${uid}-chipShape`} />
            ))}
          </g>
          <rect x="0.34" y="-1.17" width="2.21" height="2.38" rx="0.5" fill={`url(#${uid}-gPlate)`} />
          <rect x="0.34" y="-1.17" width="1.0" height="2.38" rx="0.5" fill={`url(#${uid}-gShade)`} opacity={0.9} />
          <path d="M 0.98 0.74 V -0.62 H 1.24 L 1.87 0.28 V -0.62 H 2.13 V 0.74 H 1.87 L 1.24 -0.16 V 0.74 Z" fill={LOGO.letter} />
          <g>
            <circle cx="0" cy="0" r="1" fill={`url(#${uid}-gBubble)`} />
            <path d="M -0.46 0.78 L -0.44 1.72 Q -0.02 1.24 0.36 0.90 Z" fill={`url(#${uid}-gBubble)`} />
            <path d="M -1.1 0.22 Q -0.35 -0.08 0.42 1.1 L -1.1 1.1 Z" fill="#fff" opacity={0.1} clipPath={`url(#${uid}-clipBubble)`} />
          </g>
          <path
            fillRule="evenodd"
            fill={LOGO.letter}
            d="M -0.46 -0.64 H 0.16 A 0.69 0.69 0 0 1 0.16 0.74 H -0.46 Z
               M -0.20 -0.40 V 0.50 H 0.16 A 0.45 0.45 0 0 0 0.16 -0.40 Z"
          />
        </g>

        <g ref={sloganGroupRef}>
          {SLOGAN_WORDS.map((word, i) => {
            const split = splitHighlight(word, SLOGAN_HIGHLIGHT);
            return (
              <text
                key={word}
                ref={(el) => { sloganWordRefs.current[i] = el; }}
                fontFamily={FONT_BODY}
                fontSize={GEO.sloganSize}
                fontWeight={600}
                letterSpacing={-0.5}
                fill={INK}
                opacity={0}
              >
                {split ? <>{split.before}<tspan fill={HIGHLIGHT}>{split.mid}</tspan>{split.after}</> : word}
              </text>
            );
          })}
        </g>

        <g>
          {SLIDES.map((slide, si) => {
            const strs = [slide.eyebrow, slide.headline[0] ?? '', slide.headline[1] ?? '', slide.subline];
            return (
              <g key={slide.eyebrow}>
                {strs.map((str, li) => {
                  const spec = LINE_SPECS[li];
                  const split = spec.hl ? splitHighlight(str, slide.highlight) : null;
                  return (
                    <text
                      key={spec.dy}
                      ref={(el) => { copyRefs.current[si * LINE_SPECS.length + li] = el; }}
                      x={GEO.textX}
                      y={CY + spec.dy}
                      fontFamily={spec.family}
                      fontSize={spec.size}
                      fontWeight={spec.weight}
                      letterSpacing={spec.tracking}
                      fill={spec.fill}
                      opacity={0}
                    >
                      {split ? <>{split.before}<tspan fill={HIGHLIGHT}>{split.mid}</tspan>{split.after}</> : str}
                    </text>
                  );
                })}
              </g>
            );
          })}
        </g>

        <g ref={pagerGroupRef} opacity={0}>
          {SLIDES.length > 1 && SLIDES.map((slide, i) => (
            <rect
              key={slide.eyebrow}
              x={GEO.textX + i * (PAGER_W + PAGER_GAP)}
              y={PAGER_Y}
              width={PAGER_W}
              height={PAGER_H}
              rx={PAGER_H / 2}
              fill={INK_SOFT}
              opacity={0.28}
            />
          ))}
          {SLIDES.length > 1 && (
            <rect ref={pagerActiveRef} y={PAGER_Y} width={PAGER_W} height={PAGER_H} rx={PAGER_H / 2} fill={HIGHLIGHT} />
          )}
        </g>
      </svg>
    </div>
  );
}
