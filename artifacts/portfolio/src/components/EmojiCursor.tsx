import React, { useEffect, useRef } from 'react';

interface EmojiCursorProps {
  emoji: string | null;
}

export default function EmojiCursor({ emoji }: EmojiCursorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emoji) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 4}px)`;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [emoji]);

  if (!emoji) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        fontSize: '1.4rem',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      {emoji}
    </div>
  );
}
