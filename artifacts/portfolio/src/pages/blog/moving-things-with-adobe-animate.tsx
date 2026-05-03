import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

function Figure({ src, alt, caption, width }: { src: string; alt?: string; caption?: string; width?: string }) {
  return (
    <figure className="my-8 flex flex-col items-center">
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        className="rounded"
        style={{ maxWidth: width || '100%', width: '100%', height: 'auto' }}
      />
      {caption && (
        <figcaption className="mt-3 text-center text-base text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function MovingThingsWithAdobeAnimate() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full py-12 md:py-16 max-w-4xl mx-auto"
    >
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors mb-10"
        data-testid="link-back-blog"
      >
        <span>←</span> Back to Blog
      </Link>

      <header className="mb-12">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-4">March 25, 2020</p>
        <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight">Moving Things With Adobe Animate!</h1>
        <div className="mt-6 h-px w-24 bg-accent" />
      </header>

      <div className="prose prose-lg prose-neutral max-w-none prose-p:font-sans prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <p>
          I was editing my portfolio when I came upon the idea of using GIFs on my homepage for some
          of my projects. I already had a GIF for my{' '}
          <a href="http://layal.info/4.02A/" target="_blank" rel="noreferrer noopener">4.02A work</a>,
          and so I figured to keep the symmetry, I could try my hand at animating my{' '}
          <a href="http://layal.info/the-watering-cans/" target="_blank" rel="noreferrer noopener">Watering Cans</a>{' '}
          graphic design piece. I had never used Adobe Animate before, and so I sought YouTube to
          figure out how to turn my static Illustrator File into a moving photo.
        </p>

        <p>I looked to the tutorial videos made by Adobe, and my first try at Animate resulted in this bouncing ball:</p>

        <Figure
          src="/images/blog-post-adobe-animate/ballbounce.gif"
          caption="My first successful animation!"
          width="357px"
        />

        <p>
          Something that made this process easier was that I was able to reverse the motion once I
          animated the ball moving down. I was surprised at how quickly I was able to create this,
          and so I felt confident that I could apply the same frame-by-frame technique to my design.
          Below are markings indicating how I imagined the motion would go:
        </p>

        <Figure
          src="/images/blog-post-adobe-animate/comments.jpg"
          caption="The planned areas of animation."
        />

        <p>
          I began to add keyframes and shift the shapes I wanted slowly, so I could try to have a
          fluid motion. After a few minutes, I began to realize that frame-by-frame animation was
          maybe not the way to go. This is what happened:
        </p>

        <Figure
          src="/images/blog-post-adobe-animate/try1-2.gif"
          caption="A little too jittery."
        />

        <p>
          Ignoring the random jittery motion of the watering can, the arm moves generally fine,
          although the movement is choppy. I had initially looked up a video to explain how to import
          an Illustrator file into Animate, and the video was generally about animating an
          infographic. I clicked the next two videos in the series (
          <a
            href="https://www.youtube.com/watch?v=ZN-XNkem1yg&feature=emb_rel_end"
            target="_blank"
            rel="noreferrer noopener"
          >tweening</a>
          {' '}and{' '}
          <a
            href="https://www.youtube.com/watch?v=r2dmTxXSfxQ"
            target="_blank"
            rel="noreferrer noopener"
          >rotation</a>
          ) and was introduced to motion tweening. Essentially, I can pick an object, designate the
          start and end positions (and possibly apply some rotation) and the object would then move
          from start until it got to end.
        </p>

        <Figure
          src="/images/blog-post-adobe-animate/tweening-1.gif"
          caption="Tweened circle, once to the right and once to the left."
          width="693px"
        />

        <p>
          Using motion tweening, I treated the arms, hands, and watering cans as separate objects
          and applied various forms of motion and slight rotations until I got something that was
          animated in one way:
        </p>

        <Figure
          src="/images/blog-post-adobe-animate/crop-greedy-1.gif"
          caption="Smooth movements!"
          width="346px"
        />

        <p>
          Now since I wanted it to look like the water was flowing, I needed to create a layer above
          the water that created the notion of a flow. For this, I used a mask. By animating a
          rectangular mask, I could move it across the water for the effect I was looking for:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8 items-center">
          <Figure src="/images/blog-post-adobe-animate/mask.png" />
          <Figure src="/images/blog-post-adobe-animate/mask2.gif" width="382px" />
        </div>

        <p>
          By adding a solid water object behind it (especially since there is a gradient), it will
          show that there is water “flowing” from the can. The last thing to do was to copy, paste,
          and reverse the animation I just made so that there is a continuous loop. The final
          animation looks like this:
        </p>

        <Figure
          src="/images/blog-post-adobe-animate/aye.gif"
          caption="A final animation!!"
        />

        <p>
          Since the original drawing contains a water droplet from the vine hitting the tiny plant
          on the ground, that is the next thing I would try to animate. For today, I am satisfied.
          I found it tricky to create shapes (especially smaller ones) in Animate, so I may just
          create shapes in Illustrator and import them to be animated.
        </p>

        <p>
          This small experiment was really fun, and I am very pleased with the results. I can’t
          wait to learn more about animation and see where I can use it in future projects!
        </p>
      </div>
    </motion.article>
  );
}
