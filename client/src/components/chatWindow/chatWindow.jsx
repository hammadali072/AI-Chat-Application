import { ChatCircleIcon } from '@phosphor-icons/react';
import MessageBubble from '../messageBubble/messageBubble';
import ChatInput from '../chatInput/chatInput';

const DEFAULT_MESSAGES = [
  {
    id: '1',
    variant: 'ai',
    content: "Hello! I've processed your PDF document. What questions would you like to ask about it?",
    timestamp: 'Just now',
  },
  {
    id: '2',
    variant: 'user',
    content: 'Can you summarize the main points of this document?',
    timestamp: 'Just now',
  },
  {
    id: '3',
    variant: 'ai',
    content: 'This document provides a comprehensive overview of AI-assisted document workflows, key metrics, and modern web application architectural patterns.',
    timestamp: 'Just now',
  },
];

const ChatWindow = ({
  messages = DEFAULT_MESSAGES,
  inputValue = '',
  onInputChange,
  onSendMessage,
  onKeyDown,
  isLoading = false,
  isInputDisabled = false,
  messagesEndRef,
}) => {
  const hasMessages = messages && messages.length > 0;

  return (
    <div className="card-inset flex flex-col rounded-2xl overflow-hidden h-[500px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="size-2.5 rounded-full bg-green-500" />
          <h3 className="text-sm font-bold text-black">AI Document Assistant</h3>
        </div>
        {isLoading && (
          <span className="text-xs font-medium text-grey animate-pulse">Generating response...</span>
        )}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 bg-tint-gray/40">
        {hasMessages ? (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                variant={msg.variant}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center p-6 select-none">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-tint-gray text-grey mb-3">
              <ChatCircleIcon size={26} weight="duotone" />
            </div>
            <p className="text-sm font-semibold text-tint-black">No conversation started</p>
            <p className="text-xs text-grey mt-1">Upload a PDF or choose demo mode to begin asking questions.</p>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSendMessage}
        onKeyDown={onKeyDown}
        isLoading={isLoading}
        isDisabled={isInputDisabled}
      />
    </div>
  );
};

export default ChatWindow;
