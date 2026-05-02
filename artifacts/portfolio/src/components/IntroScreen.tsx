import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const WORDS = ["Designer.", "Maker.", "Engineer."];

interface IntroScreenProps {
  onExit: () => void;
}

export default function IntroScreen({ onExit }: IntroScreenProps) {
  const [exiting, setExiting] = useState(false);

  const triggerExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onExit, 1050);
  }, [exiting, onExit]);

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
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-center items-start px-6 md:px-16 select-none"
      style={{ backgroundColor: '#1A1714', perspective: '1200px' }}
      animate={exiting ? { y: '-100%', rotateX: '-3deg' } : { y: '0%', rotateX: '0deg' }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
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

      {/* Words with perspective flip-in */}
      <div style={{ perspective: '800px' }}>
        {WORDS.map((word, i) => (
          <div key={word} className="overflow-hidden block">
            <motion.div
              className="block font-serif text-white leading-[1.0] tracking-tight"
              style={{ fontSize: 'clamp(3.6rem, 10.5vw, 9rem)', transformOrigin: 'center top' }}
              initial={{ rotateX: 80, opacity: 0, y: 20 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25 + i * 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Amber rule that draws in below the text */}
      <motion.div
        className="mt-10 h-px origin-left"
        style={{
          width: 'clamp(80px, 14vw, 180px)',
          backgroundColor: 'hsl(24, 67%, 53%)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Scroll-to-enter */}
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
    </motion.div>
  );
}
