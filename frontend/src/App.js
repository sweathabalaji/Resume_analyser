import React, { useState } from 'react';
import './App.css';
import ResumeUpload from './components/ResumeUpload';
import ResumeAnalysis from './components/ResumeAnalysis';
import HistoryTable from './components/HistoryTable';
import Modal from './components/Modal';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [analysisData, setAnalysisData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setConfirmDialogOpen(true); // show confirmation dialog
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'upload') {
      setAnalysisData(null);
    }
  };

  const handleViewDetails = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseConfirm = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmNavigate = () => {
    setConfirmDialogOpen(false);
    setActiveTab('history');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Analyzer</h1>
        <p>Upload your resume for AI-powered analysis and feedback</p>
      </header>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => handleTabChange('upload')}
          >
            Resume Analysis
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => handleTabChange('history')}
          >
            History
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'upload' && !analysisData && (
            <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
          )}

          {activeTab === 'upload' && analysisData && (
            <ResumeAnalysis analysisData={analysisData} />
          )}

          {activeTab === 'history' && (
            <HistoryTable onViewDetails={handleViewDetails} />
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {modalData && <ResumeAnalysis analysisData={modalData} />}
      </Modal>

      {/* Confirmation Dialog */}
      <Modal isOpen={confirmDialogOpen} onClose={handleCloseConfirm}>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <h3>Resume analyzed successfully!</h3>
          <p>Do you want to go to the History page?</p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleConfirmNavigate} className="confirm-btn">Yes</button>
            <button onClick={handleCloseConfirm} className="cancel-btn" style={{ marginLeft: '1rem' }}>No</button>
          </div>
        </div>
      </Modal>

      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Resume Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
