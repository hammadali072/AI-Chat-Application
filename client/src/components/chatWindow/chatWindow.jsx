import { ChatCircleIcon, FilePdfIcon, SparkleIcon, GlobeIcon, CaretDownIcon } from '@phosphor-icons/react';
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
  documents = [],
  selectedDocumentId = 'all',
  onSelectDocument,
}) => {
  const hasMessages = messages && messages.length > 0;
  const activeDoc = documents.find((d) => (d.id || d._id) === selectedDocumentId);

  return (
    <div className="card-inset rounded-2xl overflow-hidden h-full min-h-[540px] flex flex-col bg-white/90 border border-black/5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 glass-inset px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-b from-primary-start to-primary-end text-white shadow-xs">
            <SparkleIcon size={18} weight="fill" />
          </div>
          <div>
            <h3 className="text-base font-bold text-black">AI Document Chat</h3>
            <p className="text-xs text-grey">Ask questions grounded directly in your PDFs</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {documents && documents.length > 0 && (
            <div className="relative flex items-center">
              <FilePdfIcon
                size={14}
                weight="bold"
                className="pointer-events-none absolute left-3 text-primary"
              />
              <select
                id="doc-selector"
                value={selectedDocumentId || 'all'}
                onChange={(e) => onSelectDocument?.(e.target.value)}
                className="appearance-none rounded-full border border-black/10 bg-white py-2 pl-8 pr-8 text-xs font-semibold text-tint-black shadow-sm cursor-pointer max-w-[180px] sm:max-w-[240px] truncate hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15 duration-150 outline-none"
              >
                <option value="all">All Documents (Universal)</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.fileName}
                  </option>
                ))}
              </select>
              <CaretDownIcon
                size={12}
                weight="bold"
                className="pointer-events-none absolute right-3 text-grey"
              />
            </div>
          )}
        </div>
      </div>

      {activeDoc ? (
        <div className="bg-primary/5 px-5 py-2 border-b border-primary/10 flex items-center justify-between text-xs text-primary font-medium">
          <span className="truncate flex items-center gap-1.5">
            <FilePdfIcon size={14} weight="fill" />
            <span>Currently chatting with: <strong>{activeDoc.fileName}</strong></span>
          </span>
          <button
            type="button"
            onClick={() => onSelectDocument?.('all')}
            className="text-[11px] underline hover:text-primary-end font-semibold flex-shrink-0"
          >
            Switch to All Documents
          </button>
        </div>
      ) : (
        selectedDocumentId === 'all' && documents.length > 0 && (
          <div className="bg-tint-gray/70 px-5 py-1.5 border-b border-black/5 flex items-center gap-1.5 text-xs text-grey font-medium">
            <GlobeIcon size={14} weight="bold" className="text-primary" />
            <span>Searching across all {documents.length} uploaded documents</span>
          </div>
        )
      )}

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 bg-tint-gray/40">
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
          <div className="flex h-full flex-col items-center justify-center text-center p-6 select-none my-auto">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm mb-4 border border-black/5">
              <ChatCircleIcon size={32} weight="duotone" />
            </div>
            <h4 className="text-lg font-bold text-black">Ask Anything About Your Documents</h4>
            <p className="text-sm text-grey mt-1 max-w-md">Type your question below to search and get instant answers grounded in your PDF content.</p>
          </div>
        )}
      </div>

      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={() => onSendMessage?.()}
        onKeyDown={onKeyDown}
        isLoading={isLoading}
        isDisabled={isInputDisabled}
      />
    </div>
  );
};

export default ChatWindow;