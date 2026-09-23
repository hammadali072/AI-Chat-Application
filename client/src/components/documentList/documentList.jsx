import { Link } from 'react-router-dom';
import { FilePdfIcon, TrashIcon, ChatCircleDotsIcon } from '@phosphor-icons/react';

const DocumentList = ({ documents = [], onDeleteDocument }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="card-inset rounded-2xl p-8 text-center select-none">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-tint-gray text-grey mb-3">
          <FilePdfIcon size={26} weight="duotone" />
        </div>
        <h3 className="text-sm font-semibold text-tint-black">No Documents Uploaded Yet</h3>
        <p className="text-xs text-grey mt-1">Upload a PDF document above to start asking questions.</p>
      </div>
    );
  }

  return (
    <div className="card-inset rounded-2xl p-6">
      <div className="flex items-center justify-between pb-4 border-b border-black/5">
        <div>
          <h2 className="text-lg font-bold text-black">Uploaded Documents</h2>
          <p className="text-sm text-grey">PDF files available for Q&amp;A</p>
        </div>
        <span className="rounded-full bg-tint-gray px-3 py-1 text-xs font-semibold text-tint-black">
          {documents.length} {documents.length === 1 ? 'Document' : 'Documents'}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {documents.map((doc) => (
          <div
            key={doc.id || doc._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-tint-gray/60 p-4 border border-black/5 hover:bg-tint-gray duration-150"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                <FilePdfIcon size={22} weight="fill" />
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-sm font-bold text-tint-black">{doc.fileName}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-grey">
                  <span>PDF Document</span>
                  {doc.uploadedAt && (
                    <>
                      <span>•</span>
                      <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Link
                to={`/chat?doc=${doc.id || doc._id}`}
                className="btn-gradient inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold duration-150"
              >
                <ChatCircleDotsIcon size={16} weight="bold" />
                <span>Chat with PDF</span>
              </Link>
              <button
                type="button"
                onClick={() => onDeleteDocument?.(doc.id || doc._id)}
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
