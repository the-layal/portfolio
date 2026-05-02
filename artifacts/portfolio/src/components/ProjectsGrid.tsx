import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  image: string;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const brightness = useTransform(mouseYSpring, [-0.5, 0.5], [1.2, 0.8]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a 
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      style={{ 
        rotateX, 
        rotateY, 
        perspective: "1000px"
      }}
      className="block relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-card group border border-transparent hover:border-border transition-colors duration-500"
      data-testid={`project-card-${project.id}`}
    >
      <motion.div 
        style={{ filter: `brightness(${brightness})` }}
        className="absolute inset-0 pointer-events-none scale-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.1]"
      >
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500" />
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white pointer-events-none flex flex-col justify-end">
        <p className="text-accent font-sans text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">{project.subtitle}</p>
        <h3 className="text-xl md:text-2xl font-serif leading-tight drop-shadow-md">{project.title}</h3>
      </div>
    </motion.a>
  );
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12">
      {projects.map((project, idx) => (
        <ProjectCard key={project.id} project={project} index={idx} />
      ))}
    </div>
  );
}
