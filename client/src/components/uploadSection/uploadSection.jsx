import clsx from 'clsx';
import { UploadSimpleIcon, CheckCircleIcon, XCircleIcon, FilePdfIcon, ArrowClockwiseIcon, XIcon } from '@phosphor-icons/react';

const UploadSection = ({
  uploadStatus = 'idle',
  fileName = '',
  onFileSelect,
  onRemoveFile,
  errorMessage = '',
}) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="card-inset rounded-2xl p-6">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">Upload PDF Document</h2>
          <p className="text-sm text-grey">Select a PDF file to upload and start chatting</p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-tint-gray px-3 py-1 text-xs font-medium select-none">
          <span
            className={clsx(
              'size-2 rounded-full',
              uploadStatus === 'success' && 'bg-green-500',
              uploadStatus === 'uploading' && 'bg-blue-500 animate-pulse',
              uploadStatus === 'error' && 'bg-red-500',
              uploadStatus === 'idle' && 'bg-gray-400'
            )}
          />
          <span className="capitalize text-tint-black">
            {uploadStatus === 'success'
              ? 'Uploaded'
              : uploadStatus === 'uploading'
                ? 'Uploading...'
                : uploadStatus === 'error'
                  ? 'Error'
                  : 'Ready'}
          </span>
        </div>
      </div>

      <div className="mt-5">
        {fileName ? (
          <div className="flex items-center justify-between rounded-xl bg-tint-gray p-4 border border-black/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <FilePdfIcon size={22} weight="fill" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-tint-black">{fileName}</p>
                <p className="text-xs text-grey">PDF Document</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onRemoveFile}
              className="flex size-8 items-center justify-center rounded-lg text-grey hover:bg-black/5 hover:text-red-500 duration-150"
              aria-label="Remove file"
            >
              <XIcon size={16} weight="bold" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-black/15 bg-tint-gray/50 py-9 px-4 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
              {uploadStatus === 'uploading' ? (
                <ArrowClockwiseIcon size={24} weight="bold" className="animate-spin text-primary" />
              ) : uploadStatus === 'success' ? (
                <CheckCircleIcon size={24} weight="fill" className="text-green-500" />
              ) : uploadStatus === 'error' ? (
                <XCircleIcon size={24} weight="fill" className="text-red-500" />
              ) : (
                <UploadSimpleIcon size={24} weight="bold" />
              )}
            </div>

            <p className="mt-3 text-sm font-semibold text-tint-black">Select a PDF file to upload</p>
            <p className="text-xs text-grey mt-1">Upload any PDF document from your device</p>

            <label className="btn-gradient mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold duration-150">
              <UploadSimpleIcon size={16} weight="bold" />
              <span>Choose PDF File</span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </div>

      {uploadStatus === 'error' && errorMessage && (
        <p className="mt-3 text-xs font-medium text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default UploadSection;
