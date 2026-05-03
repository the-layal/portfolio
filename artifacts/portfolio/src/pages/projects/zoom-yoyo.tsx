import React from 'react';
import ProjectPage, { VideoEmbed } from '@/components/ProjectPage';
import ImageGrid from '@/components/ImageGrid';

export default function ZoomYoyo() {
  return (
    <ProjectPage title="Zoom Yoyo Manufacturing" subtitle="2.008 Design and Manufacturing II, 2021">

      <figure className="my-8 flex gap-2" style={{ height: 'clamp(240px, 38vw, 480px)' }}>
        <img src="/images/zoom-yoyo/img_1745-e1661713959390.png" alt="" className="flex-1 min-w-0 h-full object-cover" />
        <img src="/images/zoom-yoyo/yo.gif" alt="" className="w-[42%] h-full object-cover" />
      </figure>

      <p>{`In Spring 2021, I took 2.008-Design and Manufactring II. Though it was during the pandemic, I was able to work on a team of seven people to design and manufacture 50 Zoom-themed yoyos. I was able to get experience using a HAAS milling machine, an injection molding machine, and a vacuum thermoformer. I especially spent a lot of time around the injection molding machine, and got very used to setting it up with our molds and ejector pins every time we got to lab.`}</p>

      <h4>{`Zoom Cap + Thermoformed Piece`}</h4>

      <p>{`I was responsible for CADing the Zoom cap and Zoom thermoformed piece. I had to take into account the tolerances between the three parts: the cap, thermoformed piece, and the base. The models I created were used to create the Zoom cap mold and the thermoformed logo die by my teammates. I used the HAAS milling machine to make the mold with another teammate and with the supervision of our instructor. We learned how to read G-code and understand some of the more common G-code commands while the mill was running.`}</p>

      <ImageGrid images={[
        { src: "/images/zoom-yoyo/cap.png" },
        { src: "/images/zoom-yoyo/thermo.png" },
      ]} cols={2} />

      <figure className="my-8">
        <img src="/images/zoom-yoyo/20210407_122919.jpg" alt="" className="w-full" />
      </figure>

      <p>{`Then, I became familiar with the injection molding machine, as we learned to set up the mold and ejector pins. We also played around with the injection molding settings and amounts of color pellets. to see what we would get as a result. We got short shot, flash, and everything in between.`}</p>

      <figure className="my-8">
        <img src="/images/zoom-yoyo/20210331_110334.jpg" alt="" className="w-full" />
      </figure>

      <ImageGrid images={[
        { src: "/images/zoom-yoyo/20210414_113640-1.jpg" },
        { src: "/images/zoom-yoyo/20210331_152018.jpg" },
      ]} cols={2} />

      <figure className="my-8">
        <img src="/images/zoom-yoyo/20210331_152049.jpg" alt="" className="w-full" />
      </figure>

      <figure className="my-8">
        <img src="/images/zoom-yoyo/20210331_152034.jpg" alt="" className="w-full" />
      </figure>

      <p>{`We injection molded 100 caps and made a control chart to check that we were staying within spec. It was an assembly line of cutting the gates and sprues, numbering the caps, measuring the inner diameter of the caps in two orientations, and entering the data in a spreadsheet. In the end, combined with the thermoformed logos my teammates, we were able to control the settings and get some awesome yo-yo caps!`}</p>

      <figure className="my-8">
        <img src="/images/zoom-yoyo/img_1754.jpg" alt="" className="w-full" />
      </figure>

      <h4>{`Manufacturing Video`}</h4>

      <p>{`At the end of the class, we had to present our final work, and I was tasked with editing a video showing the manufacturing and assembly process of the entire yoyo. Our final yoyo had a nice weight (since we added shims to both sides) and yo-ed smoothly!`}</p>

      <VideoEmbed src="https://www.youtube.com/embed/APonmc7UQus?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" />

    </ProjectPage>
  );
}
