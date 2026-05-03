import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectsGrid from '@/components/ProjectsGrid';
import IntroScreen from '@/components/IntroScreen';
import PaperScrap from '@/components/PaperScrap';
import StickerLayer, { type PlacedSticker } from '@/components/StickerLayer';
import TickerStrip from '@/components/TickerStrip';
import { setIntroVisible } from '@/hooks/use-intro-state';
import type { StickerId } from '@/components/stickers';

const PROJECTS = [
  { id: 1,  title: "Impact of Introducing Technical Elements in Makerspace Trainings", subtitle: "MIT Master's Thesis, 2025",              url: "/projects/thesis",            image: "/images/thesis/dfp.png",                                                     tags: ["Research"] },
  { id: 2,  title: "Infant Abdomen Benchtop Model",                                   subtitle: "2.750 Medical Device Design, 2022",      url: "/projects/2-750",             image: "/images/2-750/vessels-with-blood-4063750325-e1689157690888.jpeg",            tags: ["Engineering"] },
  { id: 3,  title: "ReVise: A Conformable Vise",                                       subtitle: "2.009 Product Design Process, 2021",     url: "/projects/revise",            image: "/images/revise/mainimage.png",                                               tags: ["Design", "Engineering"] },
  { id: 4,  title: "Zoom Yoyo Manufacturing",                                          subtitle: "2.008 Design and Manufacturing II, 2021", url: "/projects/zoom-yoyo",         image: "/images/zoom-yoyo/img_1754.jpg",                                             tags: ["Engineering"] },
  { id: 5,  title: "Macaron Properties Research Project",                              subtitle: "2.671 Measurement and Instrumentation, 2021", url: "/projects/macarons",     image: "/images/macarons/tues_e3_barakat_layal-1.png",                               tags: ["Research"] },
  { id: 6,  title: "4.031 – Design Objects + Interaction",                             subtitle: "MIT, 2020",                              url: "/projects/4-031",             image: "/images/4-031/dsc_0752.jpg",                                                  tags: ["Design"] },
  { id: 7,  title: "Soft Robotics Curriculum Research",                                subtitle: "MIT Media Lab, 2020",                    url: "/projects/soft-robotics",     image: "/images/soft-robotics/img_0205.png",                                         tags: ["Research", "Engineering"] },
  { id: 8,  title: "Social Robot Research Study",                                      subtitle: "MIT Media Lab, 2019",                    url: "/projects/social-robot",      image: "/images/social-robot/20190708_115141-e1577849387891.jpg",                    tags: ["Research"] },
  { id: 9,  title: "Sewing Cart Cushions",                                             subtitle: "2.00b Toy Design, 2019",                 url: "/projects/toy-cushions",      image: "/images/toy-cushions/layal_scan_page-1.jpg",                                 tags: ["Design"] },
  { id: 10, title: "Art Exhibition",                                                   subtitle: "IB Art, 2018",                           url: "/projects/exhibition",        image: "/images/exhibition/process-portfolio-page-001-e1577422719379.jpg",           tags: ["Art"] },
  { id: 11, title: "How to Design Intensive",                                          subtitle: "MIT, 2020",                              url: "/projects/design-intensive",  image: "/images/design-intensive/barakat_layal_how-to-design_assignment-01-1.png",   tags: ["Design"] },
  { id: 12, title: "Video Projects",                                                   subtitle: "Assorted Creations, 2016–2019",          url: "/projects/videos",            image: "/images/videos/video-edit-icon.jpg",                                          tags: ["Art"] },
  { id: 13, title: "Brushless Motor",                                                  subtitle: "6.a01 Mens et Manus, 2018",              url: "/projects/brushless-motor",   image: "/images/brushless-motor/20181022_144009.jpg",                                tags: ["Engineering"] },
  { id: 14, title: "Penguino the Fishbot",                                             subtitle: "6.a01 Mens et Manus, 2018",              url: "/projects/penguino",          image: "/images/penguino/20181207_181612.jpg",                                       tags: ["Engineering"] },
  { id: 15, title: "MakeMIT Marketing",                                                subtitle: "MakeMIT, 2018",                          url: "/projects/makemit",           image: "/images/makemit/maker.jpg",                                                   tags: ["Design", "Art"] },
  { id: 16, title: "'The Watering Cans' Graphic Design",                               subtitle: "MIST, 2018",                             url: "/projects/watering-cans",     image: "/images/watering-cans/main-pic.png",                                          tags: ["Art", "Design"] },
];

const FILTERS = ["All", "Design", "Engineering", "Research", "Art"] as const;
type Filter = typeof FILTERS[number];

const words = ["Designer.", "Maker.", "Engineer."];

import type { Variants } from 'framer-motion';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const wordVariant: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Home() {
  const [active, setActive] = useState<Filter>("All");
  const [wordsAnimated, setWordsAnimated] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const scrapRef = useRef<HTMLDivElement>(null);
  const [stickers, setStickers] = useState<PlacedSticker[]>([]);

  const addSticker = (id: StickerId) => {
    const hero = heroRef.current;
    if (!hero) return;
    const heroRect = hero.getBoundingClientRect();
    const scrap = scrapRef.current;
    // Drop near the scrap notes, with a small random jitter around them.
    const jitter = () => (Math.random() - 0.5) * 60;
    let baseX: number;
    let baseY: number;
    if (scrap) {
      const sr = scrap.getBoundingClientRect();
      // Position relative to hero's top-left
      baseX = sr.left - heroRect.left + sr.width / 2 - 55 + jitter();
      baseY = sr.top  - heroRect.top  + sr.height / 2 - 55 + jitter();
    } else {
      baseX = heroRect.width * 0.55 + jitter();
      baseY = heroRect.height * 0.35 + jitter();
    }
    const rotate = (Math.random() - 0.5) * 24;
    setStickers((prev) => [
      ...prev,
      {
        uid: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        id,
        x: Math.round(baseX),
        y: Math.round(baseY),
        rotate: Math.round(rotate * 10) / 10,
      },
    ]);
  };

  const updateSticker = (uid: string, patch: Partial<PlacedSticker>) =>
    setStickers((prev) => prev.map((s) => (s.uid === uid ? { ...s, ...patch } : s)));
  const [showIntro, setShowIntro] = useState(() => {
    const visible = (() => {
      try { return !sessionStorage.getItem('intro_v3'); } catch { return true; }
    })();
    setIntroVisible(visible);
    return visible;
  });

  useEffect(() => {
    setIntroVisible(showIntro);
    return () => setIntroVisible(false);
  }, [showIntro]);

  const handleIntroExit = () => {
    try { sessionStorage.setItem('intro_v3', '1'); } catch {}
    setShowIntro(false);
  };

  const filtered = active === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(active));

  return (
    <div className="w-full">
      <AnimatePresence>{showIntro && <IntroScreen onExit={handleIntroExit} />}</AnimatePresence>
      <section ref={heroRef} className="min-h-[85vh] flex flex-col justify-center pt-24 pb-16 relative overflow-hidden px-6 md:px-12">
        <motion.p
          variants={fadeUp} initial="hidden" animate={showIntro ? "hidden" : "show"} transition={{ delay: 0.05 }}
          className="mb-6"
        >
          <span
            className="inline-block bg-accent text-white font-sans font-bold uppercase tracking-[0.12em] px-3 py-1.5"
            style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)' }}
          >
            Layal Barakat &mdash; Portfolio
          </span>
        </motion.p>

        <div
          className="grid grid-cols-1 xs:grid-cols-[auto_auto] xs:justify-start items-center gap-x-12 xl:gap-x-20 [grid-template-areas:'h1'_'divider'_'scrap'_'tagline'] xs:[grid-template-areas:'h1_scrap'_'divider_divider'_'tagline_tagline']"
        >
          <motion.h1
            variants={container} initial="hidden" animate={showIntro ? "hidden" : "show"}
            onAnimationComplete={() => { if (!showIntro) setWordsAnimated(true); }}
            className="font-serif text-foreground leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)", gridArea: 'h1' }}
          >
            {words.map((word) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className={`block${wordsAnimated ? " transition-colors duration-300 ease-in-out hover:text-accent" : ""}`}
                  variants={wordVariant}
                >{word}</motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            className="h-px bg-accent mt-8 mb-8 origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={showIntro ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "clamp(80px, 12vw, 160px)", gridArea: 'divider' }}
          />

          <div
            ref={scrapRef}
            className="justify-self-start xs:justify-self-auto mb-6 xs:mb-0"
            style={{ gridArea: 'scrap' }}
          >
            <PaperScrap animate={wordsAnimated} dragConstraintsRef={heroRef} onAddSticker={addSticker} />
          </div>

          <motion.p
            variants={fadeUp} initial="hidden" animate={showIntro ? "hidden" : "show"} transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl"
            style={{ gridArea: 'tagline' }}
          >
            MIT BS '23, MS '25. Helping others through functional and accessible design.
          </motion.p>
        </div>
        <StickerLayer
          stickers={stickers}
          onUpdate={updateSticker}
          dragConstraintsRef={heroRef}
        />
      </section>

      <TickerStrip />

      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Filter bar */}
          <div className="flex items-center gap-x-1 gap-y-2 flex-wrap mb-10" data-testid="filter-bar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                data-testid={`filter-${f.toLowerCase()}`}
                className="filter-tag relative focus:outline-none"
                aria-pressed={active === f}
              >
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0"
                    style={{ backgroundColor: "hsl(var(--accent))", zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
            <span className="ml-auto text-xs font-sans text-muted-foreground uppercase tracking-widest self-center">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <ProjectsGrid key={active} projects={filtered} />
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
