import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .data directory exists
const dataDir = path.join(__dirname, '..', '.data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'waitlist.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        ip TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

export async function addRegistration(email, ip = null) {
    try {
        const insert = db.prepare('INSERT INTO registrations (email, ip) VALUES (?, ?)');
        const result = insert.run(email, ip);

        // Return the newly inserted row
        return getRegistrationById(result.lastInsertRowid);
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            throw new Error('Email already registered');
        }
        throw error;
    }
}

export async function getRegistrationById(id) {
    const stmt = db.prepare('SELECT * FROM registrations WHERE id = ?');
    return stmt.get(id);
}

export async function getAllRegistrations() {
    const stmt = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC');
    return stmt.all();
}

export async function getRegistrationCount() {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM registrations');
    const result = stmt.get();
    return result.count;
}

export async function deleteRegistration(id) {
    const stmt = db.prepare('DELETE FROM registrations WHERE id = ?');
    const result = stmt.run(id);
    return { changes: result.changes };
}

export async function emailExists(email) {
    const stmt = db.prepare('SELECT 1 FROM registrations WHERE email = ?');
    const result = stmt.get(email);
    return !!result;
}

export default db;
