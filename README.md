# Resume Analyzer

A full-stack web application that analyzes resumes using AI, extracts key information, and provides feedback for improvement.

## Features

- **Resume Analysis**: Upload a PDF resume and get AI-powered analysis
- **Data Extraction**: Automatically extract structured data from resumes
- **AI Feedback**: Get ratings, improvement suggestions, and skill recommendations
- **History Tracking**: View all previously uploaded resumes and their analyses

## 📸 Application Screenshots

### 🖼️ Screenshot 1
![Screenshot 1](https://github.com/sweathabalaji/Resume_analyser/blob/main/screenshots/Screenshot%202025-07-24%20at%209.02.10%20PM.png?raw=true)

### 🖼️ Screenshot 2
![Screenshot 2](https://github.com/sweathabalaji/Resume_analyser/blob/main/screenshots/Screenshot%202025-07-24%20at%209.03.32%20PM.png?raw=true)


## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **API Style**: REST API
- **LLM Integration**: Google Gemini API via @google/generative-ai SDK
- **PDF Parsing**: pdf-parse

## Project Structure

```
resume-analyzer/
├── backend/           # Node.js Express backend
│   ├── controllers/   # Request handlers
│   ├── db/            # Database connection and queries
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── server.js      # Main server file
├── frontend/          # React frontend
│   ├── public/        # Static files
│   └── src/           # React components and styles
├── sample_data/       # Sample resumes for testing
└── screenshots/       # Application screenshots
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database
- Google Gemini API key

### Database Setup

1. Create a PostgreSQL database named `resume_analyzer`
2. Run the SQL script in `backend/db/schema.sql` to create the necessary tables

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   DB_USER=your_postgres_user
   DB_HOST=localhost
   DB_DATABASE=resume_analyzer
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   PORT=5000
   GOOGLE_API_KEY=your_gemini_api_key
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Upload a Resume**:
   - Go to the "Resume Analysis" tab
   - Click on "Choose PDF file" to select a resume
   - Click "Analyze Resume" to upload and analyze

2. **View Analysis Results**:
   - After uploading, the analysis will be displayed
   - Review the extracted information, rating, and suggestions

3. **View History**:
   - Go to the "History" tab to see all previously uploaded resumes
   - Click "View Details" on any resume to see its full analysis
