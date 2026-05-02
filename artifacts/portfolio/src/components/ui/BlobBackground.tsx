import React from 'react';
import { motion } from 'framer-motion';

interface BlobConfig {
  id: number;
  color: string;
  size: number;
  initialX: string;
  initialY: string;
  xKeyframes: number[];
  yKeyframes: number[];
  scaleKeyframes: number[];
  duration: number;
}

const BLOBS: BlobConfig[] = [
  {
    id: 1,
    color: 'radial-gradient(circle, rgba(251,113,133,0.13) 0%, transparent 70%)',
    size: 640,
    initialX: '10%',
    initialY: '5%',
    xKeyframes: [0, 80, -40, 60, 0],
    yKeyframes: [0, -60, 80, 30, 0],
    scaleKeyframes: [1, 1.1, 0.95, 1.05, 1],
    duration: 34,
  },
  {
    id: 2,
    color: 'radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 70%)',
    size: 560,
    initialX: '60%',
    initialY: '15%',
    xKeyframes: [0, -70, 50, -30, 0],
    yKeyframes: [0, 70, -50, 90, 0],
    scaleKeyframes: [1, 0.92, 1.08, 0.97, 1],
    duration: 40,
  },
  {
    id: 3,
    color: 'radial-gradient(circle, rgba(45,212,191,0.09) 0%, transparent 70%)',
    size: 500,
    initialX: '80%',
    initialY: '55%',
    xKeyframes: [0, -90, 40, -60, 0],
    yKeyframes: [0, -40, -80, 50, 0],
    scaleKeyframes: [1, 1.06, 0.93, 1.1, 1],
    duration: 28,
  },
  {
    id: 4,
    color: 'radial-gradient(circle, rgba(167,139,250,0.11) 0%, transparent 70%)',
    size: 580,
    initialX: '25%',
    initialY: '65%',
    xKeyframes: [0, 60, -50, 80, 0],
    yKeyframes: [0, -70, 60, -40, 0],
    scaleKeyframes: [1, 1.04, 1.12, 0.96, 1],
    duration: 36,
  },
  {
    id: 5,
    color: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)',
    size: 420,
    initialX: '50%',
    initialY: '40%',
    xKeyframes: [0, -50, 70, -30, 0],
    yKeyframes: [0, 60, -40, -70, 0],
    scaleKeyframes: [0.95, 1.08, 0.98, 1.05, 0.95],
    duration: 32,
  },
];

interface BlobBackgroundProps {
  isBlueprint: boolean;
}

export default function BlobBackground({ isBlueprint }: BlobBackgroundProps) {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: isBlueprint ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      {BLOBS.map((blob) => (
        <motion.div
          key={blob.id}
          style={{
            position: 'absolute',
            left: blob.initialX,
            top: blob.initialY,
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: blob.color,
            filter: 'blur(80px)',
            willChange: 'transform',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            x: blob.xKeyframes,
            y: blob.yKeyframes,
            scale: blob.scaleKeyframes,
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}
