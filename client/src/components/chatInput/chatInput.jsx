/**
 * ChatInput — Pinned input bar at the bottom of the chat section.
 *
 * Props:
 *  - value       {string}   Controlled input value.
 *  - onChange    {function} Signature: (newValue: string) => void
 *  - onSend      {function} Signature: () => void
 *  - onKeyDown   {function} Raw keydown handler. Signature: (e) => void
 *  - isLoading   {boolean}  True while AI is responding.
 *  - isDisabled  {boolean}  True when no PDF has been uploaded.
 *  - placeholder {string}   Textarea placeholder text.
 *
 * TODO: wire up onChange   → message input state setter
 * TODO: wire up onSend     → send message handler
 * TODO: wire up onKeyDown  → Enter-to-send logic
 * TODO: wire up isLoading  → AI response pending flag
 * TODO: wire up isDisabled → uploadStatus !== 'success'
 */

// 1. Third-party imports
import clsx from 'clsx';
import { PaperPlaneTiltIcon, ArrowClockwiseIcon } from '@phosphor-icons/react';

// 2. Component
const ChatInput = ({
  value = '',
  onChange,
  onSend,
  onKeyDown,
  isLoading = false,
  isDisabled = false,
  placeholder = 'Ask something about the PDF…',
}) => {
  const canSend = !isLoading && !isDisabled && value.trim().length > 0;

  return (
    <div className="flex-shrink-0 px-4 py-3 border-t border-gray-100 bg-white">

      {/* Hint strip when no PDF is loaded */}
      {isDisabled && (
        <p className="text-center text-xs text-grey mb-2 select-none">
          Upload a PDF above to start chatting.
        </p>
      )}

      {/* Input row */}
      <div
        className={clsx(
          'flex items-end gap-2 rounded-xl border px-3 py-2 bg-tint-gray duration-150',
          isDisabled
            ? 'opacity-50 pointer-events-none border-gray-100'
            : 'border-gray-200 focus-within:border-primary'
        )}
      >
        {/* Textarea */}
        <textarea
          id="chat-input-field"
          rows={1}
          value={value}
          onChange={
            /* TODO: wire up onChange */
            onChange ? (e) => onChange(e.target.value) : undefined
          }
          onKeyDown={
            /* TODO: wire up onKeyDown */
            onKeyDown
          }
          disabled={isDisabled || isLoading}
          placeholder={placeholder}
          aria-label="Chat message input"
          className="flex-1 resize-none bg-transparent text-sm text-tint-black placeholder:text-grey leading-relaxed max-h-32 overflow-y-auto"
        />

        {/* Send button */}
        <button
          id="chat-send-button"
          type="button"
          disabled={!canSend}
          onClick={
            /* TODO: wire up onSend */
            onSend
          }
          aria-label="Send message"
          className={clsx(
            'btn-send flex-shrink-0 flex items-center justify-center size-8 rounded-lg duration-150'
          )}
        >
          {isLoading ? (
            <ArrowClockwiseIcon
              size={14}
              weight="bold"
              style={{ animation: 'spin-slow 0.9s linear infinite' }}
              aria-hidden="true"
            />
          ) : (
            <PaperPlaneTiltIcon size={14} weight="fill" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-right text-[10px] text-grey mt-1.5 select-none">
        <kbd className="px-1 py-px rounded bg-white border border-gray-200 font-sans text-[10px]">Enter</kbd>
        {' '}to send
      </p>
    </div>
  );
};

// 3. Export
export default ChatInput;
