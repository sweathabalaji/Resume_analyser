const db = require('../db');
const { extractTextFromPDF, analyzeResumeWithGemini } = require('../services/analysisService');

/**
 * Upload and analyze a resume
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function uploadAndAnalyzeResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text from the PDF
    const pdfText = await extractTextFromPDF(req.file.buffer);
    
    // Analyze the resume text with Gemini
    const analysisResult = await analyzeResumeWithGemini(pdfText);
    
    // Save the analysis result to the database
    const query = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills, projects,
        certifications, resume_rating, improvement_areas, upskill_suggestions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      req.file.originalname,
      analysisResult.name,
      analysisResult.email,
      analysisResult.phone,
      analysisResult.linkedin_url,
      analysisResult.portfolio_url,
      analysisResult.summary,
      JSON.stringify(analysisResult.work_experience),
      JSON.stringify(analysisResult.education),
      JSON.stringify(analysisResult.technical_skills),
      JSON.stringify(analysisResult.soft_skills),
      JSON.stringify(analysisResult.projects),
      JSON.stringify(analysisResult.certifications),
      analysisResult.resume_rating,
      analysisResult.improvement_areas,
      JSON.stringify(analysisResult.upskill_suggestions)
    ];
    
    const dbResult = await db.query(query, values);
    
    // Get the last inserted ID
    const idResult = await db.query('SELECT last_insert_rowid() as id');
    const id = idResult.rows[0].id;
    
    // Get the current timestamp
    const timeResult = await db.query('SELECT datetime("now") as uploaded_at');
    const uploaded_at = timeResult.rows[0].uploaded_at;
    
    // Return the analysis result along with the database ID
    return res.status(200).json({
      id,
      uploaded_at,
      ...analysisResult
    });
  } catch (error) {
    console.error('Error in uploadAndAnalyzeResume:', error);
    return res.status(500).json({ error: error.message || 'Failed to process resume' });
  }
}

/**
 * Get all resumes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllResumes(req, res) {
  try {
    const query = `
      SELECT id, file_name, uploaded_at, name, email, phone, resume_rating
      FROM resumes
      ORDER BY uploaded_at DESC
    `;
    
    const result = await db.query(query);
    
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error in getAllResumes:', error);
    return res.status(500).json({ error: error.message || 'Failed to retrieve resumes' });
  }
}

/**
 * Get a resume by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getResumeById(req, res) {
  try {
    const { id } = req.params;
    
    const query = `SELECT * FROM resumes WHERE id = ?`;
    const result = await db.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    // Parse JSON strings back to objects
    const resume = result.rows[0];
    resume.work_experience = JSON.parse(resume.work_experience || '[]');
    resume.education = JSON.parse(resume.education || '[]');
    resume.technical_skills = JSON.parse(resume.technical_skills || '[]');
    resume.soft_skills = JSON.parse(resume.soft_skills || '[]');
    resume.projects = JSON.parse(resume.projects || '[]');
    resume.certifications = JSON.parse(resume.certifications || '[]');
    resume.upskill_suggestions = JSON.parse(resume.upskill_suggestions || '[]');
    
    return res.status(200).json(resume);
  } catch (error) {
    console.error('Error in getResumeById:', error);
    return res.status(500).json({ error: error.message || 'Failed to retrieve resume' });
  }
}

module.exports = {
  uploadAndAnalyzeResume,
  getAllResumes,
  getResumeById
};