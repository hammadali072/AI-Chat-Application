/**
 * ChatWindow — Scrollable message list + pinned ChatInput bar.
 *
 * Props:
 *  - messages        {Array}    Message objects: { id, variant, content, timestamp }
 *  - inputValue      {string}   Controlled chat input value.
 *  - onInputChange   {function} Signature: (value: string) => void
 *  - onSendMessage   {function} Signature: () => void
 *  - onKeyDown       {function} Raw keydown handler for Enter-to-send.
 *  - isLoading       {boolean}  True while the AI is generating a response.
 *  - isInputDisabled {boolean}  True when no PDF has been uploaded.
 *  - messagesEndRef  {Ref}      Attach to bottom sentinel for auto-scroll.
 *
 * TODO: wire up messages         → real messages array state
 * TODO: wire up inputValue       → controlled input state
 * TODO: wire up onInputChange    → setInputValue
 * TODO: wire up onSendMessage    → send/submit handler
 * TODO: wire up isLoading        → AI-response pending flag
 * TODO: wire up isInputDisabled  → uploadStatus !== 'success'
 * TODO: wire up messagesEndRef   → auto-scroll on new messages
 * TODO: replace PLACEHOLDER_MESSAGES with real messages prop
 */

// 1. Third-party imports
import { ChatCircleIcon } from '@phosphor-icons/react';

// 2. Internal imports
import MessageBubble from '../messageBubble/messageBubble';
import ChatInput from '../chatInput/chatInput';

/* ── PLACEHOLDER DATA — for visual preview only ──────────────
   Remove and replace with the `messages` prop when wired up. */
const PLACEHOLDER_MESSAGES = [
  {
    id: 'p1',
    variant: 'ai',
    content: 'Hello! I\'ve read your PDF. Ask me anything about it.',
    timestamp: '2:28 PM',
  },
  {
    id: 'p2',
    variant: 'user',
    content: 'What is the main topic of this document?',
    timestamp: '2:29 PM',
  },
  {
    id: 'p3',
    variant: 'ai',
    content: 'The document covers scalable microservices architecture, focusing on service discovery, load balancing, and inter-service communication.',
    timestamp: '2:29 PM',
  },
  {
    id: 'p4',
    variant: 'error',
    content: 'Something went wrong. Please try again.',
    timestamp: '2:30 PM',
  },
  {
    id: 'p5',
    variant: 'thinking',
    content: '',
    timestamp: '',
  },
];
/* ── END PLACEHOLDER ───────────────────────────────────────── */

// 3. Empty state
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6 select-none">
    <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center text-grey">
      <ChatCircleIcon size={24} weight="duotone" />
    </div>
    <div>
      <p className="text-sm font-medium text-tint-black">No messages yet</p>
      <p className="text-xs text-grey mt-0.5">Upload a PDF above and ask your first question.</p>
    </div>
  </div>
);

// 4. Main component
const ChatWindow = ({
  /* TODO: replace PLACEHOLDER_MESSAGES with real prop */
  messages = PLACEHOLDER_MESSAGES,
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
    <section
      id="chat-window"
      aria-label="Chat conversation"
      className="flex flex-col flex-1 min-h-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Section header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-gray-100">
        <span className="size-2 rounded-full bg-green-400" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-tint-black">Conversation</h2>
        {isLoading && (
          <span className="ml-auto text-xs text-grey animate-pulse">Thinking…</span>
        )}
      </div>

      {/* Scrollable message list */}
      <div
        id="message-list"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-5 flex flex-col gap-3.5"
      >
        {hasMessages ? (
          <>
            {/* TODO: replace PLACEHOLDER_MESSAGES with real messages prop */}
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                variant={msg.variant}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}
            {/* Bottom sentinel — TODO: attach messagesEndRef for auto-scroll */}
            <div ref={messagesEndRef} aria-hidden="true" />
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Pinned input bar */}
      {/* TODO: wire up all ChatInput props */}
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSendMessage}
        onKeyDown={onKeyDown}
        isLoading={isLoading}
        isDisabled={isInputDisabled}
      />
    </section>
  );
};

// 5. Export
export default ChatWindow;
