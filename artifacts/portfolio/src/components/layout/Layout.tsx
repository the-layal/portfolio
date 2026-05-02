import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-accent selection:text-white">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
