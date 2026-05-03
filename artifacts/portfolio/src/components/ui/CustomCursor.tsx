import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

interface CustomCursorProps {
  isBlueprint?: boolean;
}

export default function CustomCursor({ isBlueprint = false }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverImage, setIsOverImage] = useState(false);
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
      if (!overIframe) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const computedCursor = window.getComputedStyle(target).cursor;
      const overImage = computedCursor === 'zoom-in';

      const isClickable =
        !overImage && (
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.getAttribute('role') === 'button'
        );

      setIsOverImage(overImage);
      setIsHovering(isClickable);
    };

    let overIframe = false;
    const handleIframeEnter = () => {
      overIframe = true;
      setIsVisible(false);
    };
    const handleIframeLeave = () => {
      overIframe = false;
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
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
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

  const dotSize = isOverImage ? 48 : isHovering ? 40 : 14;
  const dotOpacity = isOverImage ? 0.25 : isHovering ? 0.5 : 1;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000]"
      style={{ x: cursorX, y: cursorY, opacity: isVisible ? 1 : 0 }}
    >
      <AnimatePresence>
        {isOverImage && (
          <motion.div
            key="pulse-ring"
            className="absolute rounded-full"
            style={{
              width: 48,
              height: 48,
              translateX: '-50%',
              translateY: '-50%',
              border: '1.5px solid rgba(217,119,54,0.75)',
              top: 0,
              left: 0,
            }}
            initial={{ scale: 1, opacity: 0.75 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.1 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute rounded-full mix-blend-difference"
        style={{
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: `rgba(217,119,54,${dotOpacity})`,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
