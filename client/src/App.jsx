import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import UploadPage from './pages/upload-page';
import ChatPage from './pages/chat-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
