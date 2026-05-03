import React from 'react';

export interface GridImage {
  src: string;
  alt?: string;
}

interface ImageGridProps {
  images: GridImage[];
  cols?: 2 | 3;
}

export default function ImageGrid({ images, cols = 2 }: ImageGridProps) {
  if (!images || images.length === 0) return null;
  const colClass = cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
  return (
    <div className={`my-8 grid grid-cols-1 ${colClass} gap-2`}>
      {images.map((img, i) => (
        <div key={i} className="aspect-[4/3] overflow-hidden">
          <img
            src={img.src}
            alt={img.alt || ''}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
