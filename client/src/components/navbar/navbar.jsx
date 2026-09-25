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
      <div className="container">
        <div className="flex items-center justify-between px-2 sm:px-6 py-4">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-gradient-to-b from-primary-start to-primary-end text-white shadow-sm">
              <FilePdfIcon size={20} weight="bold" />
            </div>
            <div className="leading-tight">
              <span className="text-base font-bold tracking-tight text-tint-black block">DocuMind</span>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/upload"
              className="inline-flex items-center gap-1.5 rounded-md border border-black/10 px-3.5 py-2 text-sm font-medium text-tint-black duration-150 hover:bg-tint-gray"
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

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex size-10 items-center justify-center rounded-lg text-tint-black hover:bg-tint-gray md:hidden"
          >
            <ListIcon size={22} weight="bold" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-black/5 bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/upload"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex justify-center items-center gap-1.5 rounded-md border border-black/10 px-3.5 py-2 text-sm font-medium text-tint-black duration-150 hover:bg-tint-gray"
              >
                <UploadSimpleIcon size={16} weight="bold" />
                <span>Upload</span>
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-gradient flex justify-center items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium duration-150"
              >
                <ChatCircleDotsIcon size={16} weight="bold" />
                <span>Ask AI</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
