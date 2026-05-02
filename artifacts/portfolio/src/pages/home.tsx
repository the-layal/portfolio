import React from 'react';
import { motion } from 'framer-motion';
import ProjectsGrid from '@/components/ProjectsGrid';

const PROJECTS = [
  { id: 1, title: "Impact of Introducing Technical Elements in Makerspace Trainings", subtitle: "MIT Master's Thesis, 2025", url: "https://layal.info/thesis/", image: "https://layal.info/wp-content/uploads/2025/08/dfp.png" },
  { id: 2, title: "Infant Abdomen Benchtop Model", subtitle: "2.750 Medical Device Design, 2022", url: "https://layal.info/2-750/", image: "https://layal.info/wp-content/uploads/2023/07/vessels-with-blood-4063750325-e1689157690888.jpeg" },
  { id: 3, title: "ReVise: A Conformable Vise", subtitle: "2.009 Product Design Process, 2021", url: "https://layal.info/revise/", image: "https://layal.info/wp-content/uploads/2022/08/mainimage.png" },
  { id: 4, title: "Zoom Yoyo Manufacturing", subtitle: "2.008 Design and Manufacturing II, 2021", url: "https://layal.info/zoom-yoyo/", image: "https://layal.info/wp-content/uploads/2022/08/img_1754.jpg" },
  { id: 5, title: "Macaron Properties Research Project", subtitle: "2.671 Measurement and Instrumentation, 2021", url: "https://layal.info/macarons/", image: "https://layal.info/wp-content/uploads/2022/08/20210402_181211.jpg" },
  { id: 6, title: "4.031 – Design Objects + Interaction", subtitle: "MIT, 2020", url: "https://layal.info/4-031/", image: "https://layal.info/wp-content/uploads/2022/08/dsc_0760.jpg" },
  { id: 7, title: "Soft Robotics Curriculum Research", subtitle: "MIT Media Lab, 2020", url: "https://layal.info/soft-robotics/", image: "https://layal.info/wp-content/uploads/2022/08/herringbone.gif" },
  { id: 8, title: "Social Robot Research Study", subtitle: "MIT Media Lab, 2019", url: "https://layalsportfolio.wordpress.com/social-robot-research-study/", image: "https://layal.info/wp-content/uploads/2019/11/20190708_115141-e1575160367910.jpg" },
  { id: 9, title: "Sewing Cart Cushions", subtitle: "2.00b Toy Design, 2019", url: "https://layalsportfolio.wordpress.com/toy-cushions/", image: "https://layal.info/wp-content/uploads/2019/12/20190511_165618-e1575161467355.jpg" },
  { id: 10, title: "Art Exhibition", subtitle: "IB Art, 2018", url: "https://layalsportfolio.wordpress.com/exhibition/", image: "https://layal.info/wp-content/uploads/2019/12/exhibition.png" },
  { id: 11, title: "How to Design Intensive", subtitle: "MIT, 2020", url: "https://layalsportfolio.wordpress.com/4.02A/", image: "https://layal.info/wp-content/uploads/2020/03/spin-loop.gif" },
  { id: 12, title: "Video Projects", subtitle: "Assorted Creations, 2016–2019", url: "https://layalsportfolio.wordpress.com/videos/", image: "https://layal.info/wp-content/uploads/2019/12/video-edit-icon-on-white-background-for-graphic-vector-23077349-e1575178845868.jpg" },
  { id: 13, title: "Brushless Motor", subtitle: "6.a01 Mens et Manus, 2018", url: "https://layalsportfolio.wordpress.com/brushless-motor/", image: "https://layal.info/wp-content/uploads/2019/12/20181022_144009.jpg" },
  { id: 14, title: "Penguino the Fishbot", subtitle: "6.a01 Mens et Manus, 2018", url: "https://layalsportfolio.wordpress.com/penguino/", image: "https://layal.info/wp-content/uploads/2019/12/20181207_181612-e1575174438905.jpg" },
  { id: 15, title: "MakeMIT Marketing", subtitle: "MakeMIT, 2018", url: "https://layalsportfolio.wordpress.com/makemit/", image: "https://layal.info/wp-content/uploads/2019/12/logo-final-1.png" },
  { id: 16, title: "'The Watering Cans' Graphic Design", subtitle: "MIST, 2018", url: "https://layalsportfolio.wordpress.com/the-watering-can/", image: "https://layal.info/wp-content/uploads/2020/03/aye.gif" },
];

const words = ["Designer.", "Maker.", "Engineer."];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const wordVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="w-full">
      <section className="min-h-[85vh] flex flex-col justify-center items-start pt-24 pb-16 relative overflow-hidden px-6 md:px-12">

        {/* Ambient gradient blob */}
        <motion.div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Small label above headline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.05 }}
          className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-6"
        >
          Layal Barakat &mdash; Portfolio
        </motion.p>

        {/* Staggered headline */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-serif text-foreground leading-[1.05] tracking-tight mb-8"
          style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)" }}
        >
          {words.map((word) => (
            <span key={word} className="block overflow-hidden">
              <motion.span className="block" variants={wordVariant}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Animated accent line */}
        <motion.div
          className="h-px bg-accent mb-8 origin-left"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "clamp(80px, 12vw, 160px)" }}
        />

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground font-sans font-light leading-relaxed max-w-xl pl-0"
        >
          MIT BS '23, MS '25. Helping others through functional and accessible design.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
          <motion.div
            className="w-px h-10 bg-accent origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          />
        </motion.div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Selected Works</h2>
            <span className="text-sm font-sans text-muted-foreground uppercase tracking-widest">2016 — 2025</span>
          </div>
          <ProjectsGrid projects={PROJECTS} />
        </motion.div>
      </section>
    </div>
  );
}
