import clsx from 'clsx';
import { PaperPlaneTiltIcon, ArrowClockwiseIcon } from '@phosphor-icons/react';

const ChatInput = ({
  value = '',
  onChange,
  onSend,
  onKeyDown,
  isLoading = false,
  isDisabled = false,
  placeholder = 'Ask a question about your uploaded PDF content...',
}) => {
  const canSend = !isLoading && !isDisabled && value.trim().length > 0;

  const handleSend = () => {
    if (canSend && onSend) {
      onSend();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div className="border-t border-black/5 bg-white p-3 sm:p-4">
      {isDisabled && (
        <p className="mb-2 text-center text-xs font-medium text-grey select-none">
          No PDF documents found. Please upload a document first to start querying AI.
        </p>
      )}

      <div
        className={clsx(
          'flex items-center gap-2 rounded-xl border p-2 duration-150',
          isDisabled
            ? 'bg-tint-gray/60 border-black/5 opacity-60 pointer-events-none'
            : 'bg-tint-gray border-black/10 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20'
        )}
      >
        <textarea
          rows={1}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled || isLoading}
          placeholder={placeholder}
          className="flex-1 resize-none bg-transparent px-2 text-sm text-tint-black placeholder:text-grey/70 max-h-28 overflow-y-auto leading-relaxed focus:outline-none"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send question"
          className="btn-gradient flex size-9 flex-shrink-0 items-center justify-center rounded-lg duration-150"
        >
          {isLoading ? (
            <ArrowClockwiseIcon size={16} weight="bold" className="animate-spin" />
          ) : (
            <PaperPlaneTiltIcon size={16} weight="fill" />
          )}
        </button>
      </div>
      
      <p className="mt-1.5 text-right text-[10px] text-grey">
        Press <kbd className="rounded bg-tint-gray px-1 py-0.5 font-mono text-[10px] border border-black/10">Enter</kbd> to send
      </p>
    </div>
  );
};

export default ChatInput;
