import React from 'react';
import ProjectPage, { LightboxImage } from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';

export default function ToyCushions() {
  return (
    <ProjectPage title="Sewing Cart Cushions" subtitle="2.00b Toy Design, 2019">
      <p>{`In the spring of 2019, I took 2.00b Toy Product Design. One of my tasks towards the end of the class as we were preparing the final toy product was to sew two cushions. Earlier in the class, we had been taught how to use a sewing machine to sew a plushie. Using that knowledge and some guidance from my lab mentor, I set off on my path to making welted cushions (that's the name for cushions that have the piping sewed onto the edges). The following images are taken from my lab notebook:`}</p>
      <LightboxImage src="/images/toy-cushions/layal_scan_page-1.jpg" alt="" />
      <LightboxImage src="/images/toy-cushions/layal_scan_page-2.jpg" alt="" />
      <LightboxImage src="/images/toy-cushions/layal_scan_page-3.jpg" alt="" />
      <LightboxImage src="/images/toy-cushions/layal_scan_page-4.jpg" alt="" />
      <p>{`As an additional visualization of how the cushion came together, below is a slideshow that includes more images of the process:`}</p>
      <ImageSlideshow slides={[
          { src: "/images/toy-cushions/20190505_163222-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190506_165030-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190510_175205-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190510_184831-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190510_184850-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190508_221912-1-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190508_221935-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190508_221917-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190511_165606-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190511_165618-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190511_171555-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190512_151050-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190512_143305-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190512_153003-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190512_152948-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190512_182003-min.jpg", alt: "" },
          { src: "/images/toy-cushions/20190512_181910-min.jpg", alt: "" }
        ]} />
    </ProjectPage>
  );
}
