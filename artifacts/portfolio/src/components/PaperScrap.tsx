import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const PHRASES = [
  "& sometimes artist :)",
  "& sometimes writer",
  "& sometimes traveler",
];

const TYPE_MS = 68;
const ERASE_MS = 38;
const PAUSE_AFTER_MS = 1800;
const PAUSE_BEFORE_MS = 400;

const NOTES = [
  { bg: '#BAD4D8', rotate: 7,  x: 14, y: 18 },
  { bg: '#C8D8B0', rotate: -5, x: -8, y: 10 },
  { bg: '#F5E89A', rotate: -2, x: 0,  y: 0  },
];

interface PaperScrapProps {
  animate: boolean;
  text?: string;
  dragConstraintsRef?: React.RefObject<HTMLElement | null>;
}

type Phase = 'idle' | 'typing' | 'pausing' | 'erasing' | 'waiting';

type DragBounds = { top: number; left: number; right: number; bottom: number };

export default function PaperScrap({ animate, dragConstraintsRef }: PaperScrapProps) {
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
      aria-hidden
    >
      {NOTES.map((note, i) => {
        const isTop = i === NOTES.length - 1;
        const isDragging = draggingIdx === i;
        const zBase = i + 1;
        const zIndex = isDragging ? 50 : (topIdx === i ? 40 : zBase);
        return (
          <motion.div
            key={i}
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
            {isTop && (
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
                    color: '#3a2e1e',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                  }}
                >
                  {revealed}
                  <span style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
