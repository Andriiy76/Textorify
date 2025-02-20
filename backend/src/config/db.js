// backend/src/config/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', '..', '..', process.env.DATABASE_FILE || 'database.db');

async function connectToDatabase() {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });

    await db.exec('PRAGMA foreign_keys = ON;');

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          is_email_verified BOOLEAN NOT NULL DEFAULT 0,
          email_verification_token TEXT,
          email_verification_token_expires_at INTEGER,
          plan_id INTEGER REFERENCES plans(id)
        );
    `);
    await db.exec(`
    CREATE TABLE IF NOT EXISTS plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      price_monthly REAL,
      max_requests_per_month INTEGER,
      can_generate_images BOOLEAN DEFAULT 0,
      can_generate_audio BOOLEAN DEFAULT 0,
      can_use_custom_models BOOLEAN DEFAULT 0
    );
  `);
  //  Добавляем проверку и вставку Free плана:
  const freePlan = await db.get("SELECT * FROM plans WHERE name = 'free'");
  if (!freePlan) {
    await db.run(`
      INSERT INTO plans (name, description, price_monthly, max_requests_per_month)
      VALUES ('free', 'Free plan', 0.00, 100)  --  Или другие значения по умолчанию
    `);
    console.log("Added 'free' plan to the database.");
  }

    console.log('Connected to the database.');
    return db;
}

export default connectToDatabase;