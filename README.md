# RUNTRACK — Run. Track. Improve.

A full-stack running tracker: React + Vite frontend with real browser GPS tracking,
Leaflet maps, and Recharts analytics, backed by an Express + Prisma + PostgreSQL API
with JWT authentication.

## Project structure

```
runtrack/
├── frontend/   React + Vite + Tailwind + Leaflet + Zustand + Recharts
└── backend/    Express + Prisma + PostgreSQL + JWT
```

## 1. Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env: set DATABASE_URL to your PostgreSQL connection string, and JWT_SECRET.

npm install
npm run prisma:migrate   # creates tables from prisma/schema.prisma
npm run seed              # optional: creates a demo account with sample runs
npm run dev                # starts the API on http://localhost:4000
```

Demo account (only if you ran `npm run seed`): `demo@runtrack.app` / `password123`

### Required: a running PostgreSQL instance
`prisma migrate dev` needs a reachable PostgreSQL database. Easiest local options:

```bash
# Docker
docker run --name runtrack-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=runtrack -p 5432:5432 -d postgres:16
# then DATABASE_URL="postgresql://postgres:postgres@localhost:5432/runtrack?schema=public"
```

## 2. Frontend setup

```bash
cd frontend
cp .env.example .env
# VITE_API_URL should point at your backend, e.g. http://localhost:4000/api

npm install
npm run dev   # starts the app on http://localhost:5173
```

## 3. Using the app

1. Open http://localhost:5173, register an account (or log in with the seed demo account).
2. From the Dashboard, tap **START RUN**.
3. Grant the browser location permission when prompted — this is real GPS,
   not simulated data.
4. Move around; distance, timer, pace, speed, and the route on the map update live.
5. Pause / Resume as needed.
6. Tap **FINISH**, confirm, review the summary, then **SAVE RUN**.
7. The saved run appears in Activities, contributes to Dashboard and Statistics
   totals, updates any active Goals, and recalculates Personal Records.

## Notes on real data, no fakes

- Distance is computed with the Haversine formula from actual GPS coordinates
  (`frontend/src/utils/distance.js`), with noise/jump filtering.
- Calories use the MET formula and require a profile weight; if no weight is
  set, the UI shows "Estimated calories unavailable" instead of a fabricated number.
- Personal Records are recalculated server-side from real saved activities on
  every create/delete (`backend/services/recordsService.js`) — never entered manually.
- An in-progress run is persisted to IndexedDB (falling back to localStorage)
  so it survives a reload or dropped connection.

## Login & Register design system

The Login and Register pages share one authentication design system so they
read as a single product experience:

- `frontend/src/styles/auth.css` — design tokens, the three responsive modes
  (landscape desktop, tablet portrait, mobile document-flow), and the
  staggered entrance animation (respecting `prefers-reduced-motion`).
- `frontend/src/components/auth/` — `AuthLayout`, `AuthVisual` (an original
  CSS/SVG route-line scene — no stock imagery), `AuthCard`, `AuthField`, and
  `AuthButton`, reused by both `pages/auth/Login.jsx` and `pages/auth/Register.jsx`.

Both pages call into the same, unmodified authentication logic
(`hooks/useAuth.js` → `services/authService.js` → `POST /api/auth/login` and
`/api/auth/register`); only the visual layer changed. There is no Google
sign-in button, because the backend does not implement Google OAuth — the UI
never implies functionality that isn't wired up.

## Tech stack

**Frontend:** React 18, Vite, React Router DOM, Tailwind CSS, Zustand, React Hook
Form + Zod, Leaflet/React-Leaflet, Recharts, Axios, date-fns, Lucide icons.

**Backend:** Node.js, Express, Prisma ORM, PostgreSQL, JWT auth, bcrypt, Zod
validation.
