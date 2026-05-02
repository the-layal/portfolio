import React, { useEffect, useRef, useState } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?/|<>[]{}';
const FRAME_MS = 38;
const RESOLVE_MS = 780;

interface GlitchTextProps {
  text: string;
  startDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

function rand() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export default function GlitchText({ text, startDelay = 0, className, style }: GlitchTextProps) {
  const [display, setDisplay] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      const startedAt = performance.now();

      intervalRef.current = setInterval(() => {
        const elapsed = performance.now() - startedAt;
        const charsLocked = elapsed >= RESOLVE_MS
          ? text.length
          : Math.floor((elapsed / RESOLVE_MS) * text.length);

        if (charsLocked >= text.length) {
          setDisplay(text);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }

        setDisplay(
          text.slice(0, charsLocked) +
          Array.from({ length: text.length - charsLocked }, rand).join('')
        );
      }, FRAME_MS);
    }, startDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, startDelay]);

  return (
    <span className={className} style={style}>
      {display || '\u00A0'}
    </span>
  );
}
