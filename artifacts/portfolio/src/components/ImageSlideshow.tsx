import React, { useState } from 'react';

export interface Slide {
  src: string;
  alt?: string;
  caption?: string;
}

export default function ImageSlideshow({ slides, aspect = 'aspect-[4/3]' }: { slides: Slide[]; aspect?: string }) {
  const [i, setI] = useState(0);
  if (!slides || slides.length === 0) return null;
  const total = slides.length;
  const prev = () => setI((p) => (p - 1 + total) % total);
  const next = () => setI((p) => (p + 1) % total);
  const s = slides[i];

  return (
    <div className="my-8 select-none">
      <div className={`relative ${aspect} bg-card border border-border overflow-hidden`}>
        <img
          src={s.src}
          alt={s.alt || ''}
          className="w-full h-full object-contain bg-black/5"
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
        <p className="mt-3 text-center font-sans text-sm text-muted-foreground italic">{s.caption}</p>
      )}
    </div>
  );
}
