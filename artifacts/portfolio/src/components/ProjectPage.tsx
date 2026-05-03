import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function ProjectPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full py-12 md:py-16 max-w-2xl mx-auto"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors mb-10"
        data-testid="link-back-home"
      >
        <span>←</span> Back to Projects
      </Link>

      <header className="mb-12">
        {subtitle && (
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight">{title}</h1>
        <div className="mt-6 h-px w-24 bg-accent" />
      </header>

      <div className="prose prose-lg prose-neutral max-w-none prose-p:font-sans prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-foreground prose-h2:mt-12 prose-h3:mt-10 prose-h4:mt-8 prose-h4:text-xl prose-h5:mt-6 prose-h6:mt-6 prose-h6:uppercase prose-h6:tracking-widest prose-h6:text-xs prose-h6:text-muted-foreground prose-img:rounded prose-img:border prose-img:border-border prose-a:text-accent">
        {children}
      </div>
    </motion.article>
  );
}

export function PdfEmbed({ src, label, height = 720 }: { src: string; label: string; height?: number }) {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  React.useEffect(() => {
    let cancelled = false;
    fetch(src, { method: 'HEAD' })
      .then((r) => { if (!cancelled && !r.ok) setErrored(true); })
      .catch(() => { if (!cancelled) setErrored(true); });
    return () => { cancelled = true; };
  }, [src]);
  return (
    <div className="my-8 border border-border bg-card relative" style={{ minHeight: height }}>
      {!loaded && !errored && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="font-sans text-sm text-muted-foreground">PDF loading…</p>
        </div>
      )}
      {errored ? (
        <div className="p-12 text-center">
          <p className="font-sans text-sm text-muted-foreground mb-4">
            PDF loading… The file may not be uploaded yet.
          </p>
          <a
            href={src}
            className="inline-block font-sans text-sm text-accent underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        </div>
      ) : (
        <iframe
          src={src}
          title={label}
          width="100%"
          height={height}
          onLoad={() => setLoaded(true)}
          className="block"
        />
      )}
    </div>
  );
}

export function VideoEmbed({ src, title }: { src: string; title?: string }) {
  return (
    <div className="my-8 relative aspect-video w-full bg-black border border-border overflow-hidden">
      <iframe
        src={src}
        title={title || 'Embedded video'}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
