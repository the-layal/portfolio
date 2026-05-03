import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useLightbox } from '@/contexts/LightboxContext';

export interface GridImage {
  src: string;
  alt?: string;
}

interface ImageGridProps {
  images: GridImage[];
  caption?: string;
}

const GAP = 8; // gap-2

export default function ImageGrid({ images, caption }: ImageGridProps) {
  const { open } = useLightbox();

  if (!images || images.length === 0) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [ratios, setRatios] = useState<(number | null)[]>(() => images.map(() => null));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleLoad = useCallback((i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth) return;
    const r = img.naturalWidth / img.naturalHeight;
    setRatios(prev => {
      const next = [...prev];
      next[i] = r;
      return next;
    });
  }, []);

  const allLoaded = ratios.every(r => r !== null);

  const optimalHeight = useMemo(() => {
    if (!allLoaded || containerWidth === null) return null;
    const totalRatio = (ratios as number[]).reduce((s, r) => s + r, 0);
    const available = containerWidth - GAP * (images.length - 1);
    return Math.round(available / totalRatio);
  }, [allLoaded, ratios, containerWidth, images.length]);

  return (
    <div className="mb-8 not-prose" ref={containerRef}>
      <div
        className="flex overflow-hidden"
        style={{
          gap: GAP,
          height: optimalHeight ?? undefined,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden cursor-zoom-in"
            style={
              allLoaded && ratios[i] != null
                ? { flex: `${ratios[i]} 1 0`, minWidth: 0 }
                : { flex: '1 1 0', minWidth: 0 }
            }
            onClick={() => open(img.src, img.alt)}
          >
            <img
              src={img.src}
              alt={img.alt || ''}
              className={allLoaded && optimalHeight ? 'w-full h-full object-cover pointer-events-none' : 'w-full h-auto pointer-events-none'}
              onLoad={e => handleLoad(i, e)}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {caption && (
        <p className="mt-2 text-center text-base italic text-muted-foreground">{caption}</p>
      )}
    </div>
  );
}
