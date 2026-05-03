import React from 'react';
import ProjectPage from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';

  export default function DesignIntensive() {
    return (
      <ProjectPage title="How to Design Intensive" subtitle="MIT, 2020">
        <div className="not-prose sm:hidden flex flex-col gap-[9px]">
          <img src="/images/design-intensive/barakat_layal_how-to-design_assignment-01-1.png" alt="Assignment 1 final piece" className="w-full h-auto" />
          <img src="/images/design-intensive/spin-loop.gif" alt="Spin-loop animation from Assignment 2 process" className="w-full h-auto" />
        </div>
        <figure className="not-prose hidden sm:block relative overflow-hidden">
          <div style={{ paddingTop: `calc(100% / ${2000/1125 + 298/480} - ${9 / (2000/1125 + 298/480)}px)` }} />
          <div className="absolute inset-0 flex gap-[9px]">
            <img src="/images/design-intensive/barakat_layal_how-to-design_assignment-01-1.png" alt="Assignment 1 final piece" className="h-full w-full object-cover min-w-0" style={{ flex: 2000/1125 }} />
            <img src="/images/design-intensive/spin-loop.gif" alt="Spin-loop animation from Assignment 2 process" className="h-full w-full object-cover min-w-0" style={{ flex: 298/480 }} />
          </div>
        </figure>
      <p>{`In January 2020, I took 4.02A-Intro to Design: Studio Intensive. In it, I was introduced to the fundamentals of design through the completion of three projects, each lasting a week. Through careful thought, study, and iteration, I was able to produce compelling art in a way I didn’t expect.`}</p>
      <h4>{`Assignment 1-Drift`}</h4>
      <p>{`The goal of the first assignment was to create a tool and/or process that would result in many pieces that vary slightly from each other. After brainstorming many ideas, I decided to somehow incorporate the idea of utilizing multiple marking utensils to create chains of shapes.`}</p>
      <p>{`The following is my final project and presentation:`}</p>
      <ImageSlideshow slides={[
          { src: "/images/design-intensive/barakat_layal_how-to-design_assignment-01-1.png", alt: "" },
          { src: "/images/design-intensive/barakat_layal_how-to-design_assignment-01-2.png", alt: "" },
          { src: "/images/design-intensive/barakat_layal_how-to-design_assignment-01-3.png", alt: "" },
          { src: "/images/design-intensive/barakat_layal_how-to-design_assignment-01-6.gif", alt: "" },
          { src: "/images/design-intensive/barakat_layal_how-to-design_assignment-01-7-1.gif", alt: "" },
          { src: "/images/design-intensive/barakat_layal_how-to-design_assignment-01-4.png", alt: "" },
          { src: "/images/design-intensive/barakat_layal_how-to-design_assignment-01-5.png", alt: "" }
        ]} />
      <h4>{`Assignment 2- Solid Out of a Solid`}</h4>
      <p>{`The second assignment brought us into the 3D realm. Our task was to extract a solid out of a solid using a hot wire cutter, presenting both the positive and negative of the solid we extracted. I wanted to create something almost recursive, in other words, a solid out of a solid out of a solid (and possibly so on). I played around with Rhino for the first time and generated a few ideas about how I wanted my piece to look like:`}</p>
      <img src="/images/design-intensive/ideas.png" alt="" />
      <p>{`This concept seemed interesting to me especially because the last two drawings (grey) were varied enough that it would be difficult to tell what the lat extracted solid would look like based on the solid before it. I began to roll with that concept, and then decided to make the whole piece more cohesive, use the positives and negatives all in one structure. Below is my presentation for my final piece, Insomniac:`}</p>
      <ImageSlideshow slides={[
          { src: "/images/design-intensive/layals-how-to-design_assignment-02_presentation-1-2.gif", alt: "" },
          { src: "/images/design-intensive/layals-how-to-design_assignment-02_presentation-1-3.png", alt: "" },
          { src: "/images/design-intensive/layals-how-to-design_assignment-02_presentation-1-4.png", alt: "" },
          { src: "/images/design-intensive/layals-how-to-design_assignment-02_presentation-1-5.png", alt: "" },
          { src: "/images/design-intensive/layals-how-to-design_assignment-02_presentation-1-6.png", alt: "" },
          { src: "/images/design-intensive/layals-how-to-design_assignment-02_presentation-1-7.png", alt: "" }
        ]} />
      <h4>{`Assignment 3-Architectural Facade`}</h4>
      <p>{`The final assignment was a group project. We were tasked with creating a foam “screen”. It would be created in pieces, specifically, the screen would be 8 foam blocks wide by 4 foam blocks high. Compared to the last assignment, where we were to make only one object from a 6x6x6 piece of foam, here, we were making 32.`}</p>
      <p>{`My teammates and I all had an interest in color and making something that could move. We resulted in the final facade below (more concept details in the slides):`}</p>
      <ImageSlideshow slides={[
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-1.png", alt: "" },
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-2.png", alt: "" },
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-3.png", alt: "" },
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-4.gif", alt: "" },
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-5.gif", alt: "" },
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-6.png", alt: "" },
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-7.png", alt: "" },
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-8.png", alt: "" },
          { src: "/images/design-intensive/4.02a-project-3-presentation-lila-layal-margaret-9.png", alt: "" }
        ]} />
      </ProjectPage>
    );
  }
  