import React from 'react';
import ProjectPage, { VideoEmbed } from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';
import ImageGrid from '@/components/ImageGrid';

  export default function SoftRobotics() {
    return (
      <ProjectPage title="Soft Robotics Curriculum Research" subtitle="MIT Media Lab, 2020">
        <img src="/images/soft-robotics/img_0205.png" alt="" />
      <p>{`In Summer 2020, I spent my time home remotely working on soft robotics curriculum research. I read around 20 papers over the summer and designed 3 DIY soft robotics projects. Traditional soft robotics actuators rely on two part silicone, which can be expensive, so my projects were aimed at being low cost and relatively easy access for any learner. I will go over two of the three projects here.`}</p>
      <h4>{`Origami Robots`}</h4>
      <p>{`I was inspired by research done at MIT and Harvard to create DIY soft robotic actuators using origami. The idea is simple: fold cardstock paper in a specific pattern, then seal a plastic ziplock bag over it with space left for a straw. From left to right below I used tape, the ziplock itself with a bit of hot glue around the straw, and hot glue.`}</p>
      <img src="/images/soft-robotics/tape.gif" alt="" />
      <h6>{`The Process`}</h6>
      <ImageSlideshow slides={[
          { src: "/images/soft-robotics/20200810_184307-1.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_164256.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_164414.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_164648.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_164656.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_164708.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_165856.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_165901.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_170259.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_170311.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_170559.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_170822.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_170826.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_171138.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_171307.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_171402.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_171547-1.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_171952-1.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_162722-animation.gif", alt: "" },
          { src: "/images/soft-robotics/20200810_175631-1.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_175742-1.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_175955-1.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_181729-1.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_183244-1.jpg", alt: "" },
          { src: "/images/soft-robotics/20200810_184519-1.jpg", alt: "" }
        ]} />
      <h4>{`DIY Gelatin Robot`}</h4>
      <p>{`I explored different silicone alternatives throughout the summer, and gelatin was one I explored in this project. It should require a few more iterations before it becomes a project that students can do!`}</p>
      <ImageGrid images={[
          { src: "/images/soft-robotics/pump-and-gelatin.gif" },
          { src: "/images/soft-robotics/final-inflate.gif" }
        ]} cols={2} />
      <h6>Making the Mold (following <a href="https://youtu.be/uPx8xwRpfFk" target="_blank" rel="noopener noreferrer">this</a> tutorial)</h6>
      <VideoEmbed src="https://www.youtube.com/embed/uPx8xwRpfFk" title="Soft robotics mold-making tutorial" />
      <ImageSlideshow slides={[
          { src: "/images/soft-robotics/20200816_144129-e1663939611428.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_144346.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_145604.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_150346.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_151155.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_152051.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_152146.jpg", alt: "" },
          { src: "/images/soft-robotics/glue-layering.gif", alt: "" },
          { src: "/images/soft-robotics/20200816_152751.jpg", alt: "" }
        ]} />
      <h6>{`Gelatin Filling`}</h6>
      <ImageSlideshow slides={[
          { src: "/images/soft-robotics/20200816_153927.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_154628.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_154930.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_155149.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_155234.jpg", alt: "" },
          { src: "/images/soft-robotics/mixing-gelatin.gif", alt: "" },
          { src: "/images/soft-robotics/20200816_162220.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_162300.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_162458.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_162723.jpg", alt: "" },
          { src: "/images/soft-robotics/demolding-base.gif", alt: "" },
          { src: "/images/soft-robotics/20200816_192433.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_192442.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_192529.jpg", alt: "" },
          { src: "/images/soft-robotics/20200816_194255.jpg", alt: "" },
          { src: "/images/soft-robotics/putting-together.gif", alt: "" },
          { src: "/images/soft-robotics/20200817_214919.jpg", alt: "" }
        ]} />
      <h6>{`Making Pump and Adding Structure`}</h6>
      <ImageSlideshow slides={[
          { src: "/images/soft-robotics/20200818_153032.jpg", alt: "" },
          { src: "/images/soft-robotics/20200818_153405.jpg", alt: "" },
          { src: "/images/soft-robotics/20200818_153929.jpg", alt: "" },
          { src: "/images/soft-robotics/bottle.gif", alt: "" },
          { src: "/images/soft-robotics/20200818_154414.jpg", alt: "" },
          { src: "/images/soft-robotics/20200818_155953.jpg", alt: "" },
          { src: "/images/soft-robotics/lifting-inflating.gif", alt: "" },
          { src: "/images/soft-robotics/pump-and-gelatin.gif", alt: "" },
          { src: "/images/soft-robotics/20200818_160542.jpg", alt: "" },
          { src: "/images/soft-robotics/20200818_161040.jpg", alt: "" },
          { src: "/images/soft-robotics/final-inflate.gif", alt: "" }
        ]} />
      </ProjectPage>
    );
  }
  