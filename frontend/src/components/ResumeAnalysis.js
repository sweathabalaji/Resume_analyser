import React from 'react';
import './ResumeAnalysis.css';

const ResumeAnalysis = ({ analysisData }) => {
  if (!analysisData) return null;

  const {
    name,
    email,
    phone,
    linkedin_url,
    portfolio_url,
    summary,
    work_experience,
    education,
    technical_skills,
    soft_skills,
    projects,
    certifications,
    resume_rating,
    improvement_areas,
    upskill_suggestions
  } = analysisData;

  // Function to render rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 10; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star full">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    
    return stars;
  };

  return (
    <div className="resume-analysis-container">
      <div className="analysis-header">
        <h2>Resume Analysis Results</h2>
        <div className="rating-container">
          <span className="rating-label">Overall Rating:</span>
          <div className="rating-stars">
            {renderRatingStars(resume_rating)}
            <span className="rating-number">{resume_rating}/10</span>
          </div>
        </div>
      </div>
      
      <div className="analysis-sections">
        {/* Personal Information Section */}
        <section className="analysis-section">
          <h3>Personal Information</h3>
          <div className="personal-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{name || 'Not found'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{email || 'Not found'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{phone || 'Not found'}</span>
            </div>
            {linkedin_url && (
              <div className="info-item">
                <span className="info-label">LinkedIn:</span>
                <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="info-link">
                  {linkedin_url}
                </a>
              </div>
            )}
            {portfolio_url && (
              <div className="info-item">
                <span className="info-label">Portfolio:</span>
                <a href={portfolio_url} target="_blank" rel="noopener noreferrer" className="info-link">
                  {portfolio_url}
                </a>
              </div>
            )}
          </div>
        </section>
        
        {/* Summary Section */}
        {summary && (
          <section className="analysis-section">
            <h3>Professional Summary</h3>
            <p className="summary-text">{summary}</p>
          </section>
        )}
        
        {/* Work Experience Section */}
        {work_experience && work_experience.length > 0 && (
          <section className="analysis-section">
            <h3>Work Experience</h3>
            <div className="experience-list">
              {work_experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h4>{exp.position}</h4>
                    <span className="company-name">{exp.company}</span>
                    {exp.duration && <span className="duration">{exp.duration}</span>}
                  </div>
                  {exp.description && <p className="experience-description">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="analysis-section">
            <h3>Education</h3>
            <div className="education-list">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-header">
                    <h4>{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                    <span className="institution-name">{edu.institution}</span>
                    {edu.graduation_date && <span className="graduation-date">{edu.graduation_date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills Section */}
        <section className="analysis-section skills-section">
          <h3>Skills</h3>
          <div className="skills-container">
            {technical_skills && technical_skills.length > 0 && (
              <div className="skill-category">
                <h4>Technical Skills</h4>
                <div className="skill-tags">
                  {technical_skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            
            {soft_skills && soft_skills.length > 0 && (
              <div className="skill-category">
                <h4>Soft Skills</h4>
                <div className="skill-tags">
                  {soft_skills.map((skill, index) => (
                    <span key={index} className="skill-tag soft">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="analysis-section">
            <h3>Projects</h3>
            <div className="projects-list">
              {projects.map((project, index) => (
                <div key={index} className="project-item">
                  <h4>{project.name}</h4>
                  {project.description && <p className="project-description">{project.description}</p>}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="project-technologies">
                      <span className="tech-label">Technologies:</span>
                      <div className="tech-tags">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <section className="analysis-section">
            <h3>Certifications</h3>
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <span className="cert-name">{cert.name}</span>
                  {cert.issuer && <span className="cert-issuer">by {cert.issuer}</span>}
                  {cert.date && <span className="cert-date">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Improvement Areas Section */}
        {improvement_areas && (
          <section className="analysis-section improvement-section">
            <h3>Areas for Improvement</h3>
            <div className="improvement-content">
              <p>{improvement_areas}</p>
            </div>
          </section>
        )}
        
        {/* Upskill Suggestions Section */}
        {upskill_suggestions && upskill_suggestions.length > 0 && (
          <section className="analysis-section upskill-section">
            <h3>Recommended Skills to Develop</h3>
            <div className="upskill-tags">
              {upskill_suggestions.map((skill, index) => (
                <span key={index} className="upskill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;