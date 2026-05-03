import React from 'react';

export interface GridImage {
  src: string;
  alt?: string;
  aspectRatio?: number;
}

interface ImageGridProps {
  images: GridImage[];
  cols?: 2 | 3;
  objectFit?: 'cover' | 'contain';
  caption?: string;
}

export default function ImageGrid({ images, objectFit = 'cover', caption }: ImageGridProps) {
  if (!images || images.length === 0) return null;
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const hasTiledRatios = images.some((img) => img.aspectRatio != null);
  return (
    <figure className="my-8">
      <div className="flex flex-col sm:flex-row sm:overflow-hidden">
        {images.map((img, i) => {
          const ratio = img.aspectRatio;
          const style: React.CSSProperties = hasTiledRatios && ratio != null
            ? { flexGrow: ratio, flexShrink: 1, flexBasis: 0 }
            : undefined as unknown as React.CSSProperties;
          return (
            <div key={i} className="overflow-hidden sm:h-52 sm:flex-none" style={style}>
              <img
                src={img.src}
                alt={img.alt || ''}
                className={`w-full sm:h-full sm:w-auto ${fitClass}`}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-base italic text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
