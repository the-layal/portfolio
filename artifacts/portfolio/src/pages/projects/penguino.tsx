import React from 'react';
import ProjectPage, { VideoEmbed } from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';

  export default function Penguino() {
    return (
      <ProjectPage title="Penguino the Fishbot" subtitle="6.a01 Mens et Manus, 2018">
        <p>{`Penguino is the affectionate name given to my second project in 6.a01 Mens et Manus, a freshman seminar. Penguino is a fishbot, or in other words, an underwater robot. Essentially, the servos and wires were all waterproofed to allow the penguin to ‘swim’ in the water. Below is a presentation and video that show how the robot works.`}</p>
      <ImageSlideshow slides={[
          { src: "/images/penguino/prezi-page-001.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-002.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-003.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-004.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-005.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-006.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-007.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-008.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-009.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-010.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-011.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-012.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-013.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-014.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-015.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-016.jpg", alt: "" },
          { src: "/images/penguino/prezi-page-017.jpg", alt: "" }
        ]} />
      <VideoEmbed src="https://www.youtube.com/embed/kyuun-H0Mbw?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" />
      </ProjectPage>
    );
  }
  