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

export default function Home() {
  return (
    <div className="w-full">
      <section className="min-h-[70vh] flex flex-col justify-center items-start pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-tight tracking-tight mb-6">
            Designer. Maker.<br />Engineer.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-sans font-light leading-relaxed max-w-2xl border-l-2 border-accent pl-6">
            MIT BS '23, MS '25. Helping others through functional and accessible design.
          </p>
        </motion.div>
      </section>

      <section className="py-24">
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
