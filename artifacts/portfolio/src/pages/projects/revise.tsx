import React from 'react';
import ProjectPage, { VideoEmbed } from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';
import ImageGrid from '@/components/ImageGrid';

  export default function ReVise() {
    return (
      <ProjectPage title="ReVise: A Conformable Vise" subtitle="2.009 Product Design Process, 2021">
        <img src="/images/revise/mainimage.png" alt="" />
      <p>{`In Fall 2021, I took 2.009-Product Design Process. I worked on a 20-person team (go Pink Team!) to ideate, model, and test our product ideas from sketches to alpha prototype in one semester. I was responsible for various aspects of the product during different phases of the class. I assisted with general organization, documentation, and assembly throughout the semester. I was heavily involved in early prototypes when ReVise was still a clamp concept. Once we decided ReVise was the product we wanted to pursue, I was assigned to be the User Research Lead, which entailed leading my team in interviewing various users, including our main product advocates, and making design decisions based on their feedback. And finally, I was lucky enough to be able to present our product on the big stage in Kresge Auditorium, in front of 1000+ people! This is my 2.009 story.`}</p>
      <h4>{`Sketch Model Review`}</h4>
      <p>{`From the moment a teammate suggested an All Terrain Clamp (ATC), a clamp that could hold onto any irregular surface, I had a feeling that the idea would go far. During Sketch Model Review, Pink Team would share 6 ideas with the class, one of them being the ATC, so we split into groups.`}</p>
      <p>{`I researched existing clamp ideas, as well as materials that the clamp faces could be made of. Then, I remembered the concept of granular jamming from my soft robotics research two summers before. Typically, granular jamming is used to create grippers, so this ATC idea would then entail making two “grippers” that also applied a clamping force.`}</p>
      <p>{`I created a prototype that would hook onto the shop vacuum we had in our space to test how well it could mold onto irregularly shaped objects. I created the pouches out of nitrile gloves in the lab (we couldn’t use latex balloons) by tying the fingers and filling them with sugar that I found in the MechE lounge, then sealing them with a lot of tape.`}</p>
      <img src="/images/revise/20211005_144021.jpg" alt="" />
      <p>{`Once hooked to the vacuum, it was testing time. Below you can scroll through the gallery, documenting images of items we clamped onto and the resulting imprints.`}</p>
      <ImageSlideshow slides={[
          { src: "/images/revise/clamp-sketch-model-template-05.gif", alt: "" },
          { src: "/images/revise/clamp-sketch-model-template-06.png", alt: "" },
          { src: "/images/revise/clamp-sketch-model-template-07.png", alt: "" },
          { src: "/images/revise/clamp-sketch-model-template-08.png", alt: "" },
          { src: "/images/revise/clamp-sketch-model-template-09.png", alt: "" },
          { src: "/images/revise/clamp-sketch-model-template-10.png", alt: "" },
          { src: "/images/revise/clamp-sketch-model-template-11.png", alt: "" }
        ]} />
      <p>{`Now we knew that granular jamming was a promising road forward, it was time to add the clamping force action!`}</p>
      <h4>{`Mockup Review`}</h4>
      <p>{`As a team, we were still narrowing down ideas, and there were 4 to choose from, but I was settled on working with the ATC team since I found it to be a really fun idea. For this milestone, a teammate and I decided to modify one of the existing clamps we had purchased in a previous milestone. To create the pneumatic system this time, we used PVC pipes and caps. One side of the short PVC pipe had a barbed fitting (for the air tubing) screwed into a cap, and the other side of the PVC pipe was covered in fabric to prevent granules from being sucked into the tubes.`}</p>
      <img src="/images/revise/20211019_205602.jpg" alt="" />
      <p>{`The pouches, filled with coffee grounds (a common granular jamming granule), were secured onto the fabric side of the PVC pipe with rubber bands. Now that we had two of these pouch parts, we needed a way to secure it to the existing clamp.`}</p>
      <img src="/images/revise/52la96_as01.png" alt="" />
      <p>{`I was responsible for the moving jaw attachment mechanism (where the quick grip is). I took measurements and planned on CADing an adapter so the PVC tube could sit comfortably on the clamp. I thought of a sliding attachment but decided a press fit adapter would be best, i.e it would sit in the little recess on the clamp.`}</p>
      <ImageGrid images={[
          { src: "/images/revise/img_0430.jpg" },
          { src: "/images/revise/img_0431.jpg" },
          { src: "/images/revise/20211020_172307-e1661737783881.jpg" }
        ]} rowHeight={420} />
      <p>{`This is what my final CAD model of one side looked like, with slotted holes to secure the two sides together with nuts and bolts:`}</p>
      <ImageGrid images={[
          { src: "/images/revise/img_0435-e1661734366272.jpg" },
          { src: "/images/revise/img_0435-1-e1661734422207.jpg" }
        ]} cols={2} />
      <p>{`This was 3D printed (shown in the assembly in white) and press fitted into the clamp.`}</p>
      <img src="/images/revise/20211021_112055.jpg" alt="" />
      <p>{`The prototype, which we named Conform, finally took shape as shown below:`}</p>
      <img src="/images/revise/pinkb2-1.jpg" alt="" />
      <h4>{`Assembly + Tech Review`}</h4>
      <p>{`At this point, we decided that Conform the clamp was the idea we wanted to settle on, but after thorough discussion, moved forward with the granular jamming concept on a vise. I became more busy with user research and interviews. Here is a storyboard I drew, which shows how we expected the user to interact with our product:`}</p>
      <img src="/images/revise/storyboard.jpg" alt="" />
      <p>{`I worked on laser cutting a clear acrylic side paneling for the control box, aka the pneumatics and its housing. This involved taking measurements and translating this into an illustrator vector drawing. The acrylic side panel allowed us to see into the control box and troubleshoot any errors at this stage. I also assisted with general assembly of the control box internals, shown below, as well as some of the pnematic connections to the pouches. The next steps towards the final product would revolve around consolidating the control box and vise into one product.`}</p>
      <ImageSlideshow slides={[
          { src: "/images/revise/20211115_182924.jpg", alt: "" },
          { src: "/images/revise/vac.png", alt: "" },
          { src: "/images/revise/pink-3.jpg", alt: "" },
          { src: "/images/revise/pink-2.jpg", alt: "" }
        ]} />
      <h4>{`Final Product and Presentation`}</h4>
      <p>{`We only had one month to completely redesign ReVise with all the user and instructor feedback we received, so it was all hands on deck. The vise team did a great job with designing and water jetting the vise body. And the pouch team did great with getting the seals air-tight (and the pink granules were a nice touch). On the control box team, the name of the game was consolidating all the tubing and wiring into the back of the vise. I helped work on the assembly with a couple team members.`}</p>
      <ImageSlideshow slides={[
          { src: "/images/revise/20211205_150110.jpg", alt: "" },
          { src: "/images/revise/20211202_103700.jpg", alt: "" },
          { src: "/images/revise/20211206_115648.jpg", alt: "" },
          { src: "/images/revise/20211206_123443.jpg", alt: "" }
        ]} />
      <p>{`I also began working towards the final presentation, as I was one of the presenters. Many hours of rehearsals and slide design sessions later, here is the Pink Team final presentation! (begins at 0:54)`}</p>
      <VideoEmbed src="https://www.youtube.com/embed/pC6GqukR7W4?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" />
      <p>{`2.009 was an unforgettable experience, made possible by an incredible team and an amazing class staff! Here’s a goodbye from pink team 🙂`}</p>
      <figure className="my-8 flex justify-center not-prose">
        <img src="/images/revise/pinkteamwave.gif" alt="" className="max-w-full h-auto rounded" />
      </figure>
      </ProjectPage>
    );
  }
  