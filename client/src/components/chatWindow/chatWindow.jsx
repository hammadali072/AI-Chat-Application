import { ChatCircleIcon, CpuIcon, SparkleIcon } from '@phosphor-icons/react';
import MessageBubble from '../messageBubble/messageBubble';
import ChatInput from '../chatInput/chatInput';

const ChatWindow = ({
  messages = [],
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
    <div className="card-inset flex flex-col rounded-2xl overflow-hidden h-[580px]">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <SparkleIcon size={16} weight="fill" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black">AI Document Chatbot</h3>
            <p className="text-[11px] text-grey">Keyword match context retrieval via OpenRouter AI</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 border border-green-200">
            <span className="size-1.5 rounded-full bg-green-500" />
            <span>Keyword Grounding Active</span>
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 bg-tint-gray/40">
        {hasMessages ? (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                variant={msg.variant}
                content={msg.content}
                timestamp={msg.timestamp}
                matchedChunksInfo={msg.matchedChunksInfo}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center p-6 select-none">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-tint-gray text-primary mb-3">
              <ChatCircleIcon size={30} weight="duotone" />
            </div>
            <h4 className="text-base font-bold text-tint-black">Ask Anything About Your Documents</h4>
            <p className="text-xs text-grey mt-1 max-w-sm">
              Type your question below. The system strips stopwords, matches relevant PDF text chunks, and sends them to OpenRouter AI to generate your grounded answer.
            </p>
          </div>
        )}
      </div>

      {/* Pinned Bottom Input */}
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
