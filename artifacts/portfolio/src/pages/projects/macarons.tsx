import React from 'react';
import ProjectPage, { PdfEmbed } from '@/components/ProjectPage';

export default function Macarons() {
  return (
    <ProjectPage
      title="Macaron Properties Research Project"
      subtitle="2.671 Measurement and Instrumentation, 2021"
    >
      <p>
        In Spring 2021, I took 2.671-Measurement and Instrumentation. In it, I proposed a research project and executed
        it over a semester. My research question was "how does the batter rest time affect the material properties of a
        macaron meringue?" To explore this question, I measured the macarons' change in area before and after baking,
        the shell height, puncture force (shell hardness), pullout force (chewiness), and moisture loss. Below is my
        final poster and paper.
      </p>

      <h4>Final Poster</h4>
      <img src="/images/macarons/tues_e3_barakat_layal-1.png" alt="2.671 final poster" />
      {/* TODO: Layal — upload macaron-poster.pdf to artifacts/portfolio/public/pdfs/ */}
      <PdfEmbed src="/pdfs/macaron-poster.pdf" label="2.671 Final Poster (PDF)" />

      <h4>Final Paper</h4>
      {/* TODO: Layal — upload macaron-paper.pdf to artifacts/portfolio/public/pdfs/ */}
      <PdfEmbed src="/pdfs/macaron-paper.pdf" label="2.671 Final Paper (PDF)" />
    </ProjectPage>
  );
}
