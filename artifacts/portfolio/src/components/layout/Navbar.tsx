import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const threshold = 60;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Resume', path: '/resume' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={[
        'fixed top-0 left-0 right-0 z-50 px-6 md:px-12',
        'transition-[padding,background-color,backdrop-filter,border-color] duration-500 ease-out',
        scrolled
          ? 'py-1.5 bg-background/70 backdrop-blur-md border-b border-border text-foreground'
          : 'py-6 mix-blend-difference text-white',
      ].join(' ')}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          aria-hidden={scrolled}
          tabIndex={scrolled ? -1 : 0}
          className="hidden md:block font-serif font-normal tracking-tight hover:opacity-70 transition-opacity duration-500 ease-out"
          style={{
            fontSize: scrolled
              ? 'clamp(0.95rem, 1.35vw, 1.15rem)'
              : 'clamp(1.05rem, 1.6vw, 1.35rem)',
            opacity: scrolled ? 0 : 1,
            pointerEvents: scrolled ? 'none' : 'auto',
            transitionProperty: 'opacity, font-size',
          }}
          data-testid="link-home"
        >
          Layal Barakat
        </Link>
        <ul
          className="flex items-center space-x-6 md:space-x-8 font-sans tracking-wide transition-[font-size] duration-500 ease-out"
          style={{ fontSize: scrolled ? '0.8125rem' : '0.875rem' }}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`hover:opacity-70 transition-opacity ${location === link.path ? 'opacity-50' : ''}`}
                data-testid={`link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
