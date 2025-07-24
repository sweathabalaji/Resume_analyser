/**
 * Database initialization script
 * Run this script to create the necessary tables in your SQLite database
 * Usage: node init-db.js
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

async function initializeDatabase() {
  try {
    // Create a new database or open existing one
    const db = new sqlite3.Database('./resume_analyzer.sqlite');
    console.log('Connected to SQLite database');
    
    // Read the schema SQL file
    const schemaPath = path.join(__dirname, 'db', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the SQL commands
    console.log('Creating tables...');
    
    // Use a promise to handle the async execution
    await new Promise((resolve, reject) => {
      db.exec(schemaSql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    
    console.log('Database initialization completed successfully!');
    
    // Close the database connection
    db.close();
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run the initialization function
initializeDatabase();