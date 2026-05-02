import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectsGrid from '@/components/ProjectsGrid';
import IntroScreen from '@/components/IntroScreen';
import PaperScrap from '@/components/PaperScrap';

const PROJECTS = [
  { id: 1,  title: "Impact of Introducing Technical Elements in Makerspace Trainings", subtitle: "MIT Master's Thesis, 2025",              url: "https://layal.info/thesis/",                                          image: "https://layal.info/wp-content/uploads/2025/08/dfp.png",                                                                                              tags: ["Research"] },
  { id: 2,  title: "Infant Abdomen Benchtop Model",                                   subtitle: "2.750 Medical Device Design, 2022",      url: "https://layal.info/2-750/",                                           image: "https://layal.info/wp-content/uploads/2023/07/vessels-with-blood-4063750325-e1689157690888.jpeg",                                                    tags: ["Engineering"] },
  { id: 3,  title: "ReVise: A Conformable Vise",                                       subtitle: "2.009 Product Design Process, 2021",     url: "https://layal.info/revise/",                                          image: "https://layal.info/wp-content/uploads/2022/08/mainimage.png",                                                                                        tags: ["Design", "Engineering"] },
  { id: 4,  title: "Zoom Yoyo Manufacturing",                                          subtitle: "2.008 Design and Manufacturing II, 2021", url: "https://layal.info/zoom-yoyo/",                                       image: "https://layal.info/wp-content/uploads/2022/08/img_1754.jpg",                                                                                         tags: ["Engineering"] },
  { id: 5,  title: "Macaron Properties Research Project",                              subtitle: "2.671 Measurement and Instrumentation, 2021", url: "https://layal.info/macarons/",                                   image: "https://layal.info/wp-content/uploads/2022/08/20210402_181211.jpg",                                                                                   tags: ["Research"] },
  { id: 6,  title: "4.031 – Design Objects + Interaction",                             subtitle: "MIT, 2020",                              url: "https://layal.info/4-031/",                                           image: "https://layal.info/wp-content/uploads/2022/08/dsc_0760.jpg",                                                                                         tags: ["Design"] },
  { id: 7,  title: "Soft Robotics Curriculum Research",                                subtitle: "MIT Media Lab, 2020",                    url: "https://layal.info/soft-robotics/",                                   image: "https://layal.info/wp-content/uploads/2022/08/herringbone.gif",                                                                                      tags: ["Research", "Engineering"] },
  { id: 8,  title: "Social Robot Research Study",                                      subtitle: "MIT Media Lab, 2019",                    url: "https://layalsportfolio.wordpress.com/social-robot-research-study/",  image: "https://layal.info/wp-content/uploads/2019/11/20190708_115141-e1575160367910.jpg",                                                                    tags: ["Research"] },
  { id: 9,  title: "Sewing Cart Cushions",                                             subtitle: "2.00b Toy Design, 2019",                 url: "https://layalsportfolio.wordpress.com/toy-cushions/",                 image: "https://layal.info/wp-content/uploads/2019/12/20190511_165618-e1575161467355.jpg",                                                                    tags: ["Design"] },
  { id: 10, title: "Art Exhibition",                                                   subtitle: "IB Art, 2018",                           url: "https://layalsportfolio.wordpress.com/exhibition/",                   image: "https://layal.info/wp-content/uploads/2019/12/exhibition.png",                                                                                       tags: ["Art"] },
  { id: 11, title: "How to Design Intensive",                                          subtitle: "MIT, 2020",                              url: "https://layalsportfolio.wordpress.com/4.02A/",                        image: "https://layal.info/wp-content/uploads/2020/03/spin-loop.gif",                                                                                        tags: ["Design"] },
  { id: 12, title: "Video Projects",                                                   subtitle: "Assorted Creations, 2016–2019",          url: "https://layalsportfolio.wordpress.com/videos/",                       image: "https://layal.info/wp-content/uploads/2019/12/video-edit-icon-on-white-background-for-graphic-vector-23077349-e1575178845868.jpg",                    tags: ["Art"] },
  { id: 13, title: "Brushless Motor",                                                  subtitle: "6.a01 Mens et Manus, 2018",              url: "https://layalsportfolio.wordpress.com/brushless-motor/",              image: "https://layal.info/wp-content/uploads/2019/12/20181022_144009.jpg",                                                                                   tags: ["Engineering"] },
  { id: 14, title: "Penguino the Fishbot",                                             subtitle: "6.a01 Mens et Manus, 2018",              url: "https://layalsportfolio.wordpress.com/penguino/",                     image: "https://layal.info/wp-content/uploads/2019/12/20181207_181612-e1575174438905.jpg",                                                                    tags: ["Engineering"] },
  { id: 15, title: "MakeMIT Marketing",                                                subtitle: "MakeMIT, 2018",                          url: "https://layalsportfolio.wordpress.com/makemit/",                      image: "https://layal.info/wp-content/uploads/2019/12/logo-final-1.png",                                                                                     tags: ["Design", "Art"] },
  { id: 16, title: "'The Watering Cans' Graphic Design",                               subtitle: "MIST, 2018",                             url: "https://layalsportfolio.wordpress.com/the-watering-can/",             image: "https://layal.info/wp-content/uploads/2020/03/aye.gif",                                                                                              tags: ["Art", "Design"] },
];

const FILTERS = ["All", "Design", "Engineering", "Research", "Art"] as const;
type Filter = typeof FILTERS[number];

const words = ["Designer.", "Maker.", "Engineer."];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const wordVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Home() {
  const [active, setActive] = useState<Filter>("All");
  const [wordsAnimated, setWordsAnimated] = useState(false);
  const [showIntro, setShowIntro] = useState(() => {
    try { return !sessionStorage.getItem('intro_v3'); } catch { return true; }
  });

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
      <section className="min-h-[85vh] flex flex-col justify-center pt-24 pb-16 relative overflow-hidden px-6 md:px-12">
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.05 }}
          className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-6"
        >
          Layal Barakat &mdash; Portfolio
        </motion.p>

        <div className="flex flex-row items-center gap-12 xl:gap-20">
          <div className="flex-1 min-w-0">
            <motion.h1
              variants={container} initial="hidden" animate="show"
              onAnimationComplete={() => setWordsAnimated(true)}
              className="font-serif text-foreground leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)" }}
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
              className="h-px bg-accent mb-8 origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "clamp(80px, 12vw, 160px)" }}
            />

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground font-sans font-light leading-relaxed max-w-xl"
            >
              MIT BS '23, MS '25. Helping others through functional and accessible design.
            </motion.p>
          </div>

          <PaperScrap animate={wordsAnimated} />
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Filter bar */}
          <div className="flex items-center gap-2 flex-wrap mb-12" data-testid="filter-bar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                data-testid={`filter-${f.toLowerCase()}`}
                className="relative px-5 py-2 text-sm font-sans tracking-wide rounded-full border transition-colors duration-200 focus:outline-none"
                style={{
                  borderColor: active === f ? "hsl(var(--accent))" : "hsl(var(--border))",
                  color: active === f ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                  backgroundColor: active === f ? "hsl(var(--accent))" : "transparent",
                }}
              >
                {f}
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ backgroundColor: "hsl(var(--accent))" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <span className="ml-auto text-xs font-sans text-muted-foreground uppercase tracking-widest">
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
