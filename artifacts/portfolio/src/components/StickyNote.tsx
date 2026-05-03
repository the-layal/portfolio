import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntroVisible } from '@/hooks/use-intro-state';

const STORAGE_KEY = 'sticky_note_v1';
const COLOR_STORAGE_KEY = 'sticky_note_color_v1';

type Swatch = {
  id: string;
  label: string;
  bg: string;
  bgGradientTop: string;
  bgGradientBottom: string;
  ink: string;
  inkSoft: string;
  innerShadow: string;
};

const SWATCHES: Swatch[] = [
  {
    id: 'yellow',
    label: 'Yellow',
    bg: '#F5E89A',
    bgGradientTop: '#F8EFB0',
    bgGradientBottom: '#F0DF85',
    ink: '#3a2e10',
    inkSoft: '#5a4416',
    innerShadow: 'rgba(180,140,40,0.10)',
  },
  {
    id: 'pink',
    label: 'Pink',
    bg: '#F5C2C7',
    bgGradientTop: '#F8D2D6',
    bgGradientBottom: '#EFB0B6',
    ink: '#3a1418',
    inkSoft: '#6b2a30',
    innerShadow: 'rgba(170,60,75,0.10)',
  },
  {
    id: 'blue',
    label: 'Blue',
    bg: '#BAD4D8',
    bgGradientTop: '#CCE0E3',
    bgGradientBottom: '#A8C7CC',
    ink: '#102528',
    inkSoft: '#2c4549',
    innerShadow: 'rgba(40,90,100,0.10)',
  },
  {
    id: 'green',
    label: 'Green',
    bg: '#C8D8B0',
    bgGradientTop: '#D6E2C0',
    bgGradientBottom: '#B6CB9E',
    ink: '#1c2811',
    inkSoft: '#3b4a28',
    innerShadow: 'rgba(80,110,50,0.10)',
  },
];

const DEFAULT_SWATCH_ID = SWATCHES[0].id;

const getSwatch = (id: string): Swatch =>
  SWATCHES.find(s => s.id === id) ?? SWATCHES[0];

export default function StickyNote() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [colorId, setColorId] = useState<string>(DEFAULT_SWATCH_ID);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const introVisible = useIntroVisible();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved !== null) setValue(saved);
      const savedColor = sessionStorage.getItem(COLOR_STORAGE_KEY);
      if (savedColor && SWATCHES.some(s => s.id === savedColor)) {
        setColorId(savedColor);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const id = window.setTimeout(() => taRef.current?.focus(), 220);
    return () => window.clearTimeout(id);
  }, [open]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    try { sessionStorage.setItem(STORAGE_KEY, e.target.value); } catch {}
  };

  const pickColor = (id: string) => {
    setColorId(id);
    try { sessionStorage.setItem(COLOR_STORAGE_KEY, id); } catch {}
  };

  const swatch = getSwatch(colorId);

  return (
    <div
      className="sticky-note-anchor z-[9990] pointer-events-none"
      aria-hidden={introVisible}
      style={{
        opacity: introVisible ? 0 : 1,
        visibility: introVisible ? 'hidden' : 'visible',
        transition: 'opacity 0.45s ease-out 0.15s, visibility 0s linear ' +
          (introVisible ? '0s' : '0.15s'),
      }}
    >
      <motion.button
        type="button"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? 'Close sticky note' : 'Open sticky note'}
        aria-expanded={open}
        className="sticky-note-btn pointer-events-auto relative flex items-center justify-center"
        style={{
          background: swatch.bg,
          color: swatch.ink,
          boxShadow: '0 6px 18px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.1)',
          transform: 'rotate(-6deg)',
          border: 'none',
          transition: 'background 0.25s ease, color 0.25s ease',
        }}
      >
        <svg className="sticky-note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h6" />
          <path d="M8 17h4" />
        </svg>
      </motion.button>

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
            className="sticky-note-panel pointer-events-auto absolute"
            style={{
              right: 0,
              background: `linear-gradient(180deg, ${swatch.bgGradientTop} 0%, ${swatch.bgGradientBottom} 100%)`,
              boxShadow:
                `0 18px 40px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12), inset 0 0 30px ${swatch.innerShadow}`,
              transformOrigin: '90% 95%',
              padding: '14px 16px 16px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'background 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            <div
              className="flex items-center justify-between mb-2"
              style={{ color: swatch.inkSoft }}
            >
              <span
                style={{
                  fontFamily: "'Special Elite', monospace",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '0.02em',
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
                  color: swatch.inkSoft,
                  fontSize: '1.1rem',
                  lineHeight: 1,
                  padding: '2px 6px',
                }}
              >
                ×
              </button>
            </div>

            <div
              role="radiogroup"
              aria-label="Sticky note color"
              className="flex items-center gap-1.5 mb-2"
            >
              {SWATCHES.map(s => {
                const active = s.id === colorId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={s.label}
                    onClick={() => pickColor(s.id)}
                    className="pointer-events-auto"
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: s.bg,
                      border: active
                        ? `1.5px solid ${swatch.ink}`
                        : '1px solid rgba(0,0,0,0.18)',
                      padding: 0,
                      transform: active ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.15s ease, border-color 0.15s ease',
                      boxShadow: active ? '0 1px 3px rgba(0,0,0,0.18)' : 'none',
                    }}
                  />
                );
              })}
            </div>

            <textarea
              ref={taRef}
              value={value}
              onChange={onChange}
              placeholder="jot something down…"
              spellCheck={false}
              className="sticky-note-textarea pointer-events-auto flex-1 w-full resize-none bg-transparent outline-none border-0"
              style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: '0.95rem',
                lineHeight: 1.5,
                color: swatch.ink,
                cursor: 'text',
                ['--sticky-placeholder' as string]: `${swatch.inkSoft}99`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
