import { Link } from 'react-router-dom';
import { FilePdfIcon, TrashIcon, ChatCircleDotsIcon, CheckCircleIcon, ArrowClockwiseIcon } from '@phosphor-icons/react';

const DocumentList = ({ documents = [], onDeleteDocument }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="card-inset rounded-2xl p-8 text-center select-none">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-tint-gray text-grey mb-3">
          <FilePdfIcon size={26} weight="duotone" />
        </div>
        <h3 className="text-sm font-semibold text-tint-black">No Documents Uploaded Yet</h3>
        <p className="text-xs text-grey mt-1">
          Upload your PDF lecture notes or course material above to start chunking and asking AI questions.
        </p>
      </div>
    );
  }

  return (
    <div className="card-inset rounded-2xl p-6">
      <div className="flex items-center justify-between pb-4 border-b border-black/5">
        <div>
          <h2 className="text-base font-bold text-black">Uploaded Documents</h2>
          <p className="text-xs text-grey">Processed PDFs available for AI keyword search and context retrieval</p>
        </div>
        <span className="rounded-full bg-tint-gray px-3 py-1 text-xs font-semibold text-tint-black">
          {documents.length} {documents.length === 1 ? 'Document' : 'Documents'}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-tint-gray/60 p-4 border border-black/5 hover:bg-tint-gray duration-150"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                <FilePdfIcon size={22} weight="fill" />
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-sm font-bold text-tint-black">{doc.fileName}</h4>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-grey">
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircleIcon size={14} weight="fill" />
                    <span>{doc.chunksCount} Text Chunks</span>
                  </span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>{doc.uploadedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Link
                to="/chat"
                className="btn-gradient inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold duration-150"
              >
                <ChatCircleDotsIcon size={14} weight="bold" />
                <span>Chat</span>
              </Link>
              <button
                type="button"
                onClick={() => onDeleteDocument?.(doc.id)}
                aria-label="Delete document"
                className="flex size-8 items-center justify-center rounded-lg text-grey hover:bg-red-50 hover:text-red-500 duration-150"
              >
                <TrashIcon size={16} weight="bold" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
