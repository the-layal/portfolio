import React, { useEffect, useRef, useState } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?/|<>[]{}';
const FRAME_MS = 38;
const RESOLVE_MS = 780;

interface GlitchTextProps {
  text: string;
  resolveDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

function rand() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export default function GlitchText({ text, resolveDelay = 0, className, style }: GlitchTextProps) {
  const [display, setDisplay] = useState(() =>
    Array.from({ length: text.length }, rand).join('')
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const beginAt = performance.now() + resolveDelay;

    intervalRef.current = setInterval(() => {
      const now = performance.now();
      const elapsed = Math.max(0, now - beginAt);
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

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, resolveDelay]);

  return (
    <span className={className} style={style}>
      {display}
    </span>
  );
}
