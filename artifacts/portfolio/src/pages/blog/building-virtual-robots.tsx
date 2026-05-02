import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import ImageSlideshow from '@/components/ImageSlideshow';

  export default function BuildingVirtualRobots() {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full py-12 md:py-16 max-w-4xl mx-auto"
      >
        <Link href="/blog" className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors mb-10" data-testid="link-back-blog">
          <span>←</span> Back to Blog
        </Link>

        <header className="mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-4">April 7, 2020</p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight">Building (Virtual) Robots</h1>
          <div className="mt-6 h-px w-24 bg-accent" />
        </header>

        <div className="prose prose-lg prose-neutral max-w-none prose-p:font-sans prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-foreground prose-img:rounded prose-img:border prose-img:border-border">
        <p>{`This is just a little update on one of the classes I’m taking this semester, which has wildly changed course due to the rapid proliferation of COVID-19. Since I’ve been home, I’ve been trying to make the most of my coursework, even if some of it is no longer as hands-on as I had hoped.`}</p>
      <p>{`The following was my presentation for my Most Critical Module (MCM) of my 2.007 competition robot (which will hopefully be built in spring 2021!) which I presented over Zoom. I was really nervous at first even though it was an online presentation, but it went pretty well! For some context, my MCM is meant to lift the beaver weight up the game board column.`}</p>
      <ImageSlideshow slides={[
          { src: "/images/blog-post-virtual-robots/ms7-1.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-2.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-3.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-4.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-5.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-6.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-7.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-8.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-9.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-10.gif", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-11.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-12.png", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-13.gif", alt: "" },
          { src: "/images/blog-post-virtual-robots/ms7-14.png", alt: "" }
        ]} />
      <p>{`It was really nice seeing everyone’s ideas and progress on their MCMs. Being in the presence of my labmates, albeit virtually, is something that really made my week: I almost felt like I was back on campus.`}</p>
      <p>{`It’s the small things nowadays that are really important to help keep my motivation going. Today’s presentations gave that to me. I am excited to develop my robot further in the coming weeks and see where this individual study takes me!`}</p>
        </div>
      </motion.article>
    );
  }
  