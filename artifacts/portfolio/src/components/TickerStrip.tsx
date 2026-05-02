import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  "Design", "Engineering", "Research", "Art", "MIT",
  "Fabrication", "Prototyping", "Making", "Medical Devices",
  "Product Design", "Soft Robotics", "Thesis",
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
      aria-label="Disciplines and keywords"
    >
      <div className="ticker-track">
        <TickerContent />
        <TickerContent />
      </div>
    </motion.div>
  );
}
