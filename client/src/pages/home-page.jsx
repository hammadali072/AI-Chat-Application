import { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import HeroSection from '../components/heroSection/heroSection';
import OptionCard from '../components/optionCard/optionCard';
import UploadSection from '../components/uploadSection/uploadSection';
import ChatWindow from '../components/chatWindow/chatWindow';
import { UploadSimpleIcon, LightningIcon } from '@phosphor-icons/react';

const DEMO_MESSAGES = [
  {
    id: 'demo-1',
    variant: 'ai',
    content: "Welcome to the interactive demo! I've pre-loaded a sample document: 'AI_Architecture_Overview.pdf'. Feel free to ask any question.",
    timestamp: '10:00 AM',
  },
  {
    id: 'demo-2',
    variant: 'user',
    content: 'What are the main components of this architecture?',
    timestamp: '10:01 AM',
  },
  {
    id: 'demo-3',
    variant: 'ai',
    content: 'The document details three primary layers: 1) Client React interface, 2) Node/Express backend vector retrieval engine, and 3) LLM integration layer for contextual Q&A response generation.',
    timestamp: '10:01 AM',
  },
];

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('upload'); // 'upload' | 'demo'
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [fileName, setFileName] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option === 'demo') {
      setUploadStatus('success');
      setFileName('AI_Architecture_Overview.pdf');
      setChatMessages(DEMO_MESSAGES);
    } else if (option === 'upload' && fileName !== 'AI_Architecture_Overview.pdf') {
      // Keep existing uploaded file if any
    }
  };

  const handleFileSelect = (file) => {
    setFileName(file.name);
    setUploadStatus('uploading');

    // Simulate upload delay
    setTimeout(() => {
      setUploadStatus('success');
      setChatMessages([
        {
          id: Date.now().toString(),
          variant: 'ai',
          content: `Successfully analyzed "${file.name}". Ask me anything about this document!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleRemoveFile = () => {
    setFileName('');
    setUploadStatus('idle');
    setChatMessages([]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      variant: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false);
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          variant: 'ai',
          content: `Based on your document "${fileName || 'PDF'}", here is the answer: The requested section discusses optimization, component modularity, and clean architectural design.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-tint-gray flex flex-col font-sans">
      
      {/* Top Header Navigation */}
      <Navbar activeTab={selectedOption} onSelectTab={handleSelectOption} />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        
        {/* Hero Section */}
        <HeroSection onSelectOption={handleSelectOption} />

        {/* Section Heading for Options */}
        <div className="mt-10 mb-6 text-center">
          <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
            Choose How You Want to Begin
          </h2>
          <p className="mt-1 text-sm text-grey">
            Select one of the two options below to start interacting with your documents.
          </p>
        </div>

        {/* Two Main Option Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-3xl mx-auto mb-10">
          <OptionCard
            icon={UploadSimpleIcon}
            title="Option 1: Upload Your PDF"
            description="Select a PDF file from your device to extract content, ask custom questions, and get instant answers."
            badge="Recommended"
            isActive={selectedOption === 'upload'}
            onClick={() => handleSelectOption('upload')}
          />

          <OptionCard
            icon={LightningIcon}
            title="Option 2: Try Demo Document"
            description="Instantly explore pre-loaded sample documents with pre-generated Q&amp;A to preview AI capabilities."
            badge="Instant Preview"
            isActive={selectedOption === 'demo'}
            onClick={() => handleSelectOption('demo')}
          />
        </div>

        {/* Active Workspace View */}
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          
          {/* Upload Section (Always visible when in upload mode or for managing current file) */}
          <UploadSection
            uploadStatus={uploadStatus}
            fileName={fileName}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
          />

          {/* Interactive Chat Window */}
          <ChatWindow
            messages={chatMessages}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            isInputDisabled={uploadStatus !== 'success'}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
