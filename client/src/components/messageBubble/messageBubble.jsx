import clsx from 'clsx';
import { RobotIcon, UserIcon, WarningIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

const MessageBubble = ({ variant = 'ai', content = '', timestamp, matchedChunksInfo }) => {
  const isUser = variant === 'user';
  const isThinking = variant === 'thinking';
  const isError = variant === 'error';

  return (
    <div className={clsx('flex items-end gap-2.5 w-full', isUser ? 'justify-end' : 'justify-start')}>
      
      {/* AI Avatar */}
      {!isUser && (
        <div
          className={clsx(
            'flex size-8 flex-shrink-0 items-center justify-center rounded-full text-white shadow-sm',
            isError ? 'bg-red-500' : 'bg-gradient-to-b from-primary-start to-primary-end'
          )}
        >
          {isError ? (
            <WarningIcon size={14} weight="bold" />
          ) : (
            <RobotIcon size={16} weight="fill" />
          )}
        </div>
      )}

      {/* Bubble Container */}
      <div className={clsx('flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]', isUser ? 'items-end' : 'items-start')}>
        
        {/* Chunk Grounding Tag for AI Messages */}
        {!isUser && matchedChunksInfo && !isThinking && (
          <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary select-none">
            <MagnifyingGlassIcon size={12} weight="bold" />
            <span>{matchedChunksInfo}</span>
          </div>
        )}

        <div
          className={clsx(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed duration-150',
            isUser
              ? 'btn-gradient text-white rounded-br-xs'
              : isError
              ? 'bg-red-50 border border-red-200 text-red-700 rounded-bl-xs'
              : 'card-inset text-tint-black rounded-bl-xs'
          )}
        >
          {isThinking ? (
            <div className="flex items-center gap-2 py-1 px-1">
              <span className="text-xs font-medium text-grey">Searching PDF chunks &amp; generating AI response...</span>
              <div className="flex items-center gap-1">
                <span className="thinking-dot" />
                <span className="thinking-dot" />
                <span className="thinking-dot" />
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{content}</p>
          )}
        </div>

        {timestamp && !isThinking && (
          <span className="px-1 text-[11px] font-medium text-grey select-none">{timestamp}</span>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-tint-black text-white shadow-sm">
          <UserIcon size={15} weight="fill" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
