import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface CustomCursorProps {
  isBlueprint?: boolean;
}

export default function CustomCursor({ isBlueprint = false }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
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

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window === 'undefined' || window.innerWidth < 768) return null;

  const cyan = 'rgba(100,220,255,1)';
  const cyanHover = 'rgba(100,220,255,0.45)';
  const amber = 'rgba(217,119,54,1)';
  const amberHover = 'rgba(217,119,54,0.5)';

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
        {/* Crosshair horizontal */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: cyan,
          transform: 'translateY(-50%)',
          opacity: isHovering ? 0.6 : 1,
        }} />
        {/* Crosshair vertical */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 1,
          backgroundColor: cyan,
          transform: 'translateX(-50%)',
          opacity: isHovering ? 0.6 : 1,
        }} />
        {/* Center dot */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 3,
          height: 3,
          borderRadius: '50%',
          backgroundColor: cyan,
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
        backgroundColor: isHovering ? amberHover : amber,
      }}
      animate={{ width: isHovering ? 40 : 14, height: isHovering ? 40 : 14 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    />
  );
}
