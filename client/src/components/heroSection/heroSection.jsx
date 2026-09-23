import { Link } from 'react-router-dom';
import { UploadSimpleIcon, ChatCircleDotsIcon } from '@phosphor-icons/react';

const HeroSection = () => {
  return (
    <section className="py-8 text-center sm:py-12">
      <div className="mx-auto max-w-3xl px-4">

        {/* Project Tagline Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
          <span>AI-Powered Document Intelligence</span>
        </div>

        {/* Main Project Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-5xl md:text-6xl">
          AI PDF Question &amp; Answering System
        </h1>

        {/* Subtitle explaining the system */}
        <p className="mt-4 text-base font-normal leading-relaxed text-grey sm:text-lg">
          Upload course materials, lecture notes, or research documents, and receive instant AI answers grounded directly in your PDF content.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            to="/upload"
            className="btn-gradient inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold duration-150"
          >
            <UploadSimpleIcon size={18} weight="bold" />
            <span>Upload Document</span>
          </Link>

          <Link
            to="/chat"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-tint-black duration-150 hover:bg-tint-gray"
          >
            <ChatCircleDotsIcon size={18} weight="bold" />
            <span>Open AI Chat</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
