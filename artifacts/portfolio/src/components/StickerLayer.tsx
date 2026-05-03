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
            onCommit={(nx, ny) => {
              setDraggingUid(null);
              onUpdate(sticker.uid, { x: nx, y: ny });
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
  onCommit: (x: number, y: number) => void;
  onHover: (h: boolean) => void;
  onRemove: () => void;
}

function StickerItem({
  sticker, src, label, size, isTop, isHover,
  dragConstraintsRef, onDragStart, onCommit, onHover, onRemove,
}: StickerItemProps) {
  // Controlled position: a single source of truth lives in `sticker.x/y`
  // (state in <Home>). Framer's drag mutates these motion values directly
  // via `style={{ x, y }}`; on drag end we read the final values and push
  // them back into state. When state changes (e.g. hydration or undo),
  // the effect below syncs the motion values back so the rendered
  // transform always matches the persisted coordinates.
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
        zIndex: isTop ? 60 : 31,
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
