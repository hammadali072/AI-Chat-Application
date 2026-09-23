import { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import ChatWindow from '../components/chatWindow/chatWindow';
import { FilePdfIcon, MagnifyingGlassIcon, SparkleIcon, LightbulbIcon } from '@phosphor-icons/react';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    variant: 'ai',
    content: "Hello! I am your AI Document Assistant. I have indexed your uploaded PDF course materials. Ask me any question, and I will perform keyword search across text chunks to ground my response.",
    timestamp: '11:32 AM',
  },
  {
    id: 'msg-2',
    variant: 'user',
    content: 'What are the core concepts covered in Machine Learning Lecture 4?',
    timestamp: '11:33 AM',
  },
  {
    id: 'msg-3',
    variant: 'ai',
    content: 'Based on Lecture_04_Machine_Learning.pdf, the core concepts cover supervised learning metrics: Precision, Recall, F1-Score, and ROC-AUC curve analysis.',
    timestamp: '11:33 AM',
    matchedChunksInfo: 'Grounded in 3 PDF chunks (Pages 4, 7 & 12)',
  },
];

const SUGGESTED_QUESTIONS = [
  'Summarize the key points of Lecture 4',
  'What is the definition of B-Tree indexing in Chapter 3?',
  'List the main algorithms mentioned in the document',
];

const ChatPage = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (textToSend) => {
    const questionText = textToSend || inputValue;
    if (!questionText.trim()) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      variant: 'user',
      content: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Simulate backend flow:
    // 1. Keyword search over MongoDB document chunks
    // 2. OpenRouter API response generation
    setTimeout(() => {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          variant: 'ai',
          content: `Here is what I found regarding "${questionText}": The document content emphasizes structured chunk retrieval, keyword scoring, and strict contextual grounding.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          matchedChunksInfo: 'Grounded in 4 PDF text chunks (Pages 2, 5 & 9)',
        },
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-tint-gray flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">

        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl flex items-center gap-2">
              <span>AI Document Chatbot</span>
              <SparkleIcon size={22} weight="fill" className="text-primary" />
            </h1>
            <p className="mt-1 text-sm text-grey">
              Ask natural-language questions grounded in your uploaded PDF text chunks via OpenRouter AI.
            </p>
          </div>

          {/* Document Scope Badge */}
          <div className="flex items-center gap-2 self-start sm:self-center rounded-xl bg-white px-3.5 py-2 border border-black/5 shadow-sm text-xs select-none">
            <FilePdfIcon size={18} weight="fill" className="text-primary" />
            <div>
              <span className="font-bold text-tint-black block">2 PDFs Indexed</span>
              <span className="text-[10px] text-grey block">70 MongoDB Chunks</span>
            </div>
          </div>
        </div>

        {/* Chat Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar Info & Suggested Questions */}
          <div className="lg:col-span-1 flex flex-col gap-4">

            {/* Grounding Engine Card */}
            <div className="card-inset rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-wider mb-2">
                <MagnifyingGlassIcon size={16} weight="bold" className="text-primary" />
                <span>Keyword Retrieval</span>
              </div>
              <p className="text-xs text-grey leading-relaxed">
                Stopwords are stripped from your query, top matching text chunks are retrieved from MongoDB, and passed to OpenRouter AI for exact answer grounding.
              </p>
            </div>

            {/* Suggested Prompts */}
            <div className="card-inset rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-wider mb-3">
                <LightbulbIcon size={16} weight="bold" className="text-amber-500" />
                <span>Suggested Questions</span>
              </div>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="text-left text-xs p-2.5 rounded-xl bg-tint-gray/70 text-tint-black hover:bg-primary/10 hover:text-primary duration-150 font-medium"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <ChatWindow
              messages={messages}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSendMessage={() => handleSendMessage()}
              isLoading={isLoading}
              isInputDisabled={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
