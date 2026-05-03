import React from 'react';
import ProjectPage from '@/components/ProjectPage';
import ImageSlideshow from '@/components/ImageSlideshow';

  export default function BrushlessMotor() {
    return (
      <ProjectPage title="Brushless Motor" subtitle="6.a01 Mens et Manus, 2018">
        <p>{`In my freshman fall, I had no idea what I was doing. I chose to do a freshman seminar when presented with the opportunity and stumbled upon 6.a01 Mens et Manus, which promised the completion of two projects by the end of the semester embodying the MIT motto, meaning 'Mind and Hand'.  This is the account of the first project: a brushless motor.`}</p>
      <p>{`This what it looked like fully assembled, but there were a number of steps I had to take to get there.`}</p>
      <img src="/images/brushless-motor/20181022_144009.jpg" alt="" />
      <h3>{`Fusion 360`}</h3>
      <p>{`I began this endeavor facing my first encounter with Fusion 360. I had to account for a few things, including the position of the rotor with respect to the other components, the position and number of electromagnets (of which would just be bolts inside bobbins wrapped with copper wire), the placement of the hall effect sensors (which would affect the magnetic field reading from the rotor), and the diameters of all the needed holes. After many hours of trying to not overconstrain my sketches, I resulted with the following designs that I would end up laser cutting to prepare the motor for assembly:`}</p>
      <ImageSlideshow slides={[
          { src: "/images/brushless-motor/brushless-motor-page-001-e1577658031157.jpg", alt: "" },
          { src: "/images/brushless-motor/brushless-motor-page-002-e1577658038764.jpg", alt: "" },
          { src: "/images/brushless-motor/brushless-motor-page-004-e1577658042428.jpg", alt: "" },
          { src: "/images/brushless-motor/brushless-motor-page-003-e1577658045388.jpg", alt: "" },
          { src: "/images/brushless-motor/brushless-motor-page-005-e1577658050958.jpg", alt: "" }
        ]} />
      <p>{`There are a few notable things to point out. The baseplate's four rectangular cutouts would be for the four electromagnets. The baseplate also has a large hole in the center where the rotor would be, placed in an almost "hovering" position. The shaft would be attached to the bottom plate to achieve this effect. The bottom plate has 6 small holes, 3 for each of the hall effect sensors I was going to place. The idea was that the hall effect sensors would be coming out from the bottom plate and reside in the gap between the rotor and the outer radius of the baseplate.`}</p>
      <h3>{`Assembly`}</h3>
      <h4>{`Electromagnets`}</h4>
      <img src="/images/brushless-motor/20181020_155850-e1577671880810.jpg" alt="" />
      <p>{`To make the four electromagnets, I wrapped four bobbins with copper wire, and put a bolt through each one and secured it with a nut. To secure it to the baseplate, I added a larger nut. In the original design, I intended for the nut to be the only element securing the electromagnets, but the bolt ended up fitting quite snugly into the little slot it resided in, adding an extra layer of strength.`}</p>
      <h4>{`Making Connections`}</h4>
      <img src="/images/brushless-motor/20181022_144014-e1577672753726.jpg" alt="" />
      <p>{`After attaching the bottom plate to the shaft and rotor, and attaching that to the main baseplate, I soldered the Teensy microcontroller, H-bridge, and USB Micro-B Breakout Board (for power) to the pin headers (the long, vertical metal pins coming from the Teensy board in the image above) to prepare for wire wrapping.`}</p>
      <p>{`Using a wire wrap diagram provided by the class instructor, I wire wrapped the necessary connections between the microcontroller, hall effect sensors, electromagnets, H-bridge, and power board. In the beginning, a lot of the wire would snap in the middle of wrapping, but once I got used to the wire-wrap tool, it happened less often. I had to be especially careful while wrapping wire on the legs of the hall effect sensors, because they were very thin and prone to snapping. I also color coded some of the wires to alleviate the visual clutter given the number of connections that needed to be made.`}</p>
      <img src="/images/brushless-motor/20181022_144002-1.jpg" alt="" />
      <p>{`Once the electromagnets were wrapped, that was it for the physical assembly. What remained was the programming to utilize the hall effect sensor readings to turn on and off the opposing electromagnets to generate movement by the rotor. Below is a short gallery documenting the assembly process:`}</p>
      <ImageSlideshow slides={[
          { src: "/images/brushless-motor/20181020_155805-e1577677806828.jpg", alt: "" },
          { src: "/images/brushless-motor/20181022_144009.jpg", alt: "" },
          { src: "/images/brushless-motor/20181022_144002-1.jpg", alt: "" }
        ]} />
      </ProjectPage>
    );
  }
