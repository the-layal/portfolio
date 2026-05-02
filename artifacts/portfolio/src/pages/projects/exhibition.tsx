import React from 'react';
import ProjectPage from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';

  export default function Exhibition() {
    return (
      <ProjectPage title="Art Exhibition" subtitle="IB Art, 2018">
        <p>{`In a culmination of my two years of work in the International Baccalaureate Program, I put together instances of my work and progress in a ‘Process Portfolio’, and gathered my final pieces into a final exhibition attended by members of my school community.`}</p>
      <ImageSlideshow slides={[
          { src: "/images/exhibition/process-portfolio-page-001-e1577422719379.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-002.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-003.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-004.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-005.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-006.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-007.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-008.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-009.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-010.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-011.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-012.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-013.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-016.jpg", alt: "" },
          { src: "/images/exhibition/process-portfolio-page-017.jpg", alt: "" }
        ]} />
      <ImageSlideshow slides={[
          { src: "/images/exhibition/exhibition-page-001.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-002.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-003.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-004.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-005.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-007.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-008.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-009.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-010.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-011.jpg", alt: "" },
          { src: "/images/exhibition/exhibition-page-012.jpg", alt: "" }
        ]} />
      </ProjectPage>
    );
  }
  