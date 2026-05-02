import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const INACTIVITY_MS = 7000;
const SIZE = 48;

interface Props {
  isBlueprint: boolean;
  onActivate: () => void;
}

export default function BlueprintCornerTrigger({ isBlueprint, onActivate }: Props) {
  const [inactive, setInactive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const setHoveredSync = useCallback((val: boolean) => {
    hoveredRef.current = val;
    setHovered(val);
  }, []);

  useEffect(() => {
    if (isBlueprint) {
      setInactive(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const schedule = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setInactive(true), INACTIVITY_MS);
    };

    const onMouseMove = () => {
      if (hoveredRef.current) return;
      setInactive(false);
      schedule();
    };

    const onScroll = () => {
      setInactive(false);
      schedule();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') return;
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === buttonRef.current) return;
      if (hoveredRef.current) return;
      setInactive(false);
      schedule();
    };

    const onTouchStart = () => {
      setInactive(false);
      schedule();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    schedule();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isBlueprint]);

  if (isBlueprint) return null;

  const clipTriangle = `polygon(0 0, ${SIZE}px 0, 0 ${SIZE}px)`;

  return (
    <AnimatePresence>
      {inactive && (
        <motion.button
          ref={buttonRef}
          key="corner-trigger"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: hovered ? 1.08 : 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={onActivate}
          onMouseEnter={() => setHoveredSync(true)}
          onMouseLeave={() => setHoveredSync(false)}
          onFocus={() => setHoveredSync(true)}
          onBlur={() => setHoveredSync(false)}
          aria-label="Activate blueprint mode"
          tabIndex={0}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: SIZE,
            height: SIZE,
            zIndex: 9998,
            padding: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'none',
            outline: 'none',
            transformOrigin: '0% 0%',
            clipPath: clipTriangle,
            WebkitClipPath: clipTriangle,
          }}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ display: 'block' }}
            aria-hidden
          >
            <defs>
              <filter id="bp-corner-shadow" x="-20%" y="-20%" width="150%" height="150%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.4)" />
              </filter>
            </defs>

            <polygon
              points={`0,0 ${SIZE},0 0,${SIZE}`}
              fill={hovered ? 'rgba(100,220,255,0.28)' : 'rgba(100,220,255,0.18)'}
              filter="url(#bp-corner-shadow)"
              style={{ transition: 'fill 0.2s ease' }}
            />

            <line
              x1={SIZE}
              y1={0}
              x2={0}
              y2={SIZE}
              stroke={hovered ? 'rgba(100,220,255,0.7)' : 'rgba(100,220,255,0.45)'}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              style={{ transition: 'stroke 0.2s ease' }}
            />

            <polygon
              points={`0,0 ${SIZE * 0.38},0 0,${SIZE * 0.38}`}
              fill={hovered ? 'rgba(100,220,255,0.6)' : 'rgba(100,220,255,0.4)'}
              style={{ transition: 'fill 0.2s ease' }}
            />

            <text
              x={SIZE * 0.13}
              y={SIZE * 0.23}
              fill={hovered ? 'rgba(100,220,255,1)' : 'rgba(100,220,255,0.75)'}
              fontSize="7"
              fontFamily="monospace"
              fontWeight="700"
              letterSpacing="0.05em"
              transform={`rotate(-45, ${SIZE * 0.13}, ${SIZE * 0.23})`}
              style={{ transition: 'fill 0.2s ease', userSelect: 'none' }}
            >
              B
            </text>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
