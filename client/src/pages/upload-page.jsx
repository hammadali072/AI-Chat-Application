import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/navbar';
import UploadSection from '../components/uploadSection/uploadSection';
import DocumentList from '../components/documentList/documentList';
import { getAllDocuments, uploadPDF, deleteDocument } from '../services/documentServices';

const UploadPage = () => {
  const [documents, setDocuments] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDocs = async () => {
    try {
      const data = await getAllDocuments();
      if (data && data.documents) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error('Failed to load documents:', err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleFileSelect = async (file) => {
    setFileName(file.name);
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      await uploadPDF(file);
      setUploadStatus('success');
      fetchDocs();
    } catch (err) {
      setUploadStatus('error');
      setErrorMessage(err.message || 'Upload failed. Please try again.');
    }
  };

  const handleRemoveFile = () => {
    setFileName('');
    setUploadStatus('idle');
    setErrorMessage('');
  };

  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => (doc.id || doc._id) !== id));
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  };

  return (
    <div className="min-h-screen bg-tint-gray flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              Document Upload &amp; Management
            </h1>
            <p className="mt-1 text-sm text-grey">Upload PDF documents from your device and manage your document library.</p>
          </div>

          <div className="flex flex-col gap-6">
            <UploadSection
              uploadStatus={uploadStatus}
              fileName={fileName}
              onFileSelect={handleFileSelect}
              onRemoveFile={handleRemoveFile}
              errorMessage={errorMessage}
            />

            <DocumentList
              documents={documents}
              onDeleteDocument={handleDeleteDocument}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
