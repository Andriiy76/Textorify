// backend/db/db.js
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');  //  Вернули!

// const dbPath = '../../database.db';
const dbPath = path.resolve(__dirname, '../../database.db'); //  Исправленный путь!


async function connectToDatabase() {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.run('PRAGMA foreign_keys = ON;');

    await db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `);

    console.log('Connected to the database.');
    return db;

  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

module.exports = connectToDatabase;