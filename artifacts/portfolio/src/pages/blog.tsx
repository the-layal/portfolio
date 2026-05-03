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
  {
    slug: 'i-was-featured-on-mitmeche',
    title: 'I was featured on @mitmeche!',
    date: 'March 27, 2020',
    excerpt:
      "This is a bit overdue, but @mitmeche featured me on their Instagram and Facebook page! The Mechanical Engineering department was highlighting things students did over Indepedent Activities Period (IAP) in January, which is when I took 4.02A-How to Design: Studio Intensive (which you can see my work for here!). It was a really fun January overall since I was able to reflect and relax a bit more than I usually do during the semester.",
  },
  {
    slug: 'moving-things-with-adobe-animate',
    title: 'Moving Things With Adobe Animate!',
    date: 'March 25, 2020',
    excerpt:
      "I was editing my portfolio when I came upon the idea of using GIFs on my homepage for some of my projects. I already had a GIF for my 4.02A work, and so I figured to keep the symmetry, I could try my hand at animating my Watering Cans graphic design piece. I had never used Adobe Animate before, and so I sought YouTube to figure out how to turn my static Illustrator File into a moving photo.",
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
