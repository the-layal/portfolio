import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-1">Layal Barakat</h2>
          <p className="text-muted-foreground text-sm font-sans">Built with love at MIT.</p>
        </div>
        
        <div className="flex items-center space-x-6">
          <a 
            href="mailto:layalb@mit.edu" 
            className="text-muted-foreground hover:text-accent transition-colors"
            data-testid="link-social-email"
            aria-label="Email Layal"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="text-muted-foreground hover:text-accent transition-colors"
            data-testid="link-social-linkedin"
            aria-label="Layal's LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="text-muted-foreground hover:text-accent transition-colors"
            data-testid="link-social-instagram"
            aria-label="Layal's Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
