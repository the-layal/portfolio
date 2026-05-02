import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_TEXT = "& sometimes artist :)";
const CHAR_INTERVAL_MS = 68;
const CURSOR_BLINK_DURATION = 2400;

const NOTES = [
  { bg: '#BAD4D8', rotate: 7,  x: 14, y: 18 },
  { bg: '#C8D8B0', rotate: -5, x: -8, y: 10 },
  { bg: '#F5E89A', rotate: -2, x: 0,  y: 0  },
];

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

  const size = 'clamp(150px, 17vw, 220px)';

  return (
    <motion.div
      className="hidden md:block relative select-none flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {NOTES.map((note, i) => {
        const isTop = i === NOTES.length - 1;
        return (
          <motion.div
            key={i}
            initial={{ rotate: note.rotate - 4, opacity: 0, scale: 0.92 }}
            animate={animate
              ? { rotate: note.rotate, opacity: 1, scale: 1 }
              : { rotate: note.rotate - 4, opacity: 0, scale: 0.92 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15 + i * 0.08,
            }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: note.bg,
              translateX: note.x,
              translateY: note.y,
              boxShadow: '2px 4px 16px rgba(0,0,0,0.13)',
            }}
          >
            {isTop && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '18%',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Special Elite', monospace",
                    fontSize: 'clamp(0.8rem, 1.6vw, 1.1rem)',
                    lineHeight: 1.5,
                    color: '#3a2e1e',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                  }}
                >
                  {revealed}
                  {showCursor && (
                    <span style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
                  )}
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
