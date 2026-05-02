import React from 'react';
import { motion } from 'framer-motion';

export default function BlueprintOverlay() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[150]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      aria-hidden
    >
      {/* Graph-paper grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg,   transparent, transparent 39px, rgba(100,220,255,0.12) 39px, rgba(100,220,255,0.12) 40px),
            repeating-linear-gradient(90deg,  transparent, transparent 39px, rgba(100,220,255,0.12) 39px, rgba(100,220,255,0.12) 40px),
            repeating-linear-gradient(0deg,   transparent, transparent 7px,  rgba(100,220,255,0.05) 7px,  rgba(100,220,255,0.05) 8px),
            repeating-linear-gradient(90deg,  transparent, transparent 7px,  rgba(100,220,255,0.05) 7px,  rgba(100,220,255,0.05) 8px)
          `,
        }}
      />

      {/* Title-block stamp — bottom-right corner */}
      <div
        className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.25em] uppercase"
        style={{
          color: 'rgba(100,220,255,0.55)',
          border: '1px solid rgba(100,220,255,0.25)',
          padding: '6px 12px',
          lineHeight: 1.8,
        }}
      >
        <div style={{ color: 'rgba(100,220,255,0.85)', fontWeight: 600, letterSpacing: '0.35em' }}>
          BLUEPRINT MODE
        </div>
        <div style={{ opacity: 0.5 }}>LAYAL BARAKAT — PORTFOLIO</div>
        <div style={{ opacity: 0.4 }}>PRESS B TO EXIT</div>
      </div>
    </motion.div>
  );
}
