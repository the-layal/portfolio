import React from 'react';
import ProjectPage, { VideoEmbed } from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';
import ImageGrid from '@/components/ImageGrid';

  export default function DesignObjects() {
    return (
      <ProjectPage title="4.031 — Design Objects + Interaction" subtitle="MIT, 2020">
        <ImageGrid images={[
          { src: "/images/4-031/dsc_0752.jpg" },
          { src: "/images/4-031/reflections-lamp-presentation-28.png" }
        ]} cols={2} />
      <p>{`In Fall 2020 (height of the COVID-19 pandemic), I took 4.031 – Design Objects + Interaction. In it, I worked on two projects from home, a lamp, and a clock.`}</p>
      <h4>{`Clock – Pendronome`}</h4>
      <p>{`I was inspired by double pendulums and metronomes to make this piece. It is a new way to experience time. Just set the tempo and let the controlled chaos ensue.`}</p>
      <VideoEmbed src="https://www.youtube.com/embed/a-Qg-Ov4XMc?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" />
      <h6>{`Final Presentation`}</h6>
      <ImageSlideshow slides={[
          { src: "/images/4-031/pendronome-clock-03-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-05-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-06-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-07-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-08-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-09-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-10-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-11-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-12-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-13-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-14-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-15-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-16-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-17-1.png", alt: "" },
          { src: "/images/4-031/pendronome-clock-18-1.png", alt: "" }
        ]} />
      <h6>{`Weekly Progress`}</h6>
      <p>{`You can see more details here on how I narrowed down my options and developed the electronics and controls for Pendronome!`}</p>
      <VideoEmbed src="https://docs.google.com/presentation/d/e/2PACX-1vSndV32H4BLFn239fHQv5wUAjCnllnYIZEbVLCoAD2xJDb_Kb6J7Az_Q9aPNSqDkF53el8LPO_bswyq/embed?start=true&loop=true&delayms=60000" />
      <h4>{`Lamp – Reflections`}</h4>
      <p>{`I was primarily inspired by Sol LeWitt’s Incomplete Cubes for this project. The final result was not my favorite project, but I really want to highlight my weekly progress!`}</p>
      <h6>{`Final Presentation`}</h6>
      <ImageSlideshow slides={[
          { src: "/images/4-031/reflections-lamp-presentation-02.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-03.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-04.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-05.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-06.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-07.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-08.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-09.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-10.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-11.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-12.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-13.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-14.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-15.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-16.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-17.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-18.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-20.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-21.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-22.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-23.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-24.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-25.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-26.png", alt: "" },
          { src: "/images/4-031/reflections-lamp-presentation-27.png", alt: "" }
        ]} />
      <h6>{`Weekly Progress`}</h6>
      <VideoEmbed src="https://docs.google.com/presentation/d/e/2PACX-1vT_8uxoHmHUXqwz0JbJRyrzcdW-oKUKhU-mnrzsMLCDcEcQbXTLvZi50wvo_gToj5CFqkhZBx4IPmNT/embed?start=true&loop=true&delayms=60000" />
      </ProjectPage>
    );
  }
  