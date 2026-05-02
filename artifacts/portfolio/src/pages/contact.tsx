import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`);
    const body = encodeURIComponent(
      `From: ${name} <${email}>\n\n${message}`
    );
    window.location.href = `mailto:layal@mit.edu?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      className="w-full py-12 md:py-20 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">Contact</h1>
      <div className="h-px w-24 bg-accent mb-10" />
      <p className="font-sans text-lg text-muted-foreground mb-16 max-w-2xl">
        Feel free to contact me through any of the icons at the top right, or use the form below!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-6">Get in Touch</h2>
          <ul className="space-y-5 font-sans text-muted-foreground">
            <li className="flex items-start gap-4" data-testid="contact-address">
              <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
              <span>
                320 Memorial Drive
                <br />
                Cambridge, MA 02139
                <br />
                USA
              </span>
            </li>
            <li className="flex items-start gap-4" data-testid="contact-email">
              <Mail className="w-5 h-5 text-accent mt-1 shrink-0" />
              <a href="mailto:layal@mit.edu" className="hover:text-accent transition-colors">
                layal@mit.edu
              </a>
            </li>
            <li className="flex items-start gap-4" data-testid="contact-phone">
              <Phone className="w-5 h-5 text-accent mt-1 shrink-0" />
              <a href="tel:+18136066000" className="hover:text-accent transition-colors">
                (813) 606-6000
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-6">Send Me a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
            <div>
              <label htmlFor="name" className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-sans focus:outline-none focus:border-accent transition-colors"
                data-testid="input-name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-sans focus:outline-none focus:border-accent transition-colors"
                data-testid="input-email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-sans focus:outline-none focus:border-accent transition-colors resize-y"
                data-testid="input-message"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-sans text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-colors"
              data-testid="button-send"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </motion.div>
  );
}
