import React from 'react';
import ProjectPage from '@/components/ProjectPage';

function CaptionedImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} className="w-full" />
      <figcaption className="mt-3 text-center text-base text-muted-foreground italic">{caption}</figcaption>
    </figure>
  );
}

export default function MakeMIT() {
  return (
    <ProjectPage title="MakeMIT Marketing" subtitle="MakeMIT, 2018">
      <p>
        In my freshman year I was a part of the marketing team for MakeMIT, a weekend hardware hackathon at MIT. The
        following is a collection of the work I created or was a part of designing:
      </p>

      <CaptionedImage
        src="/images/makemit/logo-final.png"
        alt="MakeMIT 2019 logo"
        caption={'The MakeMIT logo for 2019. The logo has been designed similarly before, however, I formulated the “medallion” style look. Edited by team.'}
      />

      <CaptionedImage
        src="/images/makemit/branding.png"
        alt="MakeMIT 2019 branding"
        caption="As a team we decided the general branding for MakeMIT 2019 ."
      />

      <CaptionedImage
        src="/images/makemit/banner-illustrator.png"
        alt="MakeMIT Facebook banner"
        caption="Facebook banner."
      />

      <figure className="my-8 not-prose relative overflow-hidden">
        <div style={{ paddingTop: `calc(100% / ${1200/751 + 1200/750} - ${9 / (1200/751 + 1200/750)}px)` }} />
        <div className="absolute inset-0 flex gap-[9px]">
          <img src="/images/makemit/maker.jpg" alt="MakeMIT name tags" className="h-full object-cover min-w-0" style={{ flex: 1200/751 }} />
          <img src="/images/makemit/sponsor.jpg" alt="MakeMIT sponsor materials" className="h-full object-cover min-w-0" style={{ flex: 1200/750 }} />
        </div>
      </figure>
    </ProjectPage>
  );
}
