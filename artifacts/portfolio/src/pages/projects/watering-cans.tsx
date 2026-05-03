import React from 'react';
import ProjectPage, { LightboxImage } from '@/components/ProjectPage';

export default function WateringCans() {
  return (
    <ProjectPage title="'The Watering Cans' Graphic Design" subtitle="MIST, 2018">
      <p>{`This project is the first time I used Adobe Illustrator. The following images show the process I used to make the piece below for the Muslim Interscholastic Tournament (MIST) in 2018. The theme for that year was 'The Valor of Mercy', and this piece was for their graphic design competition.`}</p>
      <LightboxImage src="/images/watering-cans/main-pic.png" alt="The Watering Cans final piece" />
      <LightboxImage src="/images/watering-cans/aye.gif" alt="Animated illustration progress" />
      <LightboxImage src="/images/watering-cans/annotation-2019-12-26-160216-1.png" alt="" />
      <LightboxImage src="/images/watering-cans/annotation-2019-12-26-155814-2-4-e1577395306878.png" alt="" />
    </ProjectPage>
  );
}
