import React, { useEffect, useState } from 'react';

interface EmojiCursorProps {
  emoji: string | null;
}

export default function EmojiCursor({ emoji }: EmojiCursorProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX + 14, y: e.clientY + 4 });
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  if (!emoji || !pos) return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
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
