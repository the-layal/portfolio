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
          View on MIT DSpace →
        </a>
      </p>
      <PdfEmbed src="/pdfs/thesis.pdf" label="MIT Master's Thesis (PDF)" />

      <div className="mt-16" />
      <h4>ISAM Paper 2025 – Best Student Paper</h4>
      <PdfEmbed src="/pdfs/isam-paper.pdf" label="ISAM 2025 Paper (PDF)" />

      <div className="mt-16" />
      <h4>ISAM Presentation</h4>
      <div className="my-8 border border-border bg-card relative left-1/2 -translate-x-1/2 w-[min(calc(100vw-2rem),760px)]">
        <iframe
          src={ISAM_PRESENTATION_EMBED_URL}
          title="ISAM 2025 Presentation"
          width="100%"
          style={{ height: 'calc(min(calc(100vw - 2rem), 760px) * 9 / 16 + 90px)' }}
          allowFullScreen
          className="block"
        />
      </div>
      <p>
        <a
          href={ISAM_PRESENTATION_SHARE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open ISAM Presentation 2025 in a new tab
        </a>
      </p>
    </ProjectPage>
  );
}

const ISAM_PRESENTATION_SHARE_URL =
  'https://1drv.ms/p/c/dc3e1f3406ddb9e6/IQTiiE6xVgDMRbQLMDvktFxFATAeReQTriBW03KzlQnt_EM';

const ISAM_PRESENTATION_EMBED_URL =
  'https://onedrive.live.com/embed?cid=dc3e1f3406ddb9e6&resid=DC3E1F3406DDB9E6%21sb14e88e2005645ccb40b303be4b45c45&ithint=file%2Cpptx&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3AvYy9kYzNlMWYzNDA2ZGRiOWU2L0lRVGlpRTZ4VmdETVJiUUxNRHZrdEZ4RkFUQWVSZVFUcmlCVzAzS3psUW50X0VN&em=2';
