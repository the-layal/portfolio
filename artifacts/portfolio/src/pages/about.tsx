import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 space-y-8 sticky top-32"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-card border border-border">
            <img 
              src="https://layal.info/wp-content/uploads/2025/08/20250119_134835.jpg" 
              alt="Layal Barakat Portrait" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="relative aspect-square overflow-hidden bg-card border border-border">
              <img 
                src="https://layal.info/wp-content/uploads/2025/12/20251130_11490111-1.jpg" 
                alt="Layal Barakat Workshop" 
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
             <div className="relative aspect-square bg-accent flex items-center justify-center text-white text-center p-6 border border-accent">
                <div>
                  <h3 className="font-serif text-2xl italic mb-2">Build</h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-white/80">With Purpose</p>
                </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 pt-4"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-12">About Me</h1>
          
          <div className="prose prose-lg prose-neutral prose-p:font-sans prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
            <p className="text-xl text-foreground font-serif leading-relaxed mb-8">
              Hello there, my name is Layal Barakat, and I'm an alumnus of the Massachusetts Institute of Technology (MIT), having studied Mechanical Engineering for my Master's and Bachelor of Science (with a minor in Design).
            </p>
            
            <p>
              I am interested in the intersection between engineering and design, or in other words, where functionality meets aesthetics. I am also very passionate about helping people and leaving the world better than I found it through the creation of new products.
            </p>
            
            <div className="my-12 w-12 h-[1px] bg-border" />
            
            <p>
              I grew up in a family of five, with my parents and two younger sisters in Tampa, FL. My father was a doer: he taught himself most of what he knows, and the rest came from experience. He has been his own boss his entire life, and he inspires me in that way. 
            </p>
            
            <p>
              A place like MIT really felt like home because of the way my parents brought me up: with unbridled curiosity and a space to explore nearly anything I could have dreamed.
            </p>
          </div>

          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-3xl font-serif mb-6 text-foreground">Let's build something together!</h2>
            <a 
              href="mailto:layalb@mit.edu" 
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-sans text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-colors duration-300"
              data-testid="link-contact-cta"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
