import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import ChatWindow from '../components/chatWindow/chatWindow';
import { askQuestion, getAllDocuments } from '../services/documentServices';

const ChatPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const docParam = searchParams.get('doc');

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await getAllDocuments();
        if (res && res.documents) {
          setDocuments(res.documents);
        }
      } catch (err) {
        console.error('Failed to load documents:', err);
      }
    };
    fetchDocs();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSelectDocument = (docId) => {
    if (docId === 'all') {
      searchParams.delete('doc');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ doc: docId });
    }
  };

  const handleSendMessage = async (customText) => {
    const questionText = typeof customText === 'string' ? customText : inputValue;
    if (!questionText.trim()) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      variant: 'user',
      content: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const thinkingMsg = {
      id: 'thinking',
      variant: 'thinking',
    };

    setMessages((prev) => [...prev, userMsg, thinkingMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await askQuestion(userMsg.content, docParam);

      const aiMsg = {
        id: `ai-${Date.now()}`,
        variant: 'ai',
        content: res.answer || 'No answer generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => prev.map((msg) => (msg.id === 'thinking' ? aiMsg : msg)));
    } catch (error) {
      console.error('Failed to get answer:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          variant: 'error',
          content: error.message || 'Something went wrong while getting the answer.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setMessages((prev) => prev.map((msg) => (msg.id === 'thinking' ? errMsg : msg)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 py-4 sm:py-6 flex flex-col min-h-0">
        <div className="container flex-1 flex flex-col min-h-0">

          <div className="mb-4">
            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">AI Document Chat</h1>
            <p className="mt-1 text-sm text-grey">Ask questions and get instant AI answers grounded directly in your uploaded PDFs.</p>
          </div>

          <div className="flex-1 flex flex-col min-h-0 pb-4">
            <ChatWindow
              messages={messages}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              isInputDisabled={false}
              messagesEndRef={messagesEndRef}
              documents={documents}
              selectedDocumentId={docParam || 'all'}
              onSelectDocument={handleSelectDocument}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
