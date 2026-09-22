/**
 * UploadSection — PDF drop-zone + status display.
 *
 * Props:
 *  - uploadStatus  {string}   'idle' | 'uploading' | 'success' | 'error'
 *  - fileName      {string}   Name of the selected file.
 *  - onFileSelect  {function} Signature: (file: File) => void
 *  - onRemoveFile  {function} Signature: () => void
 *  - onDragOver    {function} Signature: (e) => void
 *  - onDrop        {function} Signature: (e) => void
 *  - onDragLeave   {function} Signature: (e) => void
 *  - isDragActive  {boolean}  True while a file is dragged over the zone.
 *  - errorMessage  {string}   Error detail text shown on 'error' status.
 *
 * TODO: wire up onFileSelect  → file state setter + upload trigger
 * TODO: wire up onDragOver / onDrop / onDragLeave → drag-and-drop handlers
 * TODO: wire up isDragActive  → local drag boolean state
 * TODO: wire up uploadStatus  → upload state machine
 * TODO: wire up fileName      → selected file name from state
 * TODO: wire up onRemoveFile  → clear file from state
 * TODO: wire up errorMessage  → API error response
 */

// 1. Third-party imports
import clsx from 'clsx';
import { UploadSimpleIcon, CheckCircleIcon, XCircleIcon, FilePdfIcon, ArrowClockwiseIcon, XIcon } from '@phosphor-icons/react';

// 2. Local constants — status config (text only, no hex)
const STATUS_CONFIG = {
  idle: {
    dot: 'bg-gray-300',
    label: 'No file selected',
    text: 'text-grey',
    pulse: false,
  },
  uploading: {
    dot: 'bg-blue-400 pulse-ring',
    label: 'Uploading…',
    text: 'text-blue-500',
    pulse: true,
  },
  success: {
    dot: 'bg-green-500',
    label: 'Ready',
    text: 'text-green-600',
    pulse: false,
  },
  error: {
    dot: 'bg-red-400',
    label: 'Failed',
    text: 'text-red-500',
    pulse: false,
  },
};

// 3. Sub-component — status badge
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.idle;
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs select-none"
      aria-live="polite"
    >
      <span className={clsx('size-1.5 rounded-full flex-shrink-0', cfg.dot)} />
      <span className={cfg.text}>{cfg.label}</span>
      {status === 'uploading' && (
        <ArrowClockwiseIcon
          size={11}
          className="text-blue-400"
          style={{ animation: 'spin-slow 1s linear infinite' }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// 4. Sub-component — selected file row
const FileRow = ({ fileName, uploadStatus, onRemove }) => {
  if (!fileName) return null;
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm">
      <FilePdfIcon
        size={16}
        weight="fill"
        className={clsx(uploadStatus === 'error' ? 'text-red-400' : 'text-primary')}
        aria-hidden="true"
      />
      <span className="flex-1 truncate text-tint-black font-medium" title={fileName}>
        {fileName}
      </span>
      {/* TODO: wire up onClick to onRemove */}
      <button
        id="remove-file-button"
        type="button"
        onClick={onRemove}
        aria-label="Remove file"
        className="flex-shrink-0 size-5 rounded-md flex items-center justify-center text-grey hover:text-red-400 hover:bg-red-50 duration-150"
      >
        <XIcon size={11} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
};

// 5. Main component
const UploadSection = ({
  uploadStatus = 'idle',           /* PLACEHOLDER default — remove when wired */
  fileName = 'sample-doc.pdf', /* PLACEHOLDER default — remove when wired */
  onFileSelect,
  onRemoveFile,
  onDragOver,
  onDrop,
  onDragLeave,
  isDragActive = false,
  errorMessage = '',
}) => (
  <section id="upload-section" aria-label="PDF upload area" className="flex flex-col gap-3">

    {/* Header row */}
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <h2 className="text-sm font-semibold text-tint-black">Upload PDF</h2>
      {/* TODO: wire up uploadStatus */}
      <StatusBadge status={uploadStatus} />
    </div>

    {/* Drop-zone */}
    <label
      id="pdf-dropzone"
      htmlFor="pdf-file-input"
      onDragOver={/* TODO: wire up */ onDragOver}
      onDrop={/* TODO: wire up */ onDrop}
      onDragLeave={/* TODO: wire up */ onDragLeave}
      className={clsx(
        'dropzone-base cursor-pointer select-none rounded-2xl duration-150',
        'flex flex-col items-center justify-center gap-3 py-8 sm:py-10 px-6',
        isDragActive && 'dropzone-active',
        uploadStatus === 'success' && 'border-green-200 bg-green-50',
        uploadStatus === 'error' && 'border-red-200 bg-red-50',
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          'size-11 rounded-xl flex items-center justify-center',
          uploadStatus === 'success' ? 'bg-green-100 text-green-600'
            : uploadStatus === 'error' ? 'bg-red-100 text-red-400'
              : uploadStatus === 'uploading' ? 'bg-gray-100 text-grey'
                : 'bg-gray-100 text-grey'
        )}
        aria-hidden="true"
      >
        {uploadStatus === 'success' ? (
          <CheckCircleIcon size={22} weight="fill" />
        ) : uploadStatus === 'error' ? (
          <XCircleIcon size={22} weight="fill" />
        ) : uploadStatus === 'uploading' ? (
          <ArrowClockwiseIcon size={22} weight="bold" style={{ animation: 'spin-slow 1s linear infinite' }} />
        ) : (
          <UploadSimpleIcon size={22} weight="bold" />
        )}
      </div>

      {/* Label text */}
      <div className="text-center">
        {uploadStatus === 'success' ? (
          <>
            <p className="text-sm font-medium text-green-700">Uploaded successfully</p>
            <p className="text-xs text-grey mt-0.5">You can now start chatting below.</p>
          </>
        ) : uploadStatus === 'error' ? (
          <>
            <p className="text-sm font-medium text-red-600">Upload failed</p>
            <p className="text-xs text-grey mt-0.5">{errorMessage || 'Please try again with a valid PDF.'}</p>
          </>
        ) : uploadStatus === 'uploading' ? (
          <>
            <p className="text-sm font-medium text-tint-black">Uploading…</p>
            <p className="text-xs text-grey mt-0.5">Please wait while we process your file.</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-tint-black">
              {isDragActive ? 'Drop your PDF here' : 'Drop PDF here'}
            </p>
            <p className="text-xs text-grey mt-0.5">
              or <span className="text-primary font-medium">click to browse</span> — PDF only, max 20 MB
            </p>
          </>
        )}
      </div>

      {/* Hidden file input */}
      {/* TODO: wire up onChange to onFileSelect */}
      <input
        id="pdf-file-input"
        type="file"
        accept=".pdf,application/pdf"
        aria-label="Upload PDF file"
        className="sr-only"
        onChange={
          onFileSelect
            ? (e) => { const f = e.target.files?.[0]; if (f) onFileSelect(f); }
            : undefined
        }
      />
    </label>

    {/* File name row */}
    {/* TODO: wire up fileName and onRemoveFile */}
    <FileRow fileName={fileName} uploadStatus={uploadStatus} onRemove={onRemoveFile} />

    {/* Error detail */}
    {uploadStatus === 'error' && errorMessage && (
      <p className="text-xs text-red-500 px-1" role="alert" aria-live="assertive">
        {errorMessage}
      </p>
    )}
  </section>
);

// 6. Export
export default UploadSection;
