# NailArt Waitlist

A renaissance-themed waitlist landing page with real-time admin dashboard.

## Features

- **Landing Page** — email signup with animated marquee, showcase gallery, philosophy section
- **Admin Dashboard** (`/admin`) — password-protected, real-time registration viewer via WebSocket
- **API** — Express + SQLite backend with token-based auth

## Quick Start

```bash
npm install
npm run dev:full
```

- Landing page: http://localhost:5173
- Admin panel: http://localhost:5173/admin


## Configuration

Set environment variables before starting:

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:full` | Start both Vite + API server |
| `npm run dev` | Vite only (frontend) |
| `npm run dev:server` | API server only |
| `npm run build` | Production build |

## Tech Stack

- React 18 + Vite + TailwindCSS v4
- Express + better-sqlite3 + WebSocket
- Framer Motion for animations

## License

Images from [Unsplash](https://unsplash.com/license). UI components adapted from [shadcn/ui](https://ui.shadcn.com/) (MIT).
