import React from 'react';
import ProjectPage from '@/components/ProjectPage';
import { useLightbox } from '@/contexts/LightboxContext';

export default function MakeMIT() {
  const { open } = useLightbox();

  return (
    <ProjectPage title="MakeMIT Marketing" subtitle="MakeMIT, 2018">
      <p>
        In my freshman year I was a part of the marketing team for MakeMIT, a weekend hardware hackathon at MIT. The
        following is a collection of the work I created or was a part of designing:
      </p>

      <figure className="my-8">
        <img src="/images/makemit/logo-final.png" alt="MakeMIT 2019 logo" className="w-full cursor-zoom-in" onClick={() => open('/images/makemit/logo-final.png', 'MakeMIT 2019 logo')} />
        <figcaption className="mt-3 text-center text-base text-muted-foreground italic">{'The MakeMIT logo for 2019. The logo has been designed similarly before, however, I formulated the "medallion" style look. Edited by team.'}</figcaption>
      </figure>

      <figure className="my-8">
        <img src="/images/makemit/branding.png" alt="MakeMIT 2019 branding" className="w-full cursor-zoom-in" onClick={() => open('/images/makemit/branding.png', 'MakeMIT 2019 branding')} />
        <figcaption className="mt-3 text-center text-base text-muted-foreground italic">As a team we decided the general branding for MakeMIT 2019 .</figcaption>
      </figure>

      <figure className="my-8">
        <img src="/images/makemit/banner-illustrator.png" alt="MakeMIT Facebook banner" className="w-full cursor-zoom-in" onClick={() => open('/images/makemit/banner-illustrator.png', 'MakeMIT Facebook banner')} />
        <figcaption className="mt-3 text-center text-base text-muted-foreground italic">Facebook banner.</figcaption>
      </figure>

      <figure className="my-8 not-prose">
        <div className="relative overflow-hidden">
          <div style={{ paddingTop: `calc(100% / ${1200/751 + 1200/750} - ${9 / (1200/751 + 1200/750)}px)` }} />
          <div className="absolute inset-0 flex gap-[9px]">
            <img src="/images/makemit/maker.jpg" alt="MakeMIT name tags" className="h-full object-cover min-w-0 cursor-zoom-in" style={{ flex: 1200/751 }} onClick={() => open('/images/makemit/maker.jpg', 'MakeMIT name tags')} />
            <img src="/images/makemit/sponsor.jpg" alt="MakeMIT sponsor materials" className="h-full object-cover min-w-0 cursor-zoom-in" style={{ flex: 1200/750 }} onClick={() => open('/images/makemit/sponsor.jpg', 'MakeMIT sponsor materials')} />
          </div>
        </div>
        <figcaption className="mt-3 text-center text-base text-muted-foreground italic">These name tags were put together by me, the hammers were designed by a team member. The white gap in the middle would hold a printed name sticker.</figcaption>
      </figure>
    </ProjectPage>
  );
}
