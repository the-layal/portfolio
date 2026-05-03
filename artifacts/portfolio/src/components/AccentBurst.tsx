import React from 'react';
import { motion } from 'framer-motion';

interface AccentBurstProps {
  x: number;
  y: number;
  color: string;
  onDone: () => void;
}

export default function AccentBurst({ x, y, color, onDone }: AccentBurstProps) {
  return (
    <motion.span
      aria-hidden
      style={{
        position: 'fixed',
        top: y,
        left: x,
        width: 40,
        height: 40,
        marginTop: -20,
        marginLeft: -20,
        borderRadius: '50%',
        backgroundColor: color,
        pointerEvents: 'none',
        zIndex: 99999,
        transformOrigin: 'center',
        display: 'block',
      }}
      initial={{ scale: 0, opacity: 0.45 }}
      animate={{ scale: 8, opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onDone}
    />
  );
}
