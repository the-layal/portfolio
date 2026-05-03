import React, { useState, useCallback } from 'react';

export interface Slide {
  src: string;
  alt?: string;
  caption?: string;
}

export default function ImageSlideshow({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [maxRatio, setMaxRatio] = useState<number | undefined>(undefined);

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth) return;
    const ratio = img.naturalHeight / img.naturalWidth;
    setMaxRatio(prev => prev === undefined ? ratio : Math.max(prev, ratio));
  }, []);

  if (!slides || slides.length === 0) return null;
  const total = slides.length;
  const prev = () => setI((p) => (p - 1 + total) % total);
  const next = () => setI((p) => (p + 1) % total);
  const s = slides[i];

  return (
    <div className="select-none">
      <div
        className="relative w-full"
        style={maxRatio ? { aspectRatio: `1 / ${maxRatio}` } : undefined}
      >
        <img
          key={s.src}
          src={s.src}
          alt={s.alt || ''}
          onLoad={handleLoad}
          className={
            maxRatio
              ? 'absolute inset-0 w-full h-full object-contain block'
              : 'w-full h-auto block'
          }
          loading="lazy"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-background border border-border text-foreground transition"
              data-testid="slideshow-prev"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-background border border-border text-foreground transition"
              data-testid="slideshow-next"
            >
              ›
            </button>
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-background/80 border border-border font-mono text-xs text-muted-foreground">
              {i + 1} / {total}
            </div>
          </>
        )}
      </div>
      {s.caption && (
        <p className="mt-3 text-center text-base text-muted-foreground italic">{s.caption}</p>
      )}
    </div>
  );
}
