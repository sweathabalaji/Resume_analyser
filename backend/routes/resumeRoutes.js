const express = require('express');
const multer = require('multer');
const { uploadAndAnalyzeResume, getAllResumes, getResumeById } = require('../controllers/resumeController');

const router = express.Router();

// Configure multer for memory storage (we'll process the file in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

// Route to upload and analyze a resume
router.post('/upload', upload.single('resume'), uploadAndAnalyzeResume);

// Route to get all resumes (summary data for the history view)
router.get('/', getAllResumes);

// Route to get a specific resume by ID
router.get('/:id', getResumeById);

module.exports = router;