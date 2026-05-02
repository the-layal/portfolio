import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const COLS = 14;
const ROWS = 9;
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
  const [exiting, setExiting] = useState(false);
  const [tilesGo, setTilesGo] = useState(false);

  const tiles = useMemo<Tile[]>(() =>
    Array.from({ length: COLS * ROWS }, (_, i) => ({
      id: i,
      col: i % COLS,
      row: Math.floor(i / COLS),
      delay: Math.random() * 1800,
      duration: 350 + Math.random() * 300,
      dx: (Math.random() - 0.5) * 40,
      dy: (Math.random() - 0.5) * 40,
    })),
    []
  );

  const maxDelay = useMemo(() => Math.max(...tiles.map(t => t.delay + t.duration)), [tiles]);

  const triggerExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    // Start tile dissolve just after content fades
    setTimeout(() => setTilesGo(true), 80);
    // Unlock scroll and notify parent after all tiles gone
    setTimeout(() => {
      document.body.style.overflow = '';
      onExit();
    }, maxDelay + 200);
  }, [exiting, onExit, maxDelay]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onWheel = () => triggerExit();
    const onTouch = () => triggerExit();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Enter') triggerExit();
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

  return (
    <div className="fixed inset-0 z-[200]" style={{ backgroundColor: DARK }}>

      {/* Tile disintegration grid — sits on top of everything */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {tiles.map(tile => (
          <div
            key={tile.id}
            style={{
              position: 'absolute',
              left: `calc(${tile.col} * 100% / ${COLS})`,
              top: `calc(${tile.row} * 100% / ${ROWS})`,
              width: `calc(100% / ${COLS} + 1px)`,
              height: `calc(100% / ${ROWS} + 1px)`,
              backgroundColor: DARK,
              opacity: tilesGo ? 0 : 1,
              transform: tilesGo
                ? `translate(${tile.dx}px, ${tile.dy}px) scale(0.88)`
                : 'translate(0,0) scale(1)',
              transition: tilesGo
                ? `opacity ${tile.duration}ms ${tile.delay}ms ease-in, transform ${tile.duration}ms ${tile.delay}ms ease-in`
                : 'none',
            }}
          />
        ))}
      </div>

      {/* Content — fades out at the start of exit */}
      <div
        className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-16"
        style={{
          opacity: exiting ? 0 : 1,
          transition: 'opacity 0.35s ease-out',
          pointerEvents: exiting ? 'none' : 'auto',
        }}
      >
        {/* Label */}
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.3em] mb-8"
          style={{ color: 'hsl(24, 67%, 53%)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Layal Barakat
        </motion.p>

        {/* Words */}
        <div style={{ perspective: '800px' }}>
          {['Designer.', 'Maker.', 'Engineer.'].map((word, i) => (
            <div key={word} className="overflow-hidden block">
              <motion.div
                className="block font-serif text-white leading-[1.0] tracking-tight"
                style={{
                  fontSize: 'clamp(3.6rem, 10.5vw, 9rem)',
                  transformOrigin: 'center top',
                }}
                initial={{ rotateX: 80, opacity: 0, y: 20 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Amber rule */}
        <motion.div
          className="mt-10 h-px origin-left"
          style={{ width: 'clamp(80px, 14vw, 180px)', backgroundColor: 'hsl(24, 67%, 53%)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Scroll prompt */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span
            className="font-sans text-[10px] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(247,244,239,0.35)' }}
          >
            scroll to enter
          </span>
          <motion.div
            className="w-px h-10 origin-top"
            style={{ backgroundColor: 'hsl(24, 67%, 53%, 0.5)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          />
        </motion.div>

        {/* Bottom gradient line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, hsl(24, 67%, 53%), transparent)' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.6, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
