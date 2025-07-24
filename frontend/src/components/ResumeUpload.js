import React, { useState } from 'react';
import axios from 'axios';
import './ResumeUpload.css';

const ResumeUpload = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file to upload');
      return;
    }
    
    setIsUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('resume', file);
    
    try {
      const response = await axios.post('http://localhost:5000/api/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setIsUploading(false);
      onAnalysisComplete(response.data);
    } catch (error) {
      setIsUploading(false);
      setError(error.response?.data?.error || 'Failed to upload resume. Please try again.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="resume-upload-container">
      <h2>Upload Your Resume</h2>
      <p>Upload your resume in PDF format for AI-powered analysis</p>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <input 
            type="file" 
            id="resume-file" 
            onChange={handleFileChange} 
            accept="application/pdf"
            className="file-input"
          />
          <label htmlFor="resume-file" className="file-label">
            {file ? file.name : 'Choose PDF file'}
          </label>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="upload-button" 
          disabled={isUploading || !file}
        >
          {isUploading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;