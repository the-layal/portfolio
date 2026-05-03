import React from 'react';
import ProjectPage from '@/components/ProjectPage';

const ICON_GRID_IMAGES: { file: string; caption: string }[] = [
  { file: 'high-level-community.png',       caption: 'Community' },
  { file: 'high-level-community-2.png',     caption: 'Community (v2)' },
  { file: 'high-level-complexity.png',      caption: 'Complexity' },
  { file: 'high-level-complexity2.png',     caption: 'Complexity (v2)' },
  { file: 'high-level-ecological-2.png',    caption: 'Ecological (v2)' },
  { file: 'high-level-ethical.png',         caption: 'Ethical' },
  { file: 'high-level-time-saving-2.png',   caption: 'Time Saving (v2)' },
  { file: 'limits-autonomy.png',            caption: 'Autonomy' },
  { file: 'limits-autonomy2.png',           caption: 'Autonomy (v2)' },
  { file: 'limits-accountability2.png',     caption: 'Accountability (v2)' },
  { file: 'interaction-scalable-size.png',  caption: 'Scalable Size' },
  { file: 'security-and-privacy-safety.png', caption: 'Safety' },
  { file: 'social-dimensions-autonomous.png',  caption: 'Autonomous' },
  { file: 'social-dimensions-autonomous2.png', caption: 'Autonomous (v2)' },
  { file: 'space-device-migration.png',     caption: 'Device Migration' },
  { file: 'space-follow-around.png',        caption: 'Follow Around' },
];

function IconGrid() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        margin: '1.5rem 0',
        alignItems: 'flex-start',
      }}
    >
      {ICON_GRID_IMAGES.map(({ file, caption }) => (
        <div
          key={file}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            flex: '0 0 auto',
            width: 96,
          }}
        >
          <img
            src={`/images/social-robot/${file}`}
            alt=""
            style={{
              width: 96,
              height: 96,
              objectFit: 'contain',
              border: '1px solid var(--border)',
              borderRadius: 4,
              background: '#fff',
              padding: 4,
            }}
          />
          <span
            style={{
              fontSize: 10,
              textAlign: 'center',
              lineHeight: 1.3,
              color: 'var(--muted-foreground)',
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {caption}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SocialRobot() {
  return (
    <ProjectPage title="Social Robot Research Study" subtitle="MIT Media Lab, 2019">
      <p>{`I participated in the Undergraduate Research Opportunities Program (UROP) in the spring and summer of 2019. My UROP was in the Media Lab under the Personal Robotics group, and the research I worked on there focused on designing social robots for older adults.`}</p>
      <p>{`When it comes to technology for older adults, they are the voices usually left out of the conversation: new products are designed without very much input from them. My UROP supervisor aimed to change that with a long-term research study consisting of a number of interviews and an interactive design exercise. When I hopped onto the project, the design exercise was being developed.`}</p>
      <p>{`So what is a social robot? It is a robot that interacts with the user in a way that is more socially aware: it may lean in to indicate that it's listening to you, make eye contact, or convey facial expressions. The social robot that was used in the study was called Jibo, and it was developed by the Personal Robots Group.`}</p>
      <img src="/images/social-robot/fb5d188bee22f8a634469a17657f890d.png" alt="" style={{ maxWidth: '100%' }} />
      <h3>{`The Icons`}</h3>
      <p>{`One of the components of the design exercise required the formulation and use of icons representing different interactions with Jibo or possible features that could be implemented in the future. The main purpose of the icons was to provide the older adults a starting point to design their ideal social robots. The icons would represent the given word or idea, but the older adult would be left to define the icons as they so pleased.`}</p>
      <p>{`These icons would be classified into nine categories, and represent concepts as simple as "durability" and "time-saving", to concepts as complex as "accountability" and "autonomy".  I was given the task of coming up with preliminary sketches for these icons. After brainstorming on my own and consulting with my supervisor to generate ideas for the more complex topics, I resulted with two sheets of icons:`}</p>
      <img src="/images/social-robot/draft-icons-page-001-e1577690159976.jpg" alt="" style={{ maxWidth: '100%' }} />
      <img src="/images/social-robot/draft-icons-page-002-e1577687584598.jpg" alt="" style={{ maxWidth: '100%' }} />
      <p>{`After this, it was time to move onto computerizing everything with Adobe Illustrator. The following is a small selection of icons that were created:`}</p>
      <img src="/images/social-robot/space-multiple-devices.png" alt="" style={{ maxWidth: 200 }} />
      <p>{`Some icons had multiple iterations in the table, and we wanted to see what they would look like digitized before making a decision. Although there are many instances, here are just a few icon designs we had to decide between:`}</p>
      <p>{`Some of the choices had to be made between icons that were very different from each other. Some choices were between icons that only had minor differences. In the table above, each pair represents a possible choice, and the ones that were chosen to be used are the 2nd ones.`}</p>
      <IconGrid />
      <p>{`Even while choosing icons, without having the title, it was sometimes difficult to figure out what the icon was exactly representing, so to clarify, my UROP supervisor suggested I add titles. All titles were placed under the icon and all were capitalized so that the wording would be as clear as possible. Once we decided on each icon  and added titles, we made a reference sheet that would be used to guide the older adult through the design exercise since there were a lot to keep track of. Here are all the icons, in full:`}</p>
      <img src="/images/social-robot/reference-sheet-final-page-001-e1577690114427.jpg" alt="" style={{ maxWidth: '100%' }} />
      <h3>{`Remote Packets`}</h3>
      <p>{`The interactive design portion required the use of expensive HP Sprouts to complete, and they were quite heavy to transport. After travelling to some of the participants, my UROP supervisor decided to station the Sprouts in the Media Lab and have the participants come to us. Some of the participants could not come to the Media Lab and so we had to do figure out a way to do the exercise remotely. The main pieces to the exercise were a blank picture of a room, a jointed human figure, a Jibo figure, and the icons, the three of which would be placed "into" the room at the participant's discretion. The participants would also be able to draw in their room at the end if they chose to. This was all done previously using the screen on the HP Sprout, but if we wanted to make it remote (and also inexpensive), we'd have to rely on paper.`}</p>
      <p>{`My supervisor suggested printing the image of the room we were already using on gray card stock, and bought paint sticks in a number of colors for the mark making. What was left to figure out was the human figures, the Jibo figures, and the icons. How could we get those all to stick to the page?`}</p>
      <h5>{`Human and Jibo Figures`}</h5>
      <p>{`I took to investigating the figures we were working with already. With the Jibo figure that was being used, the image was double sided, so it could face either left or right. I took an image my supervisor sent me of two outlined Jibos facing away from each other and in Illustrator, I fit as many of these pairs as I could on a regular 8.5×11 inch sheet of paper. These were then printed on card stock, cut out, and then I glued opposite sides together.`}</p>
      <img src="/images/social-robot/20190716_113345-e1577845647848.jpg" alt="" style={{ maxWidth: '100%' }} />
      <p>{`The human figures were a bit more tricky because they were jointed. I thought back to paper figures I had made in elementary school art class with brass fasteners. I wanted to replicate that idea, and so I utilized the shape of the figures we were using and created outlines of them in Illustrator. Each human figure had one main upper body cutout, two upper and lower legs, two feet, and two upper and lower arms. These shapes were then laser cut onto card stock, and I assembled the figures individually.`}</p>
      <img src="/images/social-robot/20190710_091932.jpg" alt="" style={{ maxWidth: '100%' }} />
      <img src="/images/social-robot/20190710_092406.jpg" alt="" style={{ maxWidth: '100%' }} />
      <img src="/images/social-robot/20190710_102256-e1577847458769.jpg" alt="" style={{ maxWidth: '100%' }} />
      <p>{`The last thing that was needed to complete the remote packets was the icons. The idea was to print them onto sticker sheets to allow the older adults to place them into the room as they pleased. I used Adobe InDesign to create a grid of icons arranged in categorical order. Since each sticker sheet could hold 63 one-inch icon stickers, each set of icons were printed onto two sticker sheets. One sheet is shown below:`}</p>
      <img src="/images/social-robot/20190708_115141-e1577849387891.jpg" alt="" style={{ maxWidth: '100%' }} />
      <p>{`After prepping all the materials, the remote packets were collated and shipped to the participants who needed it. These new materials provided a new, accessible, and low-cost alternative to the HP Sprouts, and now the design exercise could be completed anywhere, and simultaneously in larger groups.`}</p>
    </ProjectPage>
  );
}
