import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const INACTIVITY_MS = 7000;
const SIZE = 48;

interface Props {
  isBlueprint: boolean;
  onActivate: () => void;
}

function isTouchOnly() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

const PULSE_RINGS = [0, 1, 2];

export default function BlueprintCornerTrigger({ isBlueprint, onActivate }: Props) {
  const [inactive, setInactive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touchPressed, setTouchPressed] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const touchOnlyRef = useRef(false);

  const setHoveredSync = useCallback((val: boolean) => {
    hoveredRef.current = val;
    setHovered(val);
  }, []);

  useEffect(() => {
    touchOnlyRef.current = isTouchOnly();
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
      if (touchOnlyRef.current) return;
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

    const onTouchStart = (e: TouchEvent) => {
      if (buttonRef.current && buttonRef.current.contains(e.target as Node)) return;
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

  const isActive = hovered || touchPressed;
  const decorationsVisible = !isBlueprint;

  const ringColor = isActive ? 'rgba(100,220,255,0.95)' : 'rgba(100,220,255,0.75)';
  const arcFill = isActive ? 'rgba(100,220,255,0.32)' : 'rgba(100,220,255,0.18)';
  const pulseDuration = isActive ? 1.1 : 1.7;
  const ringDelay = isActive ? 0.37 : 0.57;

  const arcPath = `M ${SIZE} 0 A ${SIZE} ${SIZE} 0 0 0 0 ${SIZE} L 0 0 Z`;

  return (
    <button
      ref={buttonRef}
      onClick={onActivate}
      onMouseEnter={() => setHoveredSync(true)}
      onMouseLeave={() => setHoveredSync(false)}
      onFocus={() => setHoveredSync(true)}
      onBlur={() => setHoveredSync(false)}
      onTouchStart={() => setTouchPressed(true)}
      onTouchEnd={() => setTouchPressed(false)}
      onTouchCancel={() => setTouchPressed(false)}
      aria-label={isBlueprint ? 'Exit blueprint mode' : 'Activate blueprint mode'}
      aria-pressed={isBlueprint}
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
        cursor: 'pointer',
        outline: 'none',
        transformOrigin: '0% 0%',
        overflow: 'hidden',
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          display: 'block',
          opacity: decorationsVisible && inactive ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
        aria-hidden
      >
        <defs>
          <clipPath id="bp-corner-clip">
            <rect x="0" y="0" width={SIZE} height={SIZE} />
          </clipPath>
        </defs>

        <g clipPath="url(#bp-corner-clip)">
          <path
            d={arcPath}
            fill={arcFill}
            style={{ transition: 'fill 0.2s ease' }}
          />

          {PULSE_RINGS.map((i) => (
            <motion.circle
              key={i}
              cx={0}
              cy={0}
              fill="none"
              stroke={ringColor}
              strokeWidth={isActive ? 1.5 : 1}
              initial={{ r: 4, opacity: 0.8 }}
              animate={{ r: SIZE * 1.05, opacity: 0 }}
              transition={{
                duration: pulseDuration,
                delay: i * ringDelay,
                repeat: Infinity,
                ease: 'easeOut',
                repeatDelay: 0,
              }}
              style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }}
            />
          ))}
        </g>
      </svg>
    </button>
  );
}
