import React from 'react';

export interface GridImage {
  src: string;
  alt?: string;
}

interface ImageGridProps {
  images: GridImage[];
  cols?: 2 | 3;
  objectFit?: 'cover' | 'contain';
  caption?: string;
}

export default function ImageGrid({ images, cols = 2, objectFit = 'cover', caption }: ImageGridProps) {
  if (!images || images.length === 0) return null;
  const colClass = cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
  const fitClass = objectFit === 'contain' ? 'object-contain bg-[hsl(38,20%,92%)]' : 'object-cover';
  return (
    <figure className="my-8">
      <div className={`grid grid-cols-1 ${colClass} gap-2`}>
        {images.map((img, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden">
            <img
              src={img.src}
              alt={img.alt || ''}
              className={`w-full h-full ${fitClass}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
