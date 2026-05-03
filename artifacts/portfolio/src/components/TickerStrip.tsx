import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Steve Jobs",
];

const SEP = "\u2726"; // ✦

function TickerContent() {
  return (
    <span className="ticker-content" aria-hidden>
      {ITEMS.map((item, i) => (
        <React.Fragment key={i}>
          <span className="ticker-item">{item}</span>
          <span className="ticker-sep">{SEP}</span>
        </React.Fragment>
      ))}
    </span>
  );
}

export default function TickerStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="ticker-strip"
      aria-label="Steve Jobs design quote"
    >
      <div className="ticker-track">
        <TickerContent />
        <TickerContent />
        <TickerContent />
        <TickerContent />
      </div>
    </motion.div>
  );
}
