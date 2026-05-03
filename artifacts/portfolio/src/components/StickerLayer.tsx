import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { STICKER_BY_ID } from './stickers';

export type PlacedSticker = {
  uid: string;
  id: string;
  x: number;
  y: number;
  rotate: number;
};

interface StickerLayerProps {
  stickers: PlacedSticker[];
  onUpdate: (uid: string, patch: Partial<PlacedSticker>) => void;
  dragConstraintsRef: React.RefObject<HTMLElement | null>;
}

const SIZE = 110;

export default function StickerLayer({
  stickers,
  onUpdate,
  dragConstraintsRef,
}: StickerLayerProps) {
  const [draggingUid, setDraggingUid] = useState<string | null>(null);
  const [topUid, setTopUid] = useState<string | null>(null);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 70 }}
    >
      {stickers.map((sticker) => {
        const def = STICKER_BY_ID[sticker.id];
        if (!def) return null;
        const isTop = topUid === sticker.uid || draggingUid === sticker.uid;
        return (
          <StickerItem
            key={sticker.uid}
            sticker={sticker}
            src={def.src}
            label={def.label}
            size={SIZE}
            isTop={isTop}
            dragConstraintsRef={dragConstraintsRef}
            onDragStart={() => {
              setDraggingUid(sticker.uid);
              setTopUid(sticker.uid);
            }}
            onCommit={(nx, ny) => {
              setDraggingUid(null);
              onUpdate(sticker.uid, { x: nx, y: ny });
            }}
          />
        );
      })}
    </div>
  );
}

interface StickerItemProps {
  sticker: PlacedSticker;
  src: string;
  label: string;
  size: number;
  isTop: boolean;
  dragConstraintsRef: React.RefObject<HTMLElement | null>;
  onDragStart: () => void;
  onCommit: (x: number, y: number) => void;
}

function StickerItem({
  sticker, src, label, size, isTop,
  dragConstraintsRef, onDragStart, onCommit,
}: StickerItemProps) {
  const x = useMotionValue(sticker.x);
  const y = useMotionValue(sticker.y);

  useEffect(() => { x.set(sticker.x); }, [sticker.x, x]);
  useEffect(() => { y.set(sticker.y); }, [sticker.y, y]);

  return (
    <motion.div
      className="absolute pointer-events-auto select-none top-0 left-0"
      style={{
        x,
        y,
        width: size,
        height: size,
        rotate: sticker.rotate,
        zIndex: 100,
        touchAction: 'none',
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.5 }}
      drag
      dragConstraints={dragConstraintsRef as React.RefObject<HTMLElement>}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={() => onCommit(x.get(), y.get())}
      whileDrag={{ scale: 1.06 }}
      aria-label={`${label} sticker, drag to reposition`}
      tabIndex={0}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="w-full h-full pointer-events-none"
        style={{
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.18)) drop-shadow(0 1px 2px rgba(0,0,0,0.12))',
          userSelect: 'none',
        }}
      />
    </motion.div>
  );
}
