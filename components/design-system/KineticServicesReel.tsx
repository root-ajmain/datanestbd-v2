'use client';

import React, { useEffect, useId, useRef } from 'react';
import { useTheme } from '@/components/shell/ThemeProvider';

/**
 * "One word, four services, one message": the DataNest BD wordmark rises,
 * shrinks into a running header, and its orange full stop detaches and
 * travels down a list of four services, landing as the full stop of the
 * closing line. A pure function of loop-progress `p`, mutated directly on
 * SVG refs (not React state) so a 10s loop stays smooth — same approach as
 * BrandLogoMotion. Ported from a standalone animation prototype.
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
const HIGHLIGHT = 'var(--accent)';
const FONT_BODY = 'var(--font-body)';

const FOCAL = 'DataNest BD';
const SERVICES = [
  { index: '01', label: 'WhatsApp Official Business API' },
  { index: '02', label: 'Meta setup, verification & marketing' },
  { index: '03', label: 'SaaS, websites & web apps' },
  { index: '04', label: 'AI agents, built for your workflow' },
];
const EYEBROW = 'WHAT WE DO';
const MESSAGE = ['One partner,', 'four ways to grow'];
const MSG_HIGHLIGHT = 'grow';

const DURATION = 10;
const PHASES: Record<string, [number, number]> = {
  intro: [0, 2],
  build: [2, 5],
  resolve: [5, 8],
  hold: [8, 9],
  return: [9, 10],
};
const REF_END = Math.max(...Object.values(PHASES).map(([, b]) => b));
const PH: Record<string, [number, number]> = {};
Object.entries(PHASES).forEach(([k, [a, b]]) => { PH[k] = [a / REF_END, b / REF_END]; });
const RESOLVED_STILL = 8.5;

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

const W = 1600;
const H = 900;
const CY = H / 2;
const MARK_BOX = { x: -1.85, y: -2.15, w: 4.45, h: 4.35 };
const CHIPS: [number, number, number][] = [
  [-1.32, -1.81, 0.64], [-0.94, -1.32, 0.82], [0.02, -1.49, 0.64],
  [-1.43, -0.04, 0.66], [-1.3, 0.81, 0.62], [-1.17, 1.57, 0.85],
];
const GEO = {
  focalSize: 160, focalMaxWidth: 1280, focalTracking: -4,
  logoHeight: 1.2, logoGap: 0.24,
  headerScale: 0.42, headerX: 160, headerBaseline: CY - 214,
  dotR: 0.11,
  listX: 160, listY: CY - 60, rowGap: 100, rowSize: 54,
  listResolveScale: 0.46, listResolveY: CY - 52,
  msgX: 780, msgSize: 84, eyebrowY: CY - 118, msgY: [CY - 14, CY + 84],
  marginRight: 80,
};
const ARRIVE = SERVICES.map((_, i) => 0.3 + i * (0.46 / Math.max(1, SERVICES.length - 1)));

interface Geo {
  FS: number; W_F: number; R0: number; GAP: number;
  LOGO_H: number; LOGO_W: number; LOGO_GAP: number; LX0: number; TEXT_X: number;
  LOGO_C: { x: number; y: number }; focalBaseline: number;
  msgDot: { x: number; y: number; r: number };
  msgLines: { base: number; size: number; len: number }[];
}

function fitText(el: SVGTextElement, base: number, maxW: number) {
  let len = el.getComputedTextLength();
  if (len > maxW) {
    el.setAttribute('font-size', ((base * maxW) / len).toFixed(2));
    len = el.getComputedTextLength();
  }
  return len;
}

export function KineticServicesReel({ className = '' }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const { reduceMotion } = useTheme();

  const focalGroupRef = useRef<SVGGElement>(null);
  const logoOuterRef = useRef<SVGGElement>(null);
  const letterRefs = useRef<(SVGTSpanElement | null)[]>([]);
  const focalTextRef = useRef<SVGTextElement>(null);
  const cpFocalRectRef = useRef<SVGRectElement>(null);

  const listGroupRef = useRef<SVGGElement>(null);
  const wipeRefs = useRef<(SVGRectElement | null)[]>([]);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const idxRefs = useRef<(SVGTextElement | null)[]>([]);

  const eyebrowRef = useRef<SVGTextElement>(null);
  const msgLineRefs = useRef<(SVGTextElement | null)[]>([]);
  const cpMsgRectRefs = useRef<(SVGRectElement | null)[]>([]);

  const dotRef = useRef<SVGCircleElement>(null);
  const trailRef = useRef<SVGLineElement>(null);

  const geoRef = useRef<Geo | null>(null);

  // One-time layout: measure the focal wordmark, size the logo off it,
  // shrink any row/message line that would overrun the frame, and freeze
  // the static clip rects everything else rises through.
  useEffect(() => {
    const focalText = focalTextRef.current;
    if (!focalText) return;

    let FS = GEO.focalSize;
    focalText.setAttribute('font-size', String(FS));
    focalText.setAttribute('letter-spacing', String(GEO.focalTracking));
    const measured = focalText.getComputedTextLength();
    let W_F = measured > 0 ? measured : FOCAL.length * FS * 0.6;
    const tot = FS * GEO.logoHeight * (MARK_BOX.w / MARK_BOX.h) + FS * GEO.logoGap + W_F + FS * 0.06 + 2 * FS * GEO.dotR;
    if (tot > GEO.focalMaxWidth) {
      const k = GEO.focalMaxWidth / tot;
      FS *= k; W_F *= k;
      focalText.setAttribute('font-size', FS.toFixed(2));
      focalText.setAttribute('letter-spacing', (GEO.focalTracking * k).toFixed(2));
    }
    const focalBaseline = CY + FS * 0.36;
    const R0 = FS * GEO.dotR, GAP = FS * 0.06;
    const LOGO_H = FS * GEO.logoHeight;
    const LOGO_W = LOGO_H * (MARK_BOX.w / MARK_BOX.h);
    const LOGO_GAP = FS * GEO.logoGap;
    const LX0 = -(LOGO_W + LOGO_GAP + W_F + GAP + 2 * R0) / 2;
    const TEXT_X = LX0 + LOGO_W + LOGO_GAP;
    focalText.setAttribute('x', TEXT_X.toFixed(2));
    if (cpFocalRectRef.current) {
      cpFocalRectRef.current.setAttribute('x', (TEXT_X - 60).toFixed(2));
      cpFocalRectRef.current.setAttribute('y', (-FS * 1.1).toFixed(2));
      cpFocalRectRef.current.setAttribute('width', String(W * 2));
      cpFocalRectRef.current.setAttribute('height', (FS * 1.28).toFixed(2));
    }
    const LOGO_C = { x: LX0 + LOGO_W / 2, y: -FS * 0.36 };
    const u = LOGO_H / MARK_BOX.h;
    if (logoOuterRef.current?.firstElementChild) {
      (logoOuterRef.current.firstElementChild as SVGGElement).setAttribute(
        'transform',
        `translate(${(LOGO_C.x - (MARK_BOX.x + MARK_BOX.w / 2) * u).toFixed(2)} ${(LOGO_C.y - (MARK_BOX.y + MARK_BOX.h / 2) * u).toFixed(2)}) scale(${u.toFixed(4)})`
      );
    }

    labelRefs.current.forEach((el) => {
      if (!el) return;
      el.setAttribute('font-size', String(GEO.rowSize));
      fitText(el, GEO.rowSize, W - GEO.listX - 104 - GEO.marginRight);
    });

    const MS = GEO.msgSize;
    const maxMsgW = W - GEO.msgX - GEO.marginRight - MS * 0.4;
    const msgLines = MESSAGE.map((str, i) => {
      const base = GEO.msgY[i] ?? GEO.msgY[0] + i * MS * 1.15;
      const el = msgLineRefs.current[i];
      let size = MS, len = str.length * MS * 0.55;
      if (el) {
        el.setAttribute('font-size', String(MS));
        const measuredLen = fitText(el, MS, maxMsgW);
        size = parseFloat(el.getAttribute('font-size') || String(MS));
        len = measuredLen > 0 ? measuredLen : len;
      }
      const rect = cpMsgRectRefs.current[i];
      if (rect) {
        rect.setAttribute('x', String(GEO.msgX - 20));
        rect.setAttribute('y', (base - MS * 1.05).toFixed(2));
        rect.setAttribute('width', String(W));
        rect.setAttribute('height', (MS * 1.25).toFixed(2));
      }
      return { base, size, len };
    });
    const last = msgLines[msgLines.length - 1];
    const msgDot = {
      x: GEO.msgX + last.len + last.size * 0.06 + last.size * GEO.dotR,
      y: last.base - last.size * GEO.dotR,
      r: last.size * GEO.dotR,
    };

    geoRef.current = { FS, W_F, R0, GAP, LOGO_H, LOGO_W, LOGO_GAP, LX0, TEXT_X, LOGO_C, focalBaseline, msgDot, msgLines };
  }, []);

  useEffect(() => {
    function focalTransform(p: number, g: Geo) {
      const kIn = E.enter(seg(p, 'intro', 0, 0.9));
      const kH = E.move(seg(p, 'build', 0, 0.38));
      const s = lerp(lerp(1.12, 1, kIn), GEO.headerScale, kH);
      const gx0 = W / 2, gx1 = GEO.headerX - GEO.headerScale * g.LX0;
      return { x: lerp(gx0, gx1, kH), y: lerp(g.focalBaseline, GEO.headerBaseline, kH), s };
    }
    function periodPos(f: { x: number; y: number; s: number }, g: Geo) {
      return { x: f.x + f.s * (g.TEXT_X + g.W_F + g.GAP + g.R0), y: f.y - f.s * g.R0, r: f.s * g.R0 };
    }
    function listTransform(p: number) {
      const k = E.move(seg(p, 'resolve', 0.05, 0.5));
      return { x: GEO.listX, y: lerp(GEO.listY, GEO.listResolveY, k), s: lerp(1, GEO.listResolveScale, k) };
    }
    function rowDot(L: { x: number; y: number; s: number }, i: number) {
      const ly = i * GEO.rowGap - GEO.rowSize * 0.36;
      return { x: L.x, y: L.y + L.s * ly, r: L.s * GEO.rowSize * GEO.dotR * 1.1 };
    }
    const mixPt = (a: { x: number; y: number; r: number }, b: { x: number; y: number; r: number }, k: number) => ({
      x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), r: lerp(a.r, b.r, k),
    });

    function render(p: number) {
      const g = geoRef.current;
      if (!g) return;
      const kRet = E.exit(seg(p, 'return', 0, 0.55));
      const f = focalTransform(p, g);
      const L = listTransform(p);

      const kOp = E.enter(seg(p, 'intro', 0, 0.6));
      if (focalGroupRef.current) {
        focalGroupRef.current.setAttribute('transform', `translate(${f.x.toFixed(2)} ${f.y.toFixed(2)}) scale(${f.s.toFixed(4)})`);
        focalGroupRef.current.setAttribute('opacity', (kOp * (1 - kRet)).toFixed(3));
      }
      const kLogo = E.enter(seg(p, 'intro', 0, 0.55));
      const ls = lerp(0.82, 1, kLogo);
      if (logoOuterRef.current) {
        logoOuterRef.current.setAttribute(
          'transform',
          `translate(${g.LOGO_C.x.toFixed(2)} ${g.LOGO_C.y.toFixed(2)}) scale(${ls.toFixed(4)}) translate(${(-g.LOGO_C.x).toFixed(2)} ${(-g.LOGO_C.y).toFixed(2)})`
        );
        logoOuterRef.current.setAttribute('opacity', kLogo.toFixed(3));
      }
      const nL = letterRefs.current.length;
      letterRefs.current.forEach((s, i) => {
        if (!s) return;
        const k = E.enter(seg(p, 'intro', 0.14 + i * (0.36 / nL), 0.62 + i * (0.36 / nL)));
        s.setAttribute('y', ((1 - k) * g.FS * 1.05).toFixed(2));
      });

      if (listGroupRef.current) {
        listGroupRef.current.setAttribute('transform', `translate(${L.x} ${L.y.toFixed(2)}) scale(${L.s.toFixed(4)})`);
        listGroupRef.current.setAttribute('opacity', (1 - kRet).toFixed(3));
      }
      SERVICES.forEach((_, i) => {
        const k = E.enter(seg(p, 'build', ARRIVE[i] - 0.02, ARRIVE[i] + 0.24));
        const y = i * GEO.rowGap;
        wipeRefs.current[i]?.setAttribute('width', (k * W * 1.2).toFixed(2));
        labelRefs.current[i]?.setAttribute('y', (y + (1 - k) * 22).toFixed(2));
        idxRefs.current[i]?.setAttribute('y', (y + (1 - k) * 22).toFixed(2));
        const lit = E.move(seg(p, 'build', ARRIVE[i], ARRIVE[i] + 0.1));
        idxRefs.current[i]?.setAttribute('fill', lit > 0.5 ? INK : INK_SOFT);
        idxRefs.current[i]?.setAttribute('opacity', (1 - E.exit(seg(p, 'resolve', 0.05, 0.3))).toFixed(3));
      });

      const kE = E.enter(seg(p, 'resolve', 0.12, 0.42));
      if (eyebrowRef.current) {
        eyebrowRef.current.setAttribute('opacity', (kE * (1 - kRet)).toFixed(3));
        eyebrowRef.current.setAttribute('y', (GEO.eyebrowY + (1 - kE) * 14).toFixed(2));
      }
      g.msgLines.forEach((m, i) => {
        const k = E.enter(seg(p, 'resolve', 0.18 + i * 0.1, 0.5 + i * 0.1));
        msgLineRefs.current[i]?.setAttribute('y', (m.base + (1 - k) * m.size * 1.15).toFixed(2));
      });

      let d: { x: number; y: number; r: number };
      const kPop = E.enter(seg(p, 'intro', 0.5, 0.95));
      const start = periodPos(f, g);
      if (p < PH.build[0] + (PH.build[1] - PH.build[0]) * ARRIVE[0]) {
        const k = E.move(seg(p, 'build', 0.04, ARRIVE[0]));
        d = mixPt(start, rowDot(L, 0), k);
        d.r *= kPop;
      } else if (p < PH.resolve[0]) {
        d = rowDot(L, 0);
        for (let i = 1; i < SERVICES.length; i++) {
          const k = E.move(seg(p, 'build', ARRIVE[i - 1] + 0.02, ARRIVE[i]));
          if (k > 0) d = mixPt(rowDot(L, i - 1), rowDot(L, i), k);
        }
      } else if (p < PH.return[0]) {
        const k = E.move(seg(p, 'resolve', 0.4, 0.78));
        d = mixPt(rowDot(L, SERVICES.length - 1), g.msgDot, k);
      } else {
        const k = E.move(seg(p, 'return', 0.05, 1));
        const home = periodPos(focalTransform(0, g), g);
        d = mixPt(g.msgDot, { ...home, r: 0 }, k);
      }
      dotRef.current?.setAttribute('cx', d.x.toFixed(2));
      dotRef.current?.setAttribute('cy', d.y.toFixed(2));
      dotRef.current?.setAttribute('r', Math.max(0, d.r).toFixed(2));

      const top = rowDot(L, 0);
      const inList = p >= PH.build[0] && p < PH.return[0];
      const trailEnd = p < PH.resolve[0] ? d.y : rowDot(L, SERVICES.length - 1).y;
      const kTrailOut = E.exit(seg(p, 'resolve', 0.2, 0.55));
      if (trailRef.current) {
        trailRef.current.setAttribute('x1', String(top.x));
        trailRef.current.setAttribute('x2', String(top.x));
        trailRef.current.setAttribute('y1', top.y.toFixed(2));
        trailRef.current.setAttribute('y2', Math.max(top.y, trailEnd).toFixed(2));
        trailRef.current.setAttribute('opacity', inList ? (0.45 * (1 - kTrailOut)).toFixed(3) : '0');
      }
    }

    if (reduceMotion) {
      render(clamp(RESOLVED_STILL / REF_END, 0, 0.99999));
      return;
    }
    let t = 0, last: number | null = null, raf = 0;
    function frame(ts: number) {
      if (last != null) t = (t + Math.min(0.1, (ts - last) / 1000)) % DURATION;
      last = ts;
      render(clamp(t / DURATION, 0, 0.99999));
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [reduceMotion]);

  const msgSplit = (() => {
    const last = MESSAGE[MESSAGE.length - 1];
    const idx = last.lastIndexOf(MSG_HIGHLIGHT);
    if (idx < 0) return null;
    return { before: last.slice(0, idx), mid: MSG_HIGHLIGHT, after: last.slice(idx + MSG_HIGHLIGHT.length) };
  })();

  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label="The DataNest BD mark rises, then its full stop travels down a list of four services — WhatsApp API, Meta setup, SaaS and websites, AI agents — landing in the line: one partner, four ways to grow."
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
          <g id={`${uid}-chip`}>
            <rect x="-0.5" y="-0.38" width="1" height="0.76" rx="0.16" fill={`url(#${uid}-gPlate)`} />
            <path d="M -0.34 0.30 L -0.40 0.62 L -0.08 0.36 Z" fill={`url(#${uid}-gPlate)`} />
            <rect x="-0.32" y="-0.22" width="0.64" height="0.44" rx="0.07" fill={LOGO.letter} />
            <path d="M -0.2 -0.1 L 0 0.06 L 0.2 -0.1" fill="none" stroke={LOGO.chevron} strokeWidth={0.07} strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g id={`${uid}-core`}>
            <rect x="0.34" y="-1.17" width="2.21" height="2.38" rx="0.5" fill={`url(#${uid}-gPlate)`} />
            <rect x="0.34" y="-1.17" width="1.0" height="2.38" rx="0.5" fill={`url(#${uid}-gShade)`} opacity={0.9} />
            <path d="M 0.98 0.74 V -0.62 H 1.24 L 1.87 0.28 V -0.62 H 2.13 V 0.74 H 1.87 L 1.24 -0.16 V 0.74 Z" fill={LOGO.letter} />
            <circle cx="0" cy="0" r="1" fill={`url(#${uid}-gBubble)`} />
            <path d="M -0.46 0.78 L -0.44 1.72 Q -0.02 1.24 0.36 0.90 Z" fill={`url(#${uid}-gBubble)`} />
            <path fillRule="evenodd" fill={LOGO.letter} d="M -0.46 -0.64 H 0.16 A 0.69 0.69 0 0 1 0.16 0.74 H -0.46 Z M -0.20 -0.40 V 0.50 H 0.16 A 0.45 0.45 0 0 0 0.16 -0.40 Z" />
          </g>
          <clipPath id={`${uid}-cpFocal`}><rect ref={cpFocalRectRef} /></clipPath>
          {SERVICES.map((sv, i) => (
            <clipPath key={sv.index} id={`${uid}-cpRow${i}`}>
              <rect ref={(el) => { wipeRefs.current[i] = el; }} x={24} y={i * GEO.rowGap - GEO.rowSize * 1.05} height={GEO.rowSize * 1.5} width={0} />
            </clipPath>
          ))}
          {MESSAGE.map((str, i) => (
            <clipPath key={str} id={`${uid}-cpMsg${i}`}>
              <rect ref={(el) => { cpMsgRectRefs.current[i] = el; }} />
            </clipPath>
          ))}
        </defs>

        {/* 1) focal lockup: logo + "DataNest BD", becomes the running header */}
        <g ref={focalGroupRef} opacity={0}>
          <g ref={logoOuterRef} opacity={0}>
            <g>
              {CHIPS.map((c, i) => (
                <use key={i} href={`#${uid}-chip`} transform={`translate(${c[0]} ${c[1]}) scale(${c[2]})`} />
              ))}
              <use href={`#${uid}-core`} />
            </g>
          </g>
          <g clipPath={`url(#${uid}-cpFocal)`}>
            <text
              ref={focalTextRef}
              fontFamily={FONT_BODY}
              fontWeight={800}
              fill={INK}
            >
              {[...FOCAL].map((ch, i) => (
                <tspan key={i} ref={(el) => { letterRefs.current[i] = el; }}>{ch}</tspan>
              ))}
            </text>
          </g>
        </g>

        {/* 2) service list: each row wipes open as the travelling dot arrives */}
        <g ref={listGroupRef}>
          {SERVICES.map((sv, i) => (
            <g key={sv.index} clipPath={`url(#${uid}-cpRow${i})`}>
              <text ref={(el) => { idxRefs.current[i] = el; }} x={40} y={i * GEO.rowGap} fontFamily="monospace" fontSize={22} letterSpacing={1} fill={INK_SOFT}>
                {sv.index}
              </text>
              <text ref={(el) => { labelRefs.current[i] = el; }} x={104} y={i * GEO.rowGap} fontFamily={FONT_BODY} fontWeight={650} letterSpacing={-1} fill={INK}>
                {sv.label}
              </text>
            </g>
          ))}
        </g>

        {/* 3) closing brand message */}
        <g>
          <text ref={eyebrowRef} x={GEO.msgX} y={GEO.eyebrowY} fontFamily="monospace" fontSize={20} letterSpacing={3} fill={INK_SOFT} opacity={0}>
            {EYEBROW}
          </text>
          {MESSAGE.map((str, i) => (
            <g key={str} clipPath={`url(#${uid}-cpMsg${i})`}>
              <text
                ref={(el) => { msgLineRefs.current[i] = el; }}
                x={GEO.msgX}
                fontFamily={FONT_BODY}
                fontWeight={750}
                letterSpacing={-2}
                fill={INK}
              >
                {i === MESSAGE.length - 1 && msgSplit
                  ? <>{msgSplit.before}<tspan fill={HIGHLIGHT}>{msgSplit.mid}</tspan>{msgSplit.after}</>
                  : str}
              </text>
            </g>
          ))}
        </g>

        {/* 4) the travelling full stop + the thread it draws down the list */}
        <line ref={trailRef} stroke={HIGHLIGHT} strokeWidth={2} strokeLinecap="round" opacity={0} />
        <circle ref={dotRef} fill={HIGHLIGHT} r={0} />
      </svg>
    </div>
  );
}
