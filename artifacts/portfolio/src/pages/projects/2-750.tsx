import React from 'react';
import ProjectPage, { VideoEmbed } from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';
import ImageGrid from '@/components/ImageGrid';

  export default function MedicalDevice() {
    return (
      <ProjectPage title="Infant Abdomen Benchtop Model" subtitle="2.750 Medical Device Design, 2022">
        <ImageGrid images={[
          { src: "/images/2-750/vessels-with-blood-4063750325-e1689157690888.jpeg" },
          { src: "/images/2-750/img_6369.jpg" }
        ]} cols={2} />
      <p>{`In Spring 2022, I took a medical device design class, where my team and I worked with a pediatric cardiologist to design an infant abdomen benchtop model. This model was created to help validate the use of near infrared spectroscopy (NIRS) as a noninvasive diagnostic method to monitor infants for necrotizing enterocolitis (NEC). NEC is a life-threataning condition caused by insufficient oxygenation to intestinal tissue. NIRS is essentially a more advanced pulse oximeter, which is typically used to monitor the oxygenation of adult brains. It is already used on infant abdomens to attempt and detect low oxygenation, but the readings are not well understood. With our model, we concluded that the NIRS device could detect changes in blood flow rate and oxygenation (changes in how red or blue the blood mimic was), but further development is needed to characterize the complex features of infant abdominal vasculature.`}</p>
      <h4>{`Designing the Benchtop Model`}</h4>
      <h6>{`Abdominal Anatomy`}</h6>
      <p>{`We 3D printed a real life model of the superior mesenteric artery in a flexible silicone material, and overlaid a second print to mimic the way the superior mesenteric artery and vein overlap in the abdomen. We placed these two inside a black laser cut box so that we could later fill the box with silicone to mimic surrounding tissue.`}</p>
      <ImageGrid images={[
          { src: "/images/2-750/vasculargif.gif" },
          { src: "/images/2-750/superior_mesenteric_a.gif" },
          { src: "/images/2-750/img_2361.jpeg" }
        ]} cols={3} objectFit="contain" />
      <h6>{`Blood Flow System`}</h6>
      <img src="/images/2-750/final-presentation-2.75-babies-1-3215712255-e1689160894491.png" alt="" />
      <p>{`I was responsible for designing the flow system. Based on the size of the vascular 3D print, I created a list of compatible pneumatic parts available on McMaster. For ease of prototyping, I chose push-to-connect fittings.`}</p>
      <p>{`To mimic the variable oxygenation of blood, we used two reservoirs each for the “artery” and “vein” flow paths, red, for oxygenated blood, and blue, for deoxygenated blood. In the final iteration, opening and closing the valves provided the system with “fully oxygenated”, “fully deoxygenated”, and “half oxygenated” blood. This varation could test how well the NIRS responded to changes in the optical properties of the blood mimic. Water reservoirs were also included for easy flushing of the system. Our model was open loop, but future iterations could consider closed loop systems to minimize the amount of air introduced into the flow loop.`}</p>
      <VideoEmbed src="https://www.youtube.com/embed/TB8M8uHoAXs?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" />
      </ProjectPage>
    );
  }
  