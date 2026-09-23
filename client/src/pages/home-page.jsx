import Navbar from '../components/navbar/navbar';
import HeroSection from '../components/heroSection/heroSection';
import OptionCard from '../components/optionCard/optionCard';
import { UploadSimpleIcon, ChatCircleDotsIcon } from '@phosphor-icons/react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-tint-gray flex flex-col">

      {/* Top Header Navigation */}
      <Navbar />

      {/* Main Screen Content */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 flex flex-col justify-center">

        {/* Hero Section */}
        <HeroSection />

        {/* Section Heading for Options */}
        <div className="mt-8 mb-6 text-center">
          <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
            Select Your Workspace
          </h2>
          <p className="mt-1 text-sm text-grey">
            Choose an option below to manage PDF documents or start querying AI.
          </p>
        </div>

        {/* Two Main Option Cards navigating to dedicated pages */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto w-full">
          <OptionCard
            icon={UploadSimpleIcon}
            title="Upload & Manage Documents"
            description="Upload PDF lecture notes or course materials. The system parses raw text page-by-page and splits content into indexed chunks in MongoDB."
            badge="Step 1: Upload"
            to="/upload"
          />

          <OptionCard
            icon={ChatCircleDotsIcon}
            title="Ask AI Chatbot"
            description="Interactively ask natural-language questions. The system scores chunks by keyword relevance and grounds OpenRouter AI responses in your PDF."
            badge="Step 2: Query AI"
            to="/chat"
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
