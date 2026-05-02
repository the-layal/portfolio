import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const POSTS: Post[] = [
  {
    slug: 'building-virtual-robots',
    title: 'Building (Virtual) Robots',
    date: 'April 7, 2020',
    excerpt:
      "This is just a little update on one of the classes I'm taking this semester, which has wildly changed course due to the rapid proliferation of COVID-19. Since I've been home, I've been trying to make the most of my coursework, even if some of it is no longer as hands-on as I had hoped.",
  },
];

export default function Blog() {
  return (
    <motion.div
      className="w-full py-12 md:py-20 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">Blog</h1>
      <div className="h-px w-24 bg-accent mb-12" />

      <ul className="space-y-12">
        {POSTS.map((p) => (
          <li key={p.slug} data-testid={`blog-post-${p.slug}`}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block border-b border-border pb-10 hover:border-accent transition-colors"
            >
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-3">{p.date}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground group-hover:text-accent transition-colors mb-4">
                {p.title}
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed">{p.excerpt}</p>
              <span className="inline-block mt-5 font-sans text-xs uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
                Read post →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
