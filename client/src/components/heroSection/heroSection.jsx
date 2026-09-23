import { UploadSimpleIcon, ArrowRightIcon } from '@phosphor-icons/react';

const HeroSection = ({ onSelectOption }) => {
  return (
    <section className="py-8 text-center sm:py-12">
      <div className="mx-auto max-w-3xl px-4">
        
        {/* Main Heading with clear visual hierarchy */}
        <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-5xl md:text-6xl">
          Unleash the Power of Your PDFs
        </h1>

        {/* Subtitle with proper muted typography */}
        <p className="mt-4 text-base font-normal leading-relaxed text-grey sm:text-lg">
          Effortless document analysis, intelligent Q&amp;A, and instant insights — all in one place.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={() => onSelectOption('upload')}
            className="btn-gradient inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold duration-150"
          >
            <UploadSimpleIcon size={18} weight="bold" />
            <span>Upload PDF</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectOption('demo')}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-tint-black duration-150 hover:bg-tint-gray"
          >
            <span>Try Demo</span>
            <ArrowRightIcon size={16} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
