import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'sticky_note_v1';

export default function StickyNote() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved !== null) setValue(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (open && taRef.current) {
      const id = window.setTimeout(() => taRef.current?.focus(), 220);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    try { sessionStorage.setItem(STORAGE_KEY, e.target.value); } catch {}
  };

  return (
    <div
      className="fixed z-[120] pointer-events-none"
      style={{ right: '1.25rem', bottom: '1.25rem' }}
    >
      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? 'Close sticky note' : 'Open sticky note'}
        aria-expanded={open}
        className="pointer-events-auto relative flex items-center justify-center"
        style={{
          width: 52,
          height: 52,
          background: '#FFD96B',
          color: '#3a2e10',
          boxShadow: '0 6px 18px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.1)',
          transform: 'rotate(-6deg)',
          border: 'none',
          cursor: 'none',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h6" />
          <path d="M8 17h4" />
        </svg>
      </motion.button>

      {/* Sticky note panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="note"
            initial={{ opacity: 0, scale: 0.4, x: 40, y: 40, rotate: 8 }}
            animate={{
              opacity: 1, scale: 1, x: 0, y: 0, rotate: -2.5,
              transition: { type: 'spring', stiffness: 320, damping: 22, mass: 0.6 },
            }}
            exit={{
              opacity: 0, scale: 0.55, x: 40, y: 40, rotate: 6,
              transition: { duration: 0.22, ease: 'easeIn' },
            }}
            className="pointer-events-auto absolute"
            style={{
              right: 0,
              bottom: 64,
              width: 'min(280px, 78vw)',
              height: 260,
              background: 'linear-gradient(180deg, #FFE89A 0%, #FFD96B 100%)',
              boxShadow:
                '0 18px 40px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12), inset 0 0 30px rgba(180,140,40,0.08)',
              transformOrigin: '90% 95%',
              padding: '14px 16px 16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              className="flex items-center justify-between mb-2"
              style={{ color: '#5a4416' }}
            >
              <span
                style={{
                  fontFamily: "'Caveat', 'Special Elite', cursive",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                note to self
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="pointer-events-auto"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'none',
                  color: '#5a4416',
                  fontSize: '1.1rem',
                  lineHeight: 1,
                  padding: '2px 6px',
                }}
              >
                ×
              </button>
            </div>

            <textarea
              ref={taRef}
              value={value}
              onChange={onChange}
              placeholder="jot something down…"
              spellCheck={false}
              className="pointer-events-auto flex-1 w-full resize-none bg-transparent outline-none border-0 placeholder:text-[#7a5e1e]/55"
              style={{
                fontFamily: "'Caveat', 'Special Elite', cursive",
                fontSize: '1.25rem',
                lineHeight: 1.35,
                color: '#3a2e10',
                cursor: 'text',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
