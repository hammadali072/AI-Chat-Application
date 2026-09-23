import { useState } from 'react';
import clsx from 'clsx';
import { ListIcon, XIcon, FilePdfIcon } from '@phosphor-icons/react';

const Navbar = ({ activeTab, onSelectTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand logo */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-b from-primary-start to-primary-end text-white shadow-sm">
            <FilePdfIcon size={20} weight="bold" />
          </div>
          <span className="text-lg font-bold tracking-tight text-tint-black">DocuMind</span>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={() => onSelectTab?.('upload')}
            className={clsx(
              'rounded-lg px-4 py-2 text-sm font-medium duration-150',
              activeTab === 'upload'
                ? 'bg-tint-gray text-primary font-semibold'
                : 'text-grey hover:bg-tint-gray/60 hover:text-tint-black'
            )}
          >
            Upload PDF
          </button>
          <button
            type="button"
            onClick={() => onSelectTab?.('demo')}
            className={clsx(
              'rounded-lg px-4 py-2 text-sm font-medium duration-150',
              activeTab === 'demo'
                ? 'bg-tint-gray text-primary font-semibold'
                : 'text-grey hover:bg-tint-gray/60 hover:text-tint-black'
            )}
          >
            Try Demo
          </button>
          <a
            href="#my-documents"
            className="rounded-lg px-4 py-2 text-sm font-medium text-grey duration-150 hover:bg-tint-gray/60 hover:text-tint-black"
          >
            My Documents
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-medium text-tint-black duration-150 hover:bg-tint-gray"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => onSelectTab?.('upload')}
            className="btn-gradient rounded-xl px-4 py-2 text-sm font-medium duration-150"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="flex size-10 items-center justify-center rounded-xl text-tint-black hover:bg-tint-gray md:hidden"
        >
          <ListIcon size={22} weight="bold" />
        </button>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="border-b border-black/5 bg-white px-4 py-4 md:hidden">
          <div className="flex items-center justify-between pb-3">
            <span className="text-sm font-semibold text-grey">Navigation</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex size-8 items-center justify-center rounded-lg text-grey hover:bg-tint-gray"
            >
              <XIcon size={18} weight="bold" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onSelectTab?.('upload');
                setIsMobileMenuOpen(false);
              }}
              className={clsx(
                'rounded-lg px-3 py-2 text-left text-sm font-medium',
                activeTab === 'upload' ? 'bg-tint-gray text-primary font-semibold' : 'text-tint-black'
              )}
            >
              Upload PDF
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTab?.('demo');
                setIsMobileMenuOpen(false);
              }}
              className={clsx(
                'rounded-lg px-3 py-2 text-left text-sm font-medium',
                activeTab === 'demo' ? 'bg-tint-gray text-primary font-semibold' : 'text-tint-black'
              )}
            >
              Try Demo
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTab?.('upload');
                setIsMobileMenuOpen(false);
              }}
              className="btn-gradient mt-2 w-full rounded-xl py-2.5 text-center text-sm font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
