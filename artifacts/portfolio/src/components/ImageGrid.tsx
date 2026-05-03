import React from 'react';

export interface GridImage {
  src: string;
  alt?: string;
}

interface ImageGridProps {
  images: GridImage[];
  cols?: 2 | 3;
  caption?: string;
}

export default function ImageGrid({ images, cols = 2, caption }: ImageGridProps) {
  if (!images || images.length === 0) return null;
  const gridClass = cols === 3 ? 'grid-cols-3' : 'grid-cols-2';
  return (
    <figure className="my-8">
      <div className={`grid ${gridClass} gap-2`}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt || ''}
            className="w-full h-auto"
            loading="lazy"
          />
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
