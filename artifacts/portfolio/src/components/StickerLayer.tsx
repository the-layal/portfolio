import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
  onRemove: (uid: string) => void;
  onUpdate: (uid: string, patch: Partial<PlacedSticker>) => void;
  dragConstraintsRef: React.RefObject<HTMLElement | null>;
}

const SIZE = 110;

export default function StickerLayer({
  stickers,
  onRemove,
  onUpdate,
  dragConstraintsRef,
}: StickerLayerProps) {
  const [draggingUid, setDraggingUid] = useState<string | null>(null);
  const [topUid, setTopUid] = useState<string | null>(null);
  const [hoverUid, setHoverUid] = useState<string | null>(null);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 30 }}
      aria-label="Placed stickers"
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
            isHover={hoverUid === sticker.uid}
            dragConstraintsRef={dragConstraintsRef}
            onDragStart={() => {
              setDraggingUid(sticker.uid);
              setTopUid(sticker.uid);
            }}
            onDragEnd={(dx, dy) => {
              setDraggingUid(null);
              onUpdate(sticker.uid, { x: sticker.x + dx, y: sticker.y + dy });
            }}
            onHover={(h) => setHoverUid(h ? sticker.uid : null)}
            onRemove={() => onRemove(sticker.uid)}
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
  isHover: boolean;
  dragConstraintsRef: React.RefObject<HTMLElement | null>;
  onDragStart: () => void;
  onDragEnd: (dx: number, dy: number) => void;
  onHover: (h: boolean) => void;
  onRemove: () => void;
}

function StickerItem({
  sticker, src, label, size, isTop, isHover,
  dragConstraintsRef, onDragStart, onDragEnd, onHover, onRemove,
}: StickerItemProps) {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  return (
    <motion.div
      className="absolute pointer-events-auto select-none"
      style={{
        left: sticker.x,
        top: sticker.y,
        width: size,
        height: size,
        zIndex: isTop ? 60 : 31,
        touchAction: 'none',
      }}
      initial={{ opacity: 0, scale: 0.4, rotate: sticker.rotate }}
      animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
      transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.5 }}
      drag
      dragConstraints={dragConstraintsRef as React.RefObject<HTMLElement>}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={(_, info) => {
        startRef.current = { x: info.point.x, y: info.point.y };
        onDragStart();
      }}
      onDragEnd={(_, info) => {
        const start = startRef.current;
        const dx = start ? info.point.x - start.x : 0;
        const dy = start ? info.point.y - start.y : 0;
        startRef.current = null;
        onDragEnd(dx, dy);
      }}
      whileDrag={{ scale: 1.06 }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      role="button"
      aria-label={`${label} sticker, drag to move`}
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
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onRemove}
        aria-label={`Remove ${label} sticker`}
        className="absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-foreground text-background"
        style={{
          width: 22,
          height: 22,
          fontSize: 14,
          lineHeight: 1,
          opacity: isHover ? 1 : 0,
          transition: 'opacity 0.15s ease',
          boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </motion.div>
  );
}
