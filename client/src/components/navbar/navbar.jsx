import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ListIcon, XIcon, FilePdfIcon, ChatCircleDotsIcon, UploadSimpleIcon } from '@phosphor-icons/react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Upload Documents', path: '/upload' },
    { label: 'AI Chatbot', path: '/chat' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Brand logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-gradient-to-b from-primary-start to-primary-end text-white shadow-sm">
            <FilePdfIcon size={20} weight="bold" />
          </div>
          <div className="leading-tight">
            <span className="text-base font-bold tracking-tight text-tint-black block">DocuMind</span>
          </div>
        </Link>

        {/* Action CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/upload"
            className="inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium text-tint-black duration-150 hover:bg-tint-gray"
          >
            <UploadSimpleIcon size={16} weight="bold" />
            <span>Upload</span>
          </Link>
          <Link
            to="/chat"
            className="btn-gradient inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium duration-150"
          >
            <ChatCircleDotsIcon size={16} weight="bold" />
            <span>Ask AI</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="flex size-10 items-center justify-center rounded-lg text-tint-black hover:bg-tint-gray md:hidden"
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
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'rounded-lg px-3 py-2 text-left text-sm font-medium',
                  location.pathname === item.path
                    ? 'bg-tint-gray text-primary font-semibold'
                    : 'text-tint-black hover:bg-tint-gray/50'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/upload"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-gradient mt-2 w-full rounded-lg py-2.5 text-center text-sm font-medium block"
            >
              Upload Document
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
