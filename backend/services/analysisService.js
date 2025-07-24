const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
require('dotenv').config();

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/**
 * Extract text from a PDF buffer
 * @param {Buffer} pdfBuffer - The PDF file buffer
 * @returns {Promise<string>} - The extracted text
 */
async function extractTextFromPDF(pdfBuffer) {
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

/**
 * Analyze resume text using Google's Gemini API
 * @param {string} resumeText - The text extracted from the resume
 * @returns {Promise<Object>} - The structured analysis data
 */
async function analyzeResumeWithGemini(resumeText) {
  try {
    // Get the generative model (Gemini)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create a prompt that instructs the model how to analyze the resume
    const prompt = `
      You are a professional resume analyzer. Analyze the following resume text and extract the information in a structured JSON format.
      
      Resume Text:
      ${resumeText}
      
      Please extract and return ONLY a JSON object with the following structure (no other text):
      {
        "name": "Full Name",
        "email": "email address",
        "phone": "phone number",
        "linkedin_url": "LinkedIn profile URL if present",
        "portfolio_url": "Portfolio/personal website if present",
        "summary": "Professional summary/objective statement",
        "work_experience": [
          {
            "company": "Company name",
            "position": "Job title",
            "duration": "Employment period",
            "description": "Job description and achievements"
          }
        ],
        "education": [
          {
            "institution": "School/University name",
            "degree": "Degree obtained",
            "field": "Field of study",
            "graduation_date": "Graduation date"
          }
        ],
        "technical_skills": ["skill1", "skill2", ...],
        "soft_skills": ["skill1", "skill2", ...],
        "projects": [
          {
            "name": "Project name",
            "description": "Project description",
            "technologies": ["tech1", "tech2", ...]
          }
        ],
        "certifications": [
          {
            "name": "Certification name",
            "issuer": "Issuing organization",
            "date": "Date obtained"
          }
        ],
        "resume_rating": "Rate the resume on a scale of 1-10 based on content, organization, and relevance",
        "improvement_areas": "Provide 3-5 specific areas where the resume could be improved",
        "upskill_suggestions": ["skill1", "skill2", ...]
      }
      
      Ensure all fields are properly filled based on the resume content. If information for a field is not available, use null or an empty array as appropriate.
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    // The model should return a JSON string, but we'll handle potential formatting issues
    try {
      // Find JSON content within the response (in case there's any extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : text;
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Error parsing JSON from Gemini response:', parseError);
      throw new Error('Failed to parse analysis results');
    }
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    throw new Error('Failed to analyze resume with AI');
  }
}

module.exports = {
  extractTextFromPDF,
  analyzeResumeWithGemini
};