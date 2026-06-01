# E-Learning Platform (Full Stack)

A product-level e-learning app: course browsing, authentication, enrollment,
progress tracking, admin controls. Built as a monorepo with `frontend/` and
`backend/` directories.

## Tech stack
- **Frontend:** React (Vite) + React Router + Context API, styled with Tailwind CSS, Axios.
- **Backend:** Node.js + Express, MongoDB (Mongoose), JWT auth (httpOnly cookie + Bearer fallback), bcrypt.
- **Testing:** Vitest + React Testing Library (frontend), Jest + Supertest (backend).

## Project structure
```
elearning-platform/
├── backend/      # Express + MongoDB API
└── frontend/     # React (Vite) client
```

## Quick start

### 1. Backend
```bash
cd backend
cp .env.example .env        # set MONGO_URI + JWT_SECRET
npm install
npm run seed                # optional: demo data + accounts
npm run dev                 # http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env        # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                 # http://localhost:5173
```

### Demo accounts (after seeding)
- Admin: `admin@demo.com` / `password123`
- User:  `user@demo.com`  / `password123`

## API endpoints
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signup` | Register |
| POST | `/api/auth/login` | Login (returns JWT) |
| GET  | `/api/auth/me` | Current user (protected) |
| GET  | `/api/courses` | List with `?category=&search=&difficulty=&maxPrice=&page=` |
| GET  | `/api/courses/:id` | Course by id or slug |
| POST | `/api/courses` | Create (admin) |
| PUT  | `/api/courses/:id` | Update (admin) |
| DELETE | `/api/courses/:id` | Delete (admin) |
| POST | `/api/enroll` | Enroll in a course |
| GET  | `/api/enrollments/me` | My enrollments + progress |
| PUT  | `/api/enrollments/:id/progress` | Update lesson progress |
| GET  | `/api/users` | List users (admin) |
| GET  | `/api/reports` | Simple metrics (admin) |

## Frontend routes
`/` Landing · `/courses` listing · `/courses/:slug` detail · `/login` · `/signup`
· `/dashboard` (protected) · `/admin` (admin only)

## Security
- Passwords hashed with bcrypt.
- JWT with expiry, stored in httpOnly cookie (Bearer token fallback in localStorage).
- Admin routes protected by role middleware.
- Server-side input validation.
- Secrets in `.env` (see `.env.example`).

## Deployment
- **Frontend → Vercel:** set `VITE_API_URL` to your API base URL.
- **Backend → Render/Heroku:** set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`.
- **Database → MongoDB Atlas:** whitelist your server IPs.

## Tests
```bash
cd backend  && npm test     # requires running MongoDB
cd frontend && npm test
```
