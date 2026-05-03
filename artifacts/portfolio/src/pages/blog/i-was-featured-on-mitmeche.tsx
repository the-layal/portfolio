import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

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

        <a
          href="https://www.instagram.com/p/B8_aQhfjLqJ/"
          target="_blank"
          rel="noreferrer noopener"
          className="not-prose block my-10 border border-border rounded p-6 md:p-8 bg-card hover:border-accent transition-colors no-underline"
          data-testid="link-instagram-embed"
        >
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-3">View on Instagram</p>
          <p className="font-sans text-foreground leading-relaxed mb-4">
            During IAP, sophomore Layal Barakat enjoyed mild winter days biking around Cambridge and
            Boston. She took class 4.02A, How to Design Intensive, in which she constructed three
            projects – one 2D project using paper and two 3D projects using styrofoam.
            📸: Marwa Abdulhai/Layal Barakat
          </p>
          <p className="font-sans text-sm text-muted-foreground">
            A post shared by MIT Mechanical Engineering (@mitmeche) on Feb 25, 2020 at 5:01am PST
          </p>
        </a>
      </div>
    </motion.article>
  );
}
