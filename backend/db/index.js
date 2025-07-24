const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Create a new database or open existing one
const db = new sqlite3.Database('./resume_analyzer.sqlite');

// Create a query function that mimics the pg pool.query interface
const query = (text, params) => {
  return new Promise((resolve, reject) => {
    // Check if this is a SELECT query
    const isSelect = text.trim().toLowerCase().startsWith('select');
    
    if (isSelect) {
      db.all(text, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve({ rows });
        }
      });
    } else {
      db.run(text, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ rowCount: this.changes, rows: [] });
        }
      });
    }
  });
};

module.exports = {
  query,
  db
};