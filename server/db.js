import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'waitlist.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrent performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    ip TEXT
  )
`);

export function addRegistration(email, ip = null) {
    const stmt = db.prepare(
        'INSERT INTO registrations (email, ip) VALUES (?, ?)'
    );
    const result = stmt.run(email, ip);
    return getRegistrationById(result.lastInsertRowid);
}

export function getRegistrationById(id) {
    return db.prepare('SELECT * FROM registrations WHERE id = ?').get(id);
}

export function getAllRegistrations() {
    return db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all();
}

export function getRegistrationCount() {
    return db.prepare('SELECT COUNT(*) as count FROM registrations').get().count;
}

export function deleteRegistration(id) {
    return db.prepare('DELETE FROM registrations WHERE id = ?').run(id);
}

export function emailExists(email) {
    return !!db.prepare('SELECT 1 FROM registrations WHERE email = ?').get(email);
}

export default db;
