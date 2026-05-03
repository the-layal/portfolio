import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    const SRC = 'https://www.instagram.com/embed.js';
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);

    const process = () => window.instgrm?.Embeds.process();

    if (existing) {
      process();
      return;
    }

    const script = document.createElement('script');
    script.src = SRC;
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, [url]);

  return (
    <div className="not-prose my-10 flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: 1,
          maxWidth: 540,
          minWidth: 326,
          padding: 0,
          width: '100%',
        }}
      >
        <a href={url} target="_blank" rel="noreferrer noopener">View this post on Instagram</a>
      </blockquote>
    </div>
  );
}

export default function IWasFeaturedOnMitmeche() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full py-12 md:py-16 max-w-4xl mx-auto"
    >
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors mb-10"
        data-testid="link-back-blog"
      >
        <span>←</span> Back to Blog
      </Link>

      <header className="mb-12">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-4">March 27, 2020</p>
        <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight">I was featured on @mitmeche!</h1>
        <div className="mt-6 h-px w-24 bg-accent" />
      </header>

      <div className="prose prose-lg prose-neutral max-w-none prose-p:font-sans prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <p>
          This is a bit overdue, but @mitmeche featured me on their Instagram and Facebook page!
          The Mechanical Engineering department was highlighting things students did over Indepedent
          Activities Period (IAP) in January, which is when I took 4.02A-How to Design: Studio
          Intensive (which you can see my work for{' '}
          <a href="http://layal.info/4.02A/" target="_blank" rel="noreferrer noopener">here</a>!).
          It was a really fun January overall since I was able to reflect and relax a bit more than
          I usually do during the semester.
        </p>

        <InstagramEmbed url="https://www.instagram.com/p/B8_aQhfjLqJ/" />
      </div>
    </motion.article>
  );
}
