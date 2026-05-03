import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface CustomCursorProps {
  isBlueprint?: boolean;
}

export default function CustomCursor({ isBlueprint = false }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isWide, setIsWide] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  );

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mql = window.matchMedia('(min-width: 768px)');
    const update = () => setIsWide(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isWide) return undefined;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button';
      setIsHovering(isClickable);
    };

    const handleIframeEnter = () => setIsVisible(false);
    const handleIframeLeave = () => {
      // Re-show on next mousemove on the parent window. Set true now so
      // the cursor reappears immediately as the pointer crosses back out.
      setIsVisible(true);
    };

    const trackedIframes = new WeakSet<HTMLIFrameElement>();
    const attachToIframe = (iframe: HTMLIFrameElement) => {
      if (trackedIframes.has(iframe)) return;
      trackedIframes.add(iframe);
      iframe.addEventListener('mouseenter', handleIframeEnter);
      iframe.addEventListener('mouseleave', handleIframeLeave);
    };
    document.querySelectorAll('iframe').forEach(attachToIframe);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLIFrameElement) attachToIframe(node);
          else if (node instanceof HTMLElement) {
            node.querySelectorAll('iframe').forEach(attachToIframe);
          }
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // When an iframe takes focus (e.g. click inside it), the parent
    // window blurs and stops receiving mousemove. Hide the cursor so it
    // doesn't sit frozen at the entry point.
    const handleBlur = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('blur', handleBlur);
      observer.disconnect();
      document.querySelectorAll('iframe').forEach((iframe) => {
        iframe.removeEventListener('mouseenter', handleIframeEnter);
        iframe.removeEventListener('mouseleave', handleIframeLeave);
      });
    };
  }, [cursorX, cursorY, isWide]);

  if (!isWide) return null;

  if (isBlueprint) {
    const size = isHovering ? 28 : 20;
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          width: size,
          height: size,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: 'rgba(100,220,255,1)',
          transform: 'translateY(-50%)',
          opacity: isHovering ? 0.6 : 1,
        }} />
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 1,
          backgroundColor: 'rgba(100,220,255,1)',
          transform: 'translateX(-50%)',
          opacity: isHovering ? 0.6 : 1,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 3,
          height: 3,
          borderRadius: '50%',
          backgroundColor: 'rgba(100,220,255,1)',
          transform: 'translate(-50%,-50%)',
        }} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHovering ? 'rgba(217,119,54,0.5)' : 'rgba(217,119,54,1)',
      }}
      animate={{ width: isHovering ? 40 : 14, height: isHovering ? 40 : 14 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    />
  );
}
