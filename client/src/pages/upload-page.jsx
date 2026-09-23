import { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import UploadSection from '../components/uploadSection/uploadSection';
import DocumentList from '../components/documentList/documentList';

const INITIAL_DOCUMENTS = [
  {
    id: 'doc-1',
    fileName: 'Lecture_04_Machine_Learning.pdf',
    chunksCount: 42,
    size: '3.4 MB',
    uploadedAt: 'Today, 11:30 AM',
  },
  {
    id: 'doc-2',
    fileName: 'Database_Systems_Chapter3.pdf',
    chunksCount: 28,
    size: '1.8 MB',
    uploadedAt: 'Yesterday, 4:15 PM',
  },
];

const UploadPage = () => {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (file) => {
    setFileName(file.name);
    setUploadStatus('uploading');

    // Simulate backend pdf-parse + chunking process
    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        fileName: file.name,
        chunksCount: Math.floor(Math.random() * 30) + 15,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: 'Just now',
      };

      setDocuments((prev) => [newDoc, ...prev]);
      setUploadStatus('success');
    }, 1500);
  };

  const handleRemoveFile = () => {
    setFileName('');
    setUploadStatus('idle');
  };

  const handleDeleteDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="min-h-screen bg-tint-gray flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Document Upload &amp; Management
          </h1>
          <p className="mt-1 text-sm text-grey">
            Upload PDF lecture notes or course materials. The backend extracts text with pdf-parse, cleans glyphs, and splits content into indexed chunks saved in MongoDB.
          </p>
        </div>

        {/* Upload Section & Document List */}
        <div className="flex flex-col gap-6">
          <UploadSection
            uploadStatus={uploadStatus}
            fileName={fileName}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
          />

          <DocumentList
            documents={documents}
            onDeleteDocument={handleDeleteDocument}
          />
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
