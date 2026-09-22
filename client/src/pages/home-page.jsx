/**
 * HomePage — Root page for the PDF Q&A chat application.
 *
 * Composes two sections stacked vertically:
 *   1. UploadSection — PDF drop-zone + status
 *   2. ChatWindow    — Scrollable messages + pinned input
 *
 * All state and event handlers live outside this component.
 * Pass them down as props once your state layer is ready.
 *
 * Props:
 *  (Upload)
 *  - uploadStatus   {string}   'idle' | 'uploading' | 'success' | 'error'
 *  - fileName       {string}   Selected file name
 *  - onFileSelect   {function} (file: File) => void
 *  - onRemoveFile   {function} () => void
 *  - onDragOver     {function} (e) => void
 *  - onDrop         {function} (e) => void
 *  - onDragLeave    {function} (e) => void
 *  - isDragActive   {boolean}
 *  - errorMessage   {string}
 *  (Chat)
 *  - messages       {Array}
 *  - inputValue     {string}
 *  - onInputChange  {function} (value: string) => void
 *  - onSendMessage  {function} () => void
 *  - onKeyDown      {function} (e) => void
 *  - isLoading      {boolean}
 *
 * TODO: lift all state into a parent/context and forward props here.
 * TODO: remove placeholder prop defaults once real state is wired.
 */

// 1. Third-party imports
import clsx from 'clsx';

// 2. Internal imports
import UploadSection from '../components/uploadSection/uploadSection';
import ChatWindow from '../components/chatWindow/chatWindow';

// 3. Component
const HomePage = ({
  /* Upload ------------------------------------------------ */
  uploadStatus = 'idle',           /* TODO: wire up */
  fileName = 'sample-doc.pdf',     /* TODO: wire up — remove default */
  onFileSelect,
  onRemoveFile,
  onDragOver,
  onDrop,
  onDragLeave,
  isDragActive = false,
  errorMessage = '',
  /* Chat -------------------------------------------------- */
  messages,
  inputValue = '',
  onInputChange,
  onSendMessage,
  onKeyDown,
  isLoading = false,
}) => {
  /* Chat disabled until a PDF has been successfully uploaded */
  const isChatDisabled = uploadStatus !== 'success'; /* TODO: verify with your state logic */

  return (
    <div className="min-h-dvh bg-tint-gray flex flex-col">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 h-14 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          {/* Logo mark */}
          <div
            className="size-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, var(--color-primary-start), var(--color-primary-end))' }}
            aria-hidden="true"
          >
            D
          </div>
          <div className="leading-none">
            <h1 className="text-sm font-semibold text-tint-black">DocuMind</h1>
          </div>
        </div>

        {/* Upload status pill */}
        <div
          className={clsx(
            'hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border select-none',
            uploadStatus === 'success'   && 'bg-green-50   border-green-100  text-green-700',
            uploadStatus === 'uploading' && 'bg-blue-50    border-blue-100   text-blue-600',
            uploadStatus === 'error'     && 'bg-red-50     border-red-100    text-red-600',
            (uploadStatus === 'idle' || !uploadStatus) && 'bg-gray-50 border-gray-100 text-grey'
          )}
          aria-live="polite"
        >
          <span
            className={clsx(
              'size-1.5 rounded-full',
              uploadStatus === 'success'   && 'bg-green-500',
              uploadStatus === 'uploading' && 'bg-blue-400 pulse-ring',
              uploadStatus === 'error'     && 'bg-red-400',
              (uploadStatus === 'idle' || !uploadStatus) && 'bg-gray-300'
            )}
          />
          {uploadStatus === 'success'   ? 'PDF Ready'
            : uploadStatus === 'uploading' ? 'Uploading…'
            : uploadStatus === 'error'     ? 'Upload Error'
            : 'No PDF loaded'}
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────── */}
      <main
        id="main-content"
        className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-3 sm:px-4 pt-5 pb-5 gap-4 min-h-0"
        style={{ height: 'calc(100dvh - 56px)' }}
      >

        {/* 1. Upload section */}
        <div className="flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          {/* TODO: pass real state and handlers */}
          <UploadSection
            uploadStatus={uploadStatus}
            fileName={fileName}
            onFileSelect={onFileSelect}
            onRemoveFile={onRemoveFile}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            isDragActive={isDragActive}
            errorMessage={errorMessage}
          />
        </div>

        {/* 2. Chat window */}
        {/* TODO: pass real messages and handlers */}
        <ChatWindow
          messages={messages}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSendMessage={onSendMessage}
          onKeyDown={onKeyDown}
          isLoading={isLoading}
          isInputDisabled={isChatDisabled}
        />

      </main>
    </div>
  );
};

// 4. Export
export default HomePage;
