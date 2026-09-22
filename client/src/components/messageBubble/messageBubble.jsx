/**
 * MessageBubble — A single chat message bubble.
 *
 * Props:
 *  - variant     {string}  'user' | 'ai' | 'thinking' | 'error'
 *  - content     {string}  Message text (unused for 'thinking').
 *  - timestamp   {string}  Optional time string e.g. "2:34 PM".
 */

// 1. Third-party imports
import clsx from 'clsx';
import { RobotIcon, UserIcon, WarningIcon } from '@phosphor-icons/react';

// 2. Local constant — maps each variant to stable class strings (no hex)
const STYLE = {
  user: {
    row: 'justify-end',
    bubble: 'bg-primary text-white bubble-user rounded-2xl rounded-br-sm',
    icon: null,
  },
  ai: {
    row: 'justify-start',
    bubble: 'bg-white text-tint-black bubble-ai rounded-2xl rounded-bl-sm border border-gray-100',
    icon: 'bg-gray-100 text-grey',
  },
  thinking: {
    row: 'justify-start',
    bubble: 'bg-white bubble-ai rounded-2xl rounded-bl-sm border border-gray-100',
    icon: 'bg-gray-100 text-grey',
  },
  error: {
    row: 'justify-start',
    bubble: 'bg-red-50 text-red-700 bubble-ai rounded-2xl rounded-bl-sm border border-red-100',
    icon: 'bg-red-50 text-red-400',
  },
};

// 3. Component
const MessageBubble = ({ variant = 'ai', content = '', timestamp }) => {
  const s = STYLE[variant] ?? STYLE.ai;
  const isUser = variant === 'user';

  return (
    <div className={clsx('flex items-end gap-2 w-full', s.row)}>

      {/* Left avatar — AI / error / thinking */}
      {!isUser && (
        <div
          className={clsx('flex-shrink-0 size-7 rounded-full flex items-center justify-center', s.icon)}
          aria-hidden="true"
        >
          {variant === 'error'
            ? <WarningIcon size={13} weight="bold" />
            : <RobotIcon size={13} weight="fill" />}
        </div>
      )}

      {/* Bubble body */}
      <div className={clsx('flex flex-col gap-1', isUser ? 'items-end' : 'items-start', 'max-w-[72%] sm:max-w-[60%]')}>
        <div className={clsx('px-3.5 py-2.5 text-sm leading-relaxed shadow-sm', s.bubble)}>
          {variant === 'thinking' ? (
            <div className="flex items-center gap-1.5 py-0.5" aria-label="AI is thinking">
              <span className="thinking-dot" />
              <span className="thinking-dot" />
              <span className="thinking-dot" />
            </div>
          ) : (
            <p style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{content}</p>
          )}
        </div>

        {timestamp && variant !== 'thinking' && (
          <span className="text-[10px] text-grey px-1 select-none">{timestamp}</span>
        )}
      </div>

      {/* Right avatar — user */}
      {isUser && (
        <div
          className="flex-shrink-0 size-7 rounded-full bg-primary flex items-center justify-center text-white"
          aria-hidden="true"
        >
          <UserIcon size={13} weight="fill" />
        </div>
      )}
    </div>
  );
};

// 4. Export
export default MessageBubble;
