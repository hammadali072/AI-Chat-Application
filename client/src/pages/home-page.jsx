import { UploadSimpleIcon, ChatCircleDotsIcon } from '@phosphor-icons/react';

import Navbar from '../components/navbar/navbar';
import HeroSection from '../components/heroSection/heroSection';
import OptionCard from '../components/optionCard/optionCard';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 px-4 py-8 sm:py-12 flex flex-col justify-center">
        <div className="container">
          <div className="flex flex-col justify-center">
            <HeroSection />

            <div className="mt-8 mb-6 text-center">
              <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">Select Your Workspace</h2>
              <p className="mt-1 text-sm text-grey">Choose an option below to manage PDF documents or start querying AI.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <OptionCard
                icon={UploadSimpleIcon}
                title="Upload & Manage Documents"
                description="Upload PDF lecture notes or course materials to your library and prepare them for instant Q&A."
                badge="Step 1: Upload"
                to="/upload"
              />

              <OptionCard
                icon={ChatCircleDotsIcon}
                title="Ask AI Chatbot"
                description="Ask natural-language questions about your uploaded PDFs and receive accurate, instant answers."
                badge="Step 2: Ask AI"
                to="/chat"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
