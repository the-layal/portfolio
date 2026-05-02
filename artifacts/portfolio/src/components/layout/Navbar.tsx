import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Resume', path: '#resume', external: true },
    { name: 'Contact', path: 'mailto:layalb@mit.edu', external: true },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 mix-blend-difference text-white"
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-serif font-bold tracking-tight hover:opacity-70 transition-opacity" data-testid="link-home">
          Layal Barakat
        </Link>
        <ul className="flex items-center space-x-6 md:space-x-8 text-sm font-sans tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.external ? (
                <a 
                  href={link.path} 
                  target={link.path.startsWith('mailto') ? '_self' : '_blank'} 
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  data-testid={`link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              ) : (
                <Link href={link.path} className={`hover:opacity-70 transition-opacity ${location === link.path ? 'opacity-50' : ''}`} data-testid={`link-${link.name.toLowerCase()}`}>
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
