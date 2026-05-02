import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INACTIVITY_MS = 7000;
const PROJECTS_THRESHOLD = 3;
const SESSION_KEY = 'blueprint-hint-shown';

function getFallbackPos() {
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

function wasAlreadyShown() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
  }
}

function isTouchOnly() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

const MOUSEMOVE_DISMISS_GRACE_MS = 400;

export default function BlueprintHint({ isBlueprint }: { isBlueprint: boolean }) {
  const [visible, setVisible] = useState(false);
  const [anchorPos, setAnchorPos] = useState(getFallbackPos);

  const shownRef = useRef(false);
  const shownAtRef = useRef(0);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredProjects = useRef<Set<string>>(new Set());
  const cursorPosRef = useRef(getFallbackPos());
  const isBlueprintRef = useRef(isBlueprint);

  function dismissHint() {
    setVisible(false);
  }

  function showHint() {
    if (shownRef.current || isBlueprintRef.current) return;
    shownRef.current = true;
    shownAtRef.current = Date.now();
    markShown();
    setAnchorPos({ ...cursorPosRef.current });
    setVisible(true);
  }

  function scheduleInactivity() {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (shownRef.current || isBlueprintRef.current) return;
    inactivityTimer.current = setTimeout(showHint, INACTIVITY_MS);
  }

  useEffect(() => {
    isBlueprintRef.current = isBlueprint;
    if (isBlueprint) {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (visible) dismissHint();
    }
  }, [isBlueprint, visible]);

  useEffect(() => {
    if (isTouchOnly()) return;
    shownRef.current = wasAlreadyShown();

    const onMouseMove = (e: MouseEvent) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };
      if (shownRef.current) return;

      const card = (e.target as HTMLElement).closest('[data-testid^="project-card-"]') as HTMLElement | null;
      if (card?.dataset.testid) {
        hoveredProjects.current.add(card.dataset.testid);
        if (hoveredProjects.current.size >= PROJECTS_THRESHOLD) {
          showHint();
          return;
        }
      }
    };

    const onActivity = () => scheduleInactivity();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onActivity);
    window.addEventListener('keydown', onActivity);
    window.addEventListener('scroll', onActivity, { passive: true });
    window.addEventListener('touchstart', onActivity, { passive: true });

    scheduleInactivity();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('scroll', onActivity);
      window.removeEventListener('touchstart', onActivity);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const dismissOnMove = () => {
      if (Date.now() - shownAtRef.current < MOUSEMOVE_DISMISS_GRACE_MS) return;
      dismissHint();
    };
    const dismiss = () => dismissHint();

    window.addEventListener('mousemove', dismissOnMove);
    window.addEventListener('click', dismiss);
    window.addEventListener('keydown', dismiss);
    window.addEventListener('scroll', dismiss, { passive: true });
    window.addEventListener('touchstart', dismiss, { passive: true });

    return () => {
      window.removeEventListener('mousemove', dismissOnMove);
      window.removeEventListener('click', dismiss);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('scroll', dismiss);
      window.removeEventListener('touchstart', dismiss);
    };
  }, [visible]);

  const HINT_W = 200;
  const HINT_H = 40;
  const offsetX = 28;
  const offsetY = -56;
  const clampedLeft = Math.min(Math.max(anchorPos.x + offsetX, 8), window.innerWidth - HINT_W - 8);
  const clampedTop = Math.min(Math.max(anchorPos.y + offsetY, 8), window.innerHeight - HINT_H - 8);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="blueprint-hint"
          role="tooltip"
          aria-label="Press B to activate blueprint mode"
          initial={{ opacity: 0, scale: 0.92, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 4 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: clampedLeft,
            top: clampedTop,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              background: 'rgba(10, 18, 28, 0.82)',
              border: '1px solid rgba(100, 220, 255, 0.22)',
              borderRadius: '3px',
              padding: '5px 10px',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
            }}
          >
            <kbd
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                background: 'rgba(100,220,255,0.08)',
                border: '1px solid rgba(100,220,255,0.3)',
                borderRadius: '2px',
                fontFamily: 'monospace',
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(100,220,255,0.9)',
                lineHeight: 1,
              }}
            >
              B
            </kbd>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(180,220,255,0.65)',
                whiteSpace: 'nowrap',
              }}
            >
              blueprint mode
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
