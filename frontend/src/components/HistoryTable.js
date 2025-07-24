import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HistoryTable.css';

const HistoryTable = ({ onViewDetails }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/resumes');
      setResumes(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError('Failed to load resume history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/resumes/${id}`);
      onViewDetails(response.data);
    } catch (error) {
      console.error('Error fetching resume details:', error);
      setError('Failed to load resume details. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return <div className="loading-message">Loading resume history...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (resumes.length === 0) {
    return <div className="empty-message">No resumes have been uploaded yet.</div>;
  }

  return (
    <div className="history-table-container">
      <h2>Resume History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Upload Date</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume.id}>
              <td>{resume.name || 'N/A'}</td>
              <td>{resume.email || 'N/A'}</td>
              <td>{formatDate(resume.uploaded_at)}</td>
              <td>
                <div className="table-rating">
                  <span className="rating-value">{resume.resume_rating}/10</span>
                </div>
              </td>
              <td>
                <button 
                  className="view-details-button"
                  onClick={() => handleViewDetails(resume.id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="refresh-button" onClick={fetchResumes}>
        Refresh List
      </button>
    </div>
  );
};

export default HistoryTable;