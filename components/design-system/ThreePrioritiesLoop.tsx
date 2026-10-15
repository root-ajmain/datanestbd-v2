'use client';

import React, { useEffect, useId, useRef } from 'react';
import { useTheme } from '@/components/shell/ThemeProvider';

/**
 * "From a full inbox to three finished priorities": a miniature task-board
 * UI where 248 unread chats sort into three tasks (Plan/Build/Review),
 * each card moving from Inbox to Today and closing its progress ring into
 * a check. Driven the same way as the other two ported animations — a
 * pure function of loop-progress `p`, mutated on refs via rAF — except
 * this one animates real HTML layout (task cards FLIP from inbox slots to
 * today slots) rather than SVG attributes, so geometry is measured via
 * getBoundingClientRect and re-measured on resize.
 */

const LOGO = {
  bubbleTop: '#2b8eff',
  bubbleBottom: '#0a62e0',
  plateFrom: '#ff3b2f',
  plateTo: '#ffb000',
  letter: '#0c1a33',
  chevron: '#ff5a24',
};

const BRAND_NAME = 'DataNest BD';
const DESCRIPTOR = 'Meta Official WhatsApp Business API Provider';
const HEADING = 'Today’s priorities';
const SUBLINE = '248 unread chats, sorted into three clear tasks.';
const INBOX_LABEL = 'Inbox';
const TODAY_LABEL = 'Today';
const CLEAR_TITLE = 'Inbox clear';
const STATUS = ['New', 'In progress', 'Done'];
const UNREAD = 248;
const TASKS = [
  { name: 'Plan', detail: 'Map the Eid broadcast and its templates' },
  { name: 'Build', detail: 'Connect the order-update bot to WhatsApp' },
  { name: 'Review', detail: 'Check delivery rates and template quality' },
];
const MSG_WIDTHS: [number, number][] = [[62, 38], [48, 52], [70, 30], [55, 44], [66, 34], [44, 48], [58, 40], [50, 36]];

const DURATION = 10;
const PHASES: Record<string, [number, number]> = {
  intro: [0, 2], reveal: [2, 4], move: [4, 6], complete: [6, 8], hold: [8, 9], reset: [9, 10],
};
const REF_END = Math.max(...Object.values(PHASES).map(([, b]) => b));
const PH: Record<string, [number, number]> = {};
Object.entries(PHASES).forEach(([k, [a, b]]) => { PH[k] = [a / REF_END, b / REF_END]; });
const STILL_AT = 8.5;
const SPRING_K = 7;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const S_END = 1 - (1 + SPRING_K) * Math.exp(-SPRING_K);
const S = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : (1 - (1 + SPRING_K * x) * Math.exp(-SPRING_K * x)) / S_END);
const POP = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.exp(-7 * x) * Math.cos(7 * x));
const OUT = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
function seg(p: number, phase: string, a: number, b: number) {
  const [p0, p1] = PH[phase];
  const span = p1 - p0;
  return clamp((p - (p0 + a * span)) / ((b - a) * span));
}

const RING_C = 2 * Math.PI * 9;
const CHK_L = 13.2;
const CHIPS: [number, number, number][] = [
  [-1.32, -1.81, 0.64], [-0.94, -1.32, 0.82], [0.02, -1.49, 0.64],
  [-1.43, -0.04, 0.66], [-1.3, 0.81, 0.62], [-1.17, 1.57, 0.85],
];

interface Rect { x: number; y: number; w: number; h: number }
interface Geom { u: number; from: Rect[]; to: Rect[] }
interface TaskRefs {
  el: HTMLDivElement | null;
  prg: SVGCircleElement | null;
  dot: SVGCircleElement | null;
  chk: SVGPathElement | null;
  s0: HTMLSpanElement | null;
  s1: HTMLSpanElement | null;
  s2: HTMLSpanElement | null;
}

function DnMark({ uid, core = false }: { uid: string; core?: boolean }) {
  const viewBox = core ? '-1.05 -1.25 3.65 3.05' : '-1.85 -2.15 4.45 4.35';
  return (
    <svg viewBox={viewBox} aria-hidden="true" className={core ? undefined : 'tpl-mark'}>
      {!core && CHIPS.map((c, i) => <use key={i} href={`#${uid}-chip`} transform={`translate(${c[0]} ${c[1]}) scale(${c[2]})`} />)}
      <use href={`#${uid}-core`} />
    </svg>
  );
}

const IconInbox = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 13.5 6 6h12l2.5 7.5V19h-17z" /><path d="M3.5 13.5h4.8l1.6 2.6h4.2l1.6-2.6h4.8" /></svg>;
const IconSun = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.8" /><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6" /></svg>;
const IconDone = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m8.2 12.3 2.6 2.6 5-5.2" /></svg>;
const IconChart = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 19v-7M12 19V5.5M18.5 19v-4.5" /></svg>;
const IconSliders = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h9M18 7.5h2M4 16.5h3M12 16.5h8" /><circle cx="15.5" cy="7.5" r="2.2" /><circle cx="9.5" cy="16.5" r="2.2" /></svg>;
const IconCal = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.8 12.4 3.4 3.4 7-7.2" /></svg>;

export function ThreePrioritiesLoop({ className = '' }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const { reduceMotion } = useTheme();

  const panelRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const sideRefs = useRef<(HTMLElement | null)[]>([]);
  const topRef = useRef<HTMLElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countRef = useRef<HTMLSpanElement>(null);
  const msgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const clearRef = useRef<HTMLDivElement>(null);
  const clearSubRef = useRef<HTMLSpanElement>(null);
  const inSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progTRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const taskRefs = useRef<TaskRefs[]>(TASKS.map(() => ({ el: null, prg: null, dot: null, chk: null, s0: null, s1: null, s2: null })));

  const geomRef = useRef<Geom | null>(null);

  useEffect(() => {
    function measure() {
      const board = boardRef.current, panelEl = panelRef.current;
      if (!board || !panelEl) return;
      const b = board.getBoundingClientRect();
      const rel = (n: Element): Rect => {
        const r = n.getBoundingClientRect();
        return { x: r.left - b.left, y: r.top - b.top, w: r.width, h: r.height };
      };
      const u = Math.min(panelEl.clientWidth, panelEl.clientHeight) / 100;
      const from = inSlotRefs.current.map((el) => (el ? rel(el) : { x: 0, y: 0, w: 0, h: 0 }));
      const to = outSlotRefs.current.map((el) => (el ? rel(el) : { x: 0, y: 0, w: 0, h: 0 }));
      taskRefs.current.forEach((t, i) => {
        if (t.el) { t.el.style.width = `${from[i].w}px`; t.el.style.height = `${from[i].h}px`; }
      });
      geomRef.current = { u, from, to };
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (panelRef.current) ro.observe(panelRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    function rise(node: HTMLElement | null, k: number, dist: number, u: number) {
      if (!node) return;
      node.style.opacity = k.toFixed(3);
      node.style.transform = `translateY(${((1 - k) * dist * u).toFixed(2)}px)`;
    }

    function render(p: number) {
      const geom = geomRef.current;
      if (!geom) return;
      const { u } = geom;
      const n = TASKS.length;

      sideRefs.current.forEach((node, i) => rise(node, S(seg(p, 'intro', 0.18 + i * 0.06, 0.6 + i * 0.06)), 1.6, u));
      rise(topRef.current, S(seg(p, 'intro', 0.28, 0.75)), 1.8, u);
      rise(titlesRef.current, S(seg(p, 'intro', 0.34, 0.82)), 2.2, u);
      colRefs.current.forEach((c, i) => rise(c, S(seg(p, 'intro', 0.42 + i * 0.08, 0.9 + i * 0.08)), 2.6, u));

      msgRefs.current.forEach((m, i) => {
        if (!m) return;
        const kIn = S(seg(p, 'intro', 0.5 + i * 0.035, 0.82 + i * 0.035));
        const kOut = OUT(seg(p, 'reveal', i * 0.045, 0.3 + i * 0.045));
        m.style.opacity = (kIn * (1 - kOut)).toFixed(3);
        m.style.transform = `translateY(${(((1 - kIn) * 1.4 - kOut * 1.6) * u).toFixed(2)}px)`;
      });

      let moved = 0, done = 0, doneSum = 0;
      TASKS.forEach((_, i) => {
        const t = taskRefs.current[i];
        if (!t.el) return;
        const kR = S(seg(p, 'reveal', 0.28 + i * 0.16, 0.66 + i * 0.16));
        const mA = i * 0.31, mB = mA + 0.38;
        const kM = S(seg(p, 'move', mA, mB));
        const a = geom.from[i], b = geom.to[i];
        const lift = Math.sin(Math.PI * kM) * 1.4 * u;
        const x = lerp(a.x, b.x, kM);
        const y = lerp(a.y, b.y, kM) + (1 - kR) * 2.4 * u - lift;
        t.el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
        t.el.style.opacity = kR.toFixed(3);
        const sh = Math.sin(Math.PI * kM);
        t.el.style.boxShadow = `0 ${(0.4 + sh * 1.6) * u}px ${(1 + sh * 3) * u}px -${(0.6 + sh) * u}px rgba(0,4,11,${(0.35 + sh * 0.25).toFixed(3)})`;
        t.el.style.zIndex = kM > 0 && kM < 1 ? '3' : '2';
        if (kM > 0.5) moved++;

        const kF = S(seg(p, 'complete', i * 0.22, 0.36 + i * 0.22));
        const cA = 0.3 + i * 0.22;
        const kDot = POP(seg(p, 'complete', cA, cA + 0.24));
        const kChk = S(seg(p, 'complete', cA + 0.05, cA + 0.28));
        t.prg?.setAttribute('stroke-dashoffset', (RING_C * (1 - kF)).toFixed(2));
        if (t.dot) t.dot.style.transform = `scale(${kDot.toFixed(3)})`;
        t.chk?.setAttribute('stroke-dashoffset', (CHK_L * (1 - kChk)).toFixed(2));
        if (kChk > 0.5) done++;
        doneSum += S(seg(p, 'complete', cA, cA + 0.24));

        const k1 = S(seg(p, 'move', mB - 0.12, mB + 0.02));
        const k2 = S(seg(p, 'complete', cA, cA + 0.2));
        if (t.s0) t.s0.style.opacity = (1 - k1).toFixed(3);
        if (t.s1) t.s1.style.opacity = (k1 * (1 - k2)).toFixed(3);
        if (t.s2) t.s2.style.opacity = k2.toFixed(3);

        const outSlot = outSlotRefs.current[i];
        if (outSlot) outSlot.style.opacity = (1 - S(seg(p, 'move', mA + 0.2, mB))).toFixed(3);
      });

      let count = UNREAD;
      if (p >= PH.reveal[0]) count = Math.round(lerp(UNREAD, n, S(seg(p, 'reveal', 0.05, 0.85))));
      if (p >= PH.move[0]) count = n - moved;
      if (countRef.current) countRef.current.textContent = String(count);
      rise(clearRef.current, S(seg(p, 'move', 0.8, 1)), 1.6, u);

      if (progTRef.current) progTRef.current.textContent = `${done} / ${n}`;
      if (barRef.current) barRef.current.style.width = `${((doneSum / n) * 100).toFixed(2)}%`;
    }

    if (reduceMotion) {
      render(clamp(STILL_AT / REF_END, 0, 0.99999));
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

  const clearSub = `${Math.max(0, UNREAD - TASKS.length)} chats answered automatically`;
  const nameParts = BRAND_NAME.split(' ');

  return (
    <div
      className={`tpl-stage ${className}`}
      role="img"
      aria-label="A task panel turns 248 unread WhatsApp chats into three tasks — Plan, Build and Review — moves each into Today, and marks all three done."
    >
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
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
        </defs>
      </svg>

      <div ref={panelRef} className="tpl-panel">
        <div className="tpl-pin">
          <aside className="tpl-side">
            <div className="tpl-logo" ref={(el) => { sideRefs.current[0] = el; }}><DnMark uid={uid} core /></div>
            <div className="tpl-sep" ref={(el) => { sideRefs.current[1] = el; }} />
            <div className="tpl-ico" ref={(el) => { sideRefs.current[2] = el; }}><IconInbox /></div>
            <div className="tpl-ico on" ref={(el) => { sideRefs.current[3] = el; }}><IconSun /></div>
            <div className="tpl-ico" ref={(el) => { sideRefs.current[4] = el; }}><IconDone /></div>
            <div className="tpl-ico" ref={(el) => { sideRefs.current[5] = el; }}><IconChart /></div>
            <div className="tpl-spacer" />
            <div className="tpl-ico" ref={(el) => { sideRefs.current[6] = el; }}><IconSliders /></div>
          </aside>
          <section className="tpl-main">
            <header className="tpl-top" ref={topRef}>
              <div className="tpl-brandrow">
                <DnMark uid={uid} />
                <div className="tpl-wm">
                  <span className="tpl-wm-name">
                    {nameParts.slice(0, -1).join(' ')} <b>{nameParts[nameParts.length - 1]}</b>
                  </span>
                  <span className="tpl-wm-desc">{DESCRIPTOR}</span>
                </div>
              </div>
              <span className="tpl-chip"><IconCal />{TODAY_LABEL}</span>
            </header>
            <div className="tpl-titles" ref={titlesRef}>
              <h2 className="tpl-h">{HEADING}</h2>
              <p className="tpl-sub">{SUBLINE}</p>
            </div>
            <div className="tpl-board" ref={boardRef}>
              <div className="tpl-col tpl-inbox" ref={(el) => { colRefs.current[0] = el; }}>
                <div className="tpl-col-h"><IconInbox />{INBOX_LABEL}<span className="tpl-count" ref={countRef}>0</span></div>
                <div className="tpl-col-b">
                  <div className="tpl-msgs">
                    {MSG_WIDTHS.map((w, i) => (
                      <div className="tpl-msg" key={i} ref={(el) => { msgRefs.current[i] = el; }}>
                        <span className="tpl-av" />
                        <span className="tpl-ln"><i style={{ width: `${w[0]}%` }} /><i style={{ width: `${w[1]}%` }} /></span>
                      </div>
                    ))}
                  </div>
                  <div className="tpl-clear" ref={clearRef}>
                    <span className="tpl-ok"><IconCheck /></span>
                    <strong>{CLEAR_TITLE}</strong>
                    <span ref={clearSubRef}>{clearSub}</span>
                  </div>
                  <div className="tpl-slots">
                    {TASKS.map((_, i) => <div className="tpl-slot" key={i} ref={(el) => { inSlotRefs.current[i] = el; }} />)}
                  </div>
                </div>
              </div>
              <div className="tpl-col tpl-today" ref={(el) => { colRefs.current[1] = el; }}>
                <div className="tpl-col-h">
                  <IconSun />{TODAY_LABEL}
                  <span className="tpl-prog">
                    <span ref={progTRef}>0 / {TASKS.length}</span>
                    <span className="tpl-bar"><i ref={barRef} /></span>
                  </span>
                </div>
                <div className="tpl-col-b">
                  <div className="tpl-slots">
                    {TASKS.map((_, i) => <div className="tpl-slot" key={i} ref={(el) => { outSlotRefs.current[i] = el; }} />)}
                  </div>
                </div>
              </div>
              {TASKS.map((task, i) => (
                <div
                  className="tpl-task"
                  key={task.name}
                  ref={(el) => { taskRefs.current[i].el = el; }}
                >
                  <svg className="tpl-ring" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="tpl-trk" cx="12" cy="12" r="9" />
                    <circle
                      className="tpl-prg"
                      cx="12" cy="12" r="9"
                      transform="rotate(-90 12 12)"
                      strokeDasharray={RING_C.toFixed(2)}
                      strokeDashoffset={RING_C.toFixed(2)}
                      ref={(el) => { taskRefs.current[i].prg = el; }}
                    />
                    <circle className="tpl-dot" cx="12" cy="12" r="10.2" ref={(el) => { taskRefs.current[i].dot = el; }} />
                    <path
                      className="tpl-chk"
                      d="M7.6 12.3l3 3 5.8-6"
                      strokeDasharray={CHK_L}
                      strokeDashoffset={CHK_L}
                      ref={(el) => { taskRefs.current[i].chk = el; }}
                    />
                  </svg>
                  <div className="tpl-tx">
                    <div className="tpl-tt">
                      <span className="tpl-name">{task.name}</span>
                      <span className="tpl-pill">
                        <span className="tpl-s0" ref={(el) => { taskRefs.current[i].s0 = el; }}>{STATUS[0]}</span>
                        <span className="tpl-s1" ref={(el) => { taskRefs.current[i].s1 = el; }}>{STATUS[1]}</span>
                        <span className="tpl-s2" ref={(el) => { taskRefs.current[i].s2 = el; }}>{STATUS[2]}</span>
                      </span>
                    </div>
                    <div className="tpl-det">{task.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
