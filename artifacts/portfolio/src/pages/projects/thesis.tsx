import React from 'react';
import ProjectPage, { PdfEmbed } from '@/components/ProjectPage';

export default function Thesis() {
  return (
    <ProjectPage
      title="Impact of Introducing Technical Elements in Makerspace Trainings"
      subtitle="MIT Master's Thesis, 2025"
    >
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        Master's Thesis &amp; Best Student Paper at International Symposium of Academic Makerspaces (ISAM) 2025
      </p>

      <p>
        From September 2023 to January 2025, I was a grad student under Marty Culpepper at MIT. I worked on
        understanding barriers to student access to makerspaces and brainstorming solutions to this problem. I created
        the Design-Fabrication-Performance (DFP) matrix framework to characterize existing makerspace trainings and to
        design new ones for students to visually represent their learning, track progress, and fill knowledge gaps.
      </p>

      <p>
        An excerpt of my thesis was submitted to the International Symposium of Academic Makerspaces (ISAM) Conference
        for 2025 and it was accepted. I presented my work at the ISAM conference in Berkeley, CA, and won Best Student
        Paper. My thesis and ISAM paper are attached below.
      </p>

      <h4>Thesis</h4>
      <p>
        <a href="https://dspace.mit.edu/handle/1721.1/158817" target="_blank" rel="noopener noreferrer">
          https://dspace.mit.edu/handle/1721.1/158817
        </a>
      </p>
      {/* TODO: Layal — upload thesis.pdf to artifacts/portfolio/public/pdfs/ */}
      <PdfEmbed src="/pdfs/thesis.pdf" label="MIT Master's Thesis (PDF)" />

      <h4>ISAM Paper 2025 – Best Student Paper</h4>
      {/* TODO: Layal — upload isam-paper.pdf to artifacts/portfolio/public/pdfs/ */}
      <PdfEmbed src="/pdfs/isam-paper.pdf" label="ISAM 2025 Paper (PDF)" />

      <h4>ISAM Presentation</h4>
      <p>ISAM Presentation 2025.pptx</p>
    </ProjectPage>
  );
}
