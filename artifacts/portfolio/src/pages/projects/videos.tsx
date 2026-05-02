import React from 'react';
import ProjectPage, { VideoEmbed } from '@/components/ProjectPage';

  export default function Videos() {
    return (
      <ProjectPage title="Video Projects" subtitle="Assorted Creations, 2016–2019">
        <h3>{`Solum`}</h3>
      <p>{`I’ve loved making little photo recaps and home videos ever since I was young. I began with simple  editing programs, from Windows Live Movie Maker to iMovie. In 2016, I made my first short film for the regional Muslim Interscholastic Tournament (MIST), and it was the first time I planned out the course of a video project. In other words, it was the first piece I directed, recorded, edited, and produced for the eyes of outside viewers. The original film did not exactly age well, given it was shot and edited on an iPad mini, and that the main actors were members of my family. But we still got 3rd place in MIST Florida that year. However, there was one judge, a professional filmmaker and film critic, who was not impressed. Regardless of what happened in the next year, I knew I had to dazzle him.`}</p>
      <p>{`And so in 2017, my team became larger, the quality, just a little bit higher. I settled for directing and editing this time. I had my friends writing the script, shooting the shots, and finding quick solutions to any problems we ran into on ‘set’. I could go into many details about the little secrets, bloopers, and thought processes that came about from the making of the short film, but they are just far too many. I look back and watch it now, and though I can see every mistake we made along the way, I am very proud of the feat we accomplished together. And the filmmaker judge who was so critical the last time we convened ended up being the one that appreciated it the most.`}</p>
      <p>{`I present to you, the 3rd place MIST Nationals 2017 Short Film winner, Solum.`}</p>
      <VideoEmbed src="https://www.youtube.com/embed/aNxTY2LvrnQ?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" />
      <h3>{`MIST Hype Videos`}</h3>
      <p>{`The following videos were made for MIST 2018, the first, to hype my school up for the year’s regional tournament, and the second to recap what a successful time we had there. I edited both in about a day each (the first taking a shorter time comparatively).`}</p>
      <h4>{`Pre-MIST Hype Video`}</h4>
      <VideoEmbed src="https://www.youtube.com/embed/_dHocyyfpD8?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" />
      <h4>{`Post-MIST Rewind Video`}</h4>
      <VideoEmbed src="https://www.youtube.com/embed/QSeCCYNy0gU?version=3&rel=1&showsearch=0&showinfo=1&iv_load_policy=1&fs=1&hl=en&autohide=2&wmode=transparent" />
      </ProjectPage>
    );
  }
  