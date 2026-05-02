import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_TEXT = "& sometimes artist :)";
const CHAR_INTERVAL_MS = 65;
const CURSOR_BLINK_DURATION = 2200;

interface PaperScrapProps {
  animate: boolean;
  text?: string;
}

export default function PaperScrap({ animate, text = DEFAULT_TEXT }: PaperScrapProps) {
  const [revealed, setRevealed] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!animate) return;

    let index = 0;
    setRevealed('');
    setShowCursor(true);
    setCursorVisible(true);

    intervalRef.current = setInterval(() => {
      index += 1;
      setRevealed(text.slice(0, index));
      if (index >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        blinkRef.current = setInterval(() => {
          setCursorVisible(v => !v);
        }, 500);
        blinkTimeoutRef.current = setTimeout(() => {
          if (blinkRef.current) clearInterval(blinkRef.current);
          setShowCursor(false);
        }, CURSOR_BLINK_DURATION);
      }
    }, CHAR_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (blinkRef.current) clearInterval(blinkRef.current);
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [animate, text]);

  return (
    <motion.div
      className="hidden md:block relative select-none"
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      animate={animate ? { opacity: 1, y: 0, rotate: -3 } : { opacity: 0, y: 24, rotate: -2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{ width: 'clamp(200px, 22vw, 300px)' }}
    >
      <img
        src="/paper-scrap.png"
        alt=""
        aria-hidden
        className="w-full h-auto drop-shadow-xl"
        draggable={false}
      />

      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{ paddingBottom: '8%' }}
      >
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
            lineHeight: 1.35,
            color: '#4a3728',
            textAlign: 'center',
          }}
        >
          {revealed}
          {showCursor && (
            <span style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
