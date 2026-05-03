import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import resume, { ResumeEntry } from '@/data/resume';
import { PdfEmbed } from '@/components/ProjectPage';
import EmojiCursor from '@/components/EmojiCursor';

function useBlockVariants(): Variants {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
}

function Block({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const variants = useBlockVariants();
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
      className={`bg-card border border-border rounded-sm shadow-sm p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-6">
      {children}
    </h2>
  );
}

function EntryCard({ entry }: { entry: ResumeEntry }) {
  return (
    <Block>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
        <div>
          <h3 className="font-serif text-xl text-foreground leading-snug">{entry.title}</h3>
          <p className="font-sans text-base text-muted-foreground">{entry.organization} · {entry.location}</p>
        </div>
        <span className="font-sans text-sm text-muted-foreground whitespace-nowrap pt-0.5 shrink-0">{entry.period}</span>
      </div>
      <ul className="space-y-2">
        {entry.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 font-sans text-base text-muted-foreground leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </Block>
  );
}

export default function Resume() {
  const variants = useBlockVariants();
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);

  return (
    <>
    <EmojiCursor emoji={activeEmoji} />
    <div className="w-full py-12 md:py-20 max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16"
      >
        <div>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground">Resume</h1>
          <p className="font-sans text-sm text-muted-foreground mt-2">Layal Barakat · MIT Mechanical Engineering</p>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-foreground text-foreground font-sans text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-300 self-start sm:self-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          View PDF
        </a>
      </motion.div>

      <div className="space-y-16">
        <section>
          <SectionHeading>Professional Experience</SectionHeading>
          <div className="space-y-6">
            {resume.professional.map((entry, i) => (
              <EntryCard key={i} entry={entry} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>Leadership Experience</SectionHeading>
          <div className="space-y-6">
            {resume.leadership.map((entry, i) => (
              <EntryCard key={i} entry={entry} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>Education</SectionHeading>
          <Block>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-4">
              <h3 className="font-serif text-xl text-foreground">{resume.education.institution}</h3>
              <span className="font-sans text-sm text-muted-foreground shrink-0 pt-0.5">{resume.education.location}</span>
            </div>
            <div className="space-y-2 mb-4">
              {resume.education.degrees.map((deg, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                  <p className="font-sans text-base text-muted-foreground">
                    <span className="text-foreground">{deg.level}</span> · {deg.detail}
                  </p>
                  <span className="font-sans text-sm text-muted-foreground shrink-0">Graduated {deg.graduated}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              <p className="font-sans text-base text-muted-foreground">
                <span className="text-foreground font-medium">Relevant Coursework:</span> {resume.education.coursework}
              </p>
              <p className="font-sans text-base text-muted-foreground">
                <span className="text-foreground font-medium">Honors:</span> {resume.education.honors}
              </p>
            </div>
          </Block>
        </section>

        <section>
          <SectionHeading>Languages</SectionHeading>
          <Block>
            <p className="font-serif text-xl text-foreground">{resume.languages}</p>
          </Block>
        </section>

        <section>
          <SectionHeading>Interests</SectionHeading>
          <Block>
            <div className="flex flex-wrap gap-2">
              {resume.interests.map(({ label, emoji }) => (
                <span
                  key={label}
                  onMouseEnter={() => setActiveEmoji(emoji)}
                  onMouseLeave={() => setActiveEmoji(null)}
                  className="font-sans text-sm uppercase tracking-wider px-3 py-1.5 border border-border text-muted-foreground cursor-none"
                >
                  {label}
                </span>
              ))}
            </div>
          </Block>
        </section>

        <section>
          <SectionHeading>Full Resume (PDF)</SectionHeading>
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
          >
            <PdfEmbed src="/resume.pdf" label="Layal Barakat resume (PDF)" height={900} />
          </motion.div>
        </section>
      </div>
    </div>
    </>
  );
}
