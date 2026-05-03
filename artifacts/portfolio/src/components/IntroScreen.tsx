import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const DARK = '#1A1714';
const ANIM_MS = 1300;

interface IntroScreenProps {
  onExit: () => void;
}

export default function IntroScreen({ onExit }: IntroScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'dissolving'>('intro');
  const [bleedRadius, setBleedRadius] = useState(0);
  const rafRef = useRef<number | null>(null);
  const hasExited = useRef(false);

  const safeExit = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;
    onExit();
  }, [onExit]);

  const triggerExit = useCallback(() => {
    if (phase !== 'intro') return;
    setPhase('dissolving');
  }, [phase]);

  useEffect(() => {
    if (phase !== 'dissolving') return;
    const diag = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 80;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / ANIM_MS, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      setBleedRadius(eased * diag);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        safeExit();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase, safeExit]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onWheel = () => triggerExit();
    const onTouch = () => triggerExit();
    const onKey = (e: KeyboardEvent) => {
      if (['Space', 'ArrowDown', 'Enter'].includes(e.code)) triggerExit();
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('keydown', onKey);
    };
  }, [triggerExit]);

  const dissolving = phase === 'dissolving';

  const words = [
    { text: 'Designer.', startDelay: 250 },
    { text: 'Maker.',    startDelay: 500 },
    { text: 'Engineer.', startDelay: 750 },
  ];

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">

      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <filter id="inkBleedFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.007"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="80"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <mask id="inkBleedMask">
            <rect width="100%" height="100%" fill="white" />
            <circle
              cx="50%"
              cy="50%"
              r={bleedRadius}
              fill="black"
              filter="url(#inkBleedFilter)"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={DARK} mask="url(#inkBleedMask)" />
      </svg>

      <div
        className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-16"
        style={{
          opacity: dissolving ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: dissolving ? 'none' : 'auto',
        }}
      >
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.3em] mb-8"
          style={{ color: 'hsl(24, 67%, 53%)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Layal Barakat
        </motion.p>

        <div style={{ perspective: '800px' }}>
          {words.map(({ text, startDelay }) => (
            <div key={text} className="block">
              <GlitchText
                text={text}
                startDelay={startDelay}
                className="block font-serif text-white leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(3.6rem, 10.5vw, 9rem)' }}
              />
            </div>
          ))}
        </div>

        <motion.div
          className="mt-10 h-px origin-left"
          style={{ width: 'clamp(80px, 14vw, 180px)', backgroundColor: 'hsl(24, 67%, 53%)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span
            className="font-sans text-[10px] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(247,244,239,0.35)' }}
          >
            scroll to enter
          </span>
          <motion.div
            className="w-px h-10 origin-top"
            style={{ backgroundColor: 'rgba(217,119,54,0.5)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          />
        </motion.div>

        <motion.button
          type="button"
          onClick={safeExit}
          className="absolute bottom-12 right-6 md:right-16 font-sans uppercase tracking-[0.25em] pointer-events-auto"
          style={{
            fontSize: '0.65rem',
            color: 'rgba(247,244,239,0.38)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
          }}
          whileHover={{ color: 'rgba(247,244,239,0.75)' }}
          aria-label="Skip intro"
        >
          Skip →
        </motion.button>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, hsl(24,67%,53%), transparent)' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.6, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
