import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const COLS = 28;
const ROWS = 16;
const DARK = '#1A1714';

interface Tile {
  id: number;
  col: number;
  row: number;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
}

interface IntroScreenProps {
  onExit: () => void;
}

export default function IntroScreen({ onExit }: IntroScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'dissolving' | 'done'>('intro');

  const tiles = useMemo<Tile[]>(() =>
    Array.from({ length: COLS * ROWS }, (_, i) => ({
      id: i,
      col: i % COLS,
      row: Math.floor(i / COLS),
      delay: Math.random() * 1600,
      duration: 350 + Math.random() * 300,
      dx: (Math.random() - 0.5) * 50,
      dy: (Math.random() - 0.5) * 50,
    })),
    []
  );

  const maxDuration = useMemo(() =>
    Math.max(...tiles.map(t => t.delay + t.duration)),
    [tiles]
  );

  const triggerExit = useCallback(() => {
    if (phase !== 'intro') return;
    setPhase('dissolving');
    setTimeout(() => {
      setPhase('done');
      onExit();
    }, maxDuration + 300);
  }, [phase, onExit, maxDuration]);

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

  return (
    /*
     * Root has NO background — tiles supply all darkness.
     * When tiles fade to transparent, the light page beneath shows through.
     */
    <div className="fixed inset-0 z-[200] overflow-hidden">

      {/* ── Tile grid ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {tiles.map(tile => (
          <div
            key={tile.id}
            style={{
              position: 'absolute',
              left: `${(tile.col / COLS) * 100}%`,
              top: `${(tile.row / ROWS) * 100}%`,
              /* +2px prevents sub-pixel gaps between tiles */
              width: `calc(${100 / COLS}% + 2px)`,
              height: `calc(${100 / ROWS}% + 2px)`,
              backgroundColor: DARK,
              willChange: 'opacity, transform',
              /*
               * Always declare the transition so the browser picks it up
               * the moment `opacity` changes from 1 → 0.
               */
              transition: `opacity ${tile.duration}ms ${tile.delay}ms ease-in,
                           transform ${tile.duration}ms ${tile.delay}ms ease-in`,
              opacity: dissolving ? 0 : 1,
              transform: dissolving
                ? `translate(${tile.dx}px, ${tile.dy}px) scale(0.82)`
                : 'translate(0,0) scale(1)',
            }}
          />
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
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
          {['Designer.', 'Maker.', 'Engineer.'].map((word, i) => (
            <div key={word} className="overflow-hidden block">
              <motion.div
                className="block font-serif text-white leading-[1.0] tracking-tight"
                style={{ fontSize: 'clamp(3.6rem, 10.5vw, 9rem)', transformOrigin: 'center top' }}
                initial={{ rotateX: 80, opacity: 0, y: 20 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.div>
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
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(247,244,239,0.35)' }}>
            scroll to enter
          </span>
          <motion.div
            className="w-px h-10 origin-top"
            style={{ backgroundColor: 'rgba(217,119,54,0.5)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          />
        </motion.div>

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
