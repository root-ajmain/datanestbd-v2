import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts } from '../brand';
import '../load-fonts';

export interface WhyChooseUsProps {
  title: string;
  points: string[];
}

const POINT_START_FRAME = 40;
const POINT_STAGGER = 32;
const FADE_OUT_START = 215;
const FADE_OUT_END = 240;

function Point({ text, index, frame, fps }: { text: string; index: number; frame: number; fps: number }) {
  const enterAt = POINT_START_FRAME + index * POINT_STAGGER;
  const progress = spring({ frame: frame - enterAt, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [-24, 0]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: colors.brand,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width={18} height={14} viewBox="0 0 18 14" fill="none">
          <path d="M1 7L6.5 12.5L17 1.5" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span
        style={{
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 34,
          color: colors.white,
          lineHeight: 1.3,
        }}
      >
        {text}
      </span>
    </div>
  );
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ title, points }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 200 } });
  const headerProgress = spring({ frame: frame - 10, fps, config: { damping: 200 } });

  const groupFadeOut = interpolate(frame, [FADE_OUT_START, FADE_OUT_END], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 60% 45% at 15% 0%, ${colors.brand}26 0%, transparent 60%), ${colors.navy900}`,
        padding: '0 90px',
        opacity: groupFadeOut,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: interpolate(logoProgress, [0, 1], [0, 1]) }}>
        <Img src={staticFile('brand/datanest-logo-mark.png')} style={{ width: 48, height: 48, objectFit: 'contain' }} />
        <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 24, color: colors.white, letterSpacing: 1 }}>
          DataNest BD
        </span>
      </div>

      <div
        style={{
          marginTop: 48,
          opacity: interpolate(headerProgress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headerProgress, [0, 1], [16, 0])}px)`,
        }}
      >
        <span style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: colors.accent, textTransform: 'uppercase' }}>
          Why choose us
        </span>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 56,
            color: colors.white,
            margin: '10px 0 0',
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {title}
        </h1>
      </div>

      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
        {points.map((point, index) => (
          <Point key={point} text={point} index={index} frame={frame} fps={fps} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
