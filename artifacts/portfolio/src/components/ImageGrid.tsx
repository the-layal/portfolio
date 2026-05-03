import React, { useState, useCallback } from 'react';

export interface GridImage {
  src: string;
  alt?: string;
}

interface ImageGridProps {
  images: GridImage[];
  rowHeight?: number;
  caption?: string;
}

export default function ImageGrid({ images, rowHeight = 260, caption }: ImageGridProps) {
  if (!images || images.length === 0) return null;

  const [ratios, setRatios] = useState<(number | null)[]>(() => images.map(() => null));

  const handleLoad = useCallback((i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const r = img.naturalWidth / img.naturalHeight;
    setRatios(prev => {
      const next = [...prev];
      next[i] = r;
      return next;
    });
  }, []);

  const allLoaded = ratios.every(r => r !== null);

  return (
    <figure className="my-8">
      <div
        className="flex gap-2 overflow-hidden"
        style={allLoaded ? { height: rowHeight } : undefined}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden"
            style={
              allLoaded && ratios[i] != null
                ? { flex: `${ratios[i]} 1 0`, minWidth: 0 }
                : { flex: '1 1 0', minWidth: 0 }
            }
          >
            <img
              src={img.src}
              alt={img.alt || ''}
              className={allLoaded ? 'w-full h-full object-contain' : 'w-full h-auto'}
              onLoad={e => handleLoad(i, e)}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-base italic text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
