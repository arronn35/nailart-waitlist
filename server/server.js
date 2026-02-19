import 'dotenv/config';
import express from 'express';
import crypto from 'crypto';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import {
    addRegistration,
    getAllRegistrations,
    getRegistrationCount,
    deleteRegistration,
    emailExists,
} from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Admin Password ─────────────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nailart2026';
const activeTokens = new Set();

function generateToken() {
    const token = crypto.randomBytes(32).toString('hex');
    activeTokens.add(token);
    return token;
}

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    const token = authHeader.slice(7);
    if (!activeTokens.has(token)) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    next();
}

// Middleware
app.use(express.json());

// CORS for dev (Vite proxies in production)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// ─── Auth Routes ────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        const token = generateToken();
        console.log('[AUTH] Admin logged in');
        res.json({ success: true, token });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

app.post('/api/auth/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        if (activeTokens.has(token)) {
            return res.json({ valid: true });
        }
    }
    res.json({ valid: false });
});

app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        activeTokens.delete(authHeader.slice(7));
    }
    res.json({ success: true });
});

// ─── HTTP Server ────────────────────────────────────────────
const server = createServer(app);

// ─── WebSocket Server ───────────────────────────────────────
const wss = new WebSocketServer({ server, path: '/ws' });

const clients = new Set();

wss.on('connection', async (ws) => {
    clients.add(ws);
    console.log(`[WS] Client connected (${clients.size} total)`);

    try {
        const count = await getRegistrationCount();
        ws.send(JSON.stringify({ type: 'init', count }));
    } catch (err) {
        console.error('[WS] Error sending init:', err);
    }

    ws.on('close', () => {
        clients.delete(ws);
        console.log(`[WS] Client disconnected (${clients.size} total)`);
    });
});

function broadcast(data) {
    const message = JSON.stringify(data);
    for (const client of clients) {
        if (client.readyState === 1) {
            client.send(message);
        }
    }
}

// ─── API Routes ─────────────────────────────────────────────

// GET all registrations (admin only)
app.get('/api/waitlist', requireAuth, async (req, res) => {
    try {
        const registrations = await getAllRegistrations();
        const count = await getRegistrationCount();
        res.json({ registrations, count });
    } catch (err) {
        console.error('[API] Error fetching registrations:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST new registration
app.post('/api/waitlist', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.trim()) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (await emailExists(email.trim())) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
        const registration = await addRegistration(email.trim().toLowerCase(), ip);

        const count = await getRegistrationCount();
        broadcast({
            type: 'new_registration',
            registration,
            count,
        });

        console.log(`[API] New registration: ${email}`);
        res.status(201).json({ success: true, registration });
    } catch (err) {
        console.error('[API] Error adding registration:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a registration (admin only)
app.delete('/api/waitlist/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteRegistration(Number(id));

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Registration not found' });
        }

        const count = await getRegistrationCount();
        broadcast({
            type: 'delete_registration',
            id: Number(id),
            count,
        });

        console.log(`[API] Deleted registration #${id}`);
        res.json({ success: true });
    } catch (err) {
        console.error('[API] Error deleting registration:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─── Start Server ───────────────────────────────────────────
server.listen(PORT, () => {
    console.log(`\n  ✦  NailArt Waitlist Server (Supabase)`);
    console.log(`  ➜  API:       http://localhost:${PORT}/api/waitlist`);
    console.log(`  ➜  WebSocket: ws://localhost:${PORT}/ws\n`);
});
