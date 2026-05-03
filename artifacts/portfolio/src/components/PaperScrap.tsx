import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { STICKERS, type StickerId } from './stickers';

const PHRASES = [
  "& sometimes artist :)",
  "& sometimes writer",
  "& sometimes traveler",
];

const TYPE_MS = 68;
const ERASE_MS = 38;
const PAUSE_AFTER_MS = 1800;
const PAUSE_BEFORE_MS = 400;

const NOTES: Array<{
  bg: string;
  rotate: number;
  x: number;
  y: number;
  text?: string;
  ink?: string;
}> = [
  { bg: '#BAD4D8', rotate: 7,  x: 14, y: 18, text: 'hello :)',              ink: '#1f3b3f' },
  { bg: '#C8D8B0', rotate: -5, x: -8, y: 10, text: 'welcome to my portfolio', ink: '#3a4a1f' },
  { bg: '#F5E89A', rotate: -2, x: 0,  y: 0  },
];

interface PaperScrapProps {
  animate: boolean;
  text?: string;
  dragConstraintsRef?: React.RefObject<HTMLElement | null>;
  onAddSticker?: (id: StickerId) => void;
}

const BLUE_NOTE_IDX = 0;

type Phase = 'idle' | 'typing' | 'pausing' | 'erasing' | 'waiting';

type DragBounds = { top: number; left: number; right: number; bottom: number };

export default function PaperScrap({ animate, dragConstraintsRef, onAddSticker }: PaperScrapProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [addBtnHover, setAddBtnHover] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPickerOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [pickerOpen]);

  const [revealed, setRevealed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>('idle');
  const [topIdx, setTopIdx] = useState<number>(NOTES.length - 1);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const scrapRef = useRef<HTMLDivElement | null>(null);
  const [dragBounds, setDragBounds] = useState<DragBounds | null>(null);

  useEffect(() => {
    const container = dragConstraintsRef?.current;
    const scrap = scrapRef.current;
    if (!container || !scrap) return;

    const measure = () => {
      const c = container.getBoundingClientRect();
      const s = scrap.getBoundingClientRect();
      if (c.width <= 0 || c.height <= 0 || s.width <= 0 || s.height <= 0) {
        setDragBounds(null);
        return;
      }
      setDragBounds({
        top: c.top - s.top,
        left: c.left - s.left,
        right: c.right - s.right,
        bottom: c.bottom - s.bottom,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(scrap);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [dragConstraintsRef, animate]);
  const phraseIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (blinkRef.current) clearInterval(blinkRef.current);
  };

  const startBlink = () => {
    setCursorVisible(true);
    blinkRef.current = setInterval(() => setCursorVisible(v => !v), 500);
  };

  const stopBlink = () => {
    if (blinkRef.current) { clearInterval(blinkRef.current); blinkRef.current = null; }
    setCursorVisible(true);
  };

  useEffect(() => {
    if (!animate) return;
    phraseIndexRef.current = 0;
    setRevealed('');
    setPhase('typing');
  }, [animate]);

  useEffect(() => {
    if (phase === 'idle') return;

    const phrase = PHRASES[phraseIndexRef.current % PHRASES.length];

    if (phase === 'typing') {
      stopBlink();
      let i = revealed.length;
      const tick = () => {
        i += 1;
        setRevealed(phrase.slice(0, i));
        if (i < phrase.length) {
          timerRef.current = setTimeout(tick, TYPE_MS);
        } else {
          setPhase('pausing');
        }
      };
      timerRef.current = setTimeout(tick, TYPE_MS);

    } else if (phase === 'pausing') {
      startBlink();
      timerRef.current = setTimeout(() => {
        stopBlink();
        setPhase('erasing');
      }, PAUSE_AFTER_MS);

    } else if (phase === 'erasing') {
      let i = revealed.length;
      const tick = () => {
        i -= 1;
        setRevealed(phrase.slice(0, i));
        if (i > 0) {
          timerRef.current = setTimeout(tick, ERASE_MS);
        } else {
          phraseIndexRef.current += 1;
          setPhase('waiting');
        }
      };
      timerRef.current = setTimeout(tick, ERASE_MS);

    } else if (phase === 'waiting') {
      timerRef.current = setTimeout(() => setPhase('typing'), PAUSE_BEFORE_MS);
    }

    return clear;
  }, [phase]);

  useEffect(() => () => clear(), []);

  const size = 'clamp(150px, 17vw, 220px)';
  const dragEnabled = animate && dragBounds !== null;

  return (
    <motion.div
      ref={scrapRef}
      className="relative select-none flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      style={{ width: size, height: size }}
    >
      {NOTES.map((note, i) => {
        const isYellow = i === NOTES.length - 1;
        const isBlue = i === BLUE_NOTE_IDX;
        const isDragging = draggingIdx === i;
        const zBase = i + 1;
        const zIndex = isDragging ? 50 : (topIdx === i ? 40 : zBase);
        return (
          <motion.div
            key={i}
            onHoverStart={isBlue ? () => setAddBtnHover(true) : undefined}
            onHoverEnd={isBlue ? () => setAddBtnHover(false) : undefined}
            initial={{
              rotate: note.rotate - 4,
              opacity: 0,
              scale: 0.92,
              x: note.x,
              y: note.y,
            }}
            animate={animate
              ? { rotate: note.rotate, opacity: 1, scale: 1, x: note.x, y: note.y }
              : { rotate: note.rotate - 4, opacity: 0, scale: 0.92, x: note.x, y: note.y }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.08 }}
            drag={dragEnabled}
            dragConstraints={dragBounds ?? { top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => {
              setDraggingIdx(i);
              setTopIdx(i);
            }}
            onDragEnd={() => setDraggingIdx(null)}
            whileDrag={{
              scale: 1.05,
              boxShadow: '6px 14px 36px rgba(0,0,0,0.28)',
            }}
            whileHover={dragEnabled ? { scale: 1.02 } : undefined}
            role={dragEnabled ? 'button' : undefined}
            aria-label={dragEnabled ? 'Draggable paper scrap note' : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: note.bg,
              boxShadow: '2px 4px 16px rgba(0,0,0,0.13)',
              cursor: dragEnabled ? 'none' : 'default',
              touchAction: 'none',
              zIndex,
            }}
          >
            {isBlue && onAddSticker && (
              <>
                <button
                  type="button"
                  aria-label="Add a sticker"
                  aria-expanded={pickerOpen}
                  aria-haspopup="menu"
                  onPointerDown={(e) => e.stopPropagation()}
                  onFocus={() => setAddBtnHover(true)}
                  onBlur={() => setAddBtnHover(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPickerOpen((o) => !o);
                  }}
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.85)',
                    color: '#1f3b3f',
                    border: '1px solid rgba(31,59,63,0.35)',
                    fontSize: 14,
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: (addBtnHover || pickerOpen) ? 1 : 0,
                    transition: 'opacity 0.18s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
                    padding: 0,
                    zIndex: 5,
                  }}
                >
                  +
                </button>
                <AnimatePresence>
                  {pickerOpen && (
                    <motion.div
                      ref={pickerRef}
                      role="menu"
                      aria-label="Pick a sticker"
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: -6 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: -6 }}
                      transition={{ duration: prefersReducedMotion ? 0.12 : 0.18, ease: 'easeOut' }}
                      onPointerDown={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        top: 32,
                        right: -4,
                        background: '#fff',
                        border: '1px solid rgba(0,0,0,0.12)',
                        boxShadow: '0 8px 22px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)',
                        padding: 8,
                        display: 'flex',
                        gap: 6,
                        zIndex: 60,
                        borderRadius: 6,
                      }}
                    >
                      {STICKERS.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          role="menuitem"
                          aria-label={`Add ${s.label} sticker`}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddSticker(s.id);
                            setPickerOpen(false);
                          }}
                          style={{
                            width: 44,
                            height: 44,
                            padding: 4,
                            border: '1px solid transparent',
                            background: 'transparent',
                            cursor: 'pointer',
                            borderRadius: 4,
                          }}
                        >
                          <img
                            src={s.src}
                            alt=""
                            draggable={false}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                          />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            {(isYellow || note.text) && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '18%',
                  pointerEvents: 'none',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Special Elite', monospace",
                    fontSize: 'clamp(0.8rem, 1.6vw, 1.1rem)',
                    lineHeight: 1.5,
                    color: isYellow ? '#3a2e1e' : (note.ink ?? '#3a2e1e'),
                    textAlign: 'center',
                    wordBreak: 'break-word',
                  }}
                >
                  {isYellow ? (
                    <>
                      {revealed}
                      <span style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
                    </>
                  ) : (
                    note.text
                  )}
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
