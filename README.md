# Parental Legacy & Life Factors Calculator — Frontend

Frontend for the Parental Legacy & Life Factors Calculator ("LegacyLens"). Lets a user register with their date of birth, generate a deterministic life-factor breakdown split between their parents/guardians, and compare it against other users on the platform.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Redux Toolkit (`createSlice` / `createAsyncThunk`) for state + API calls
- React Router v7
- Axios (with silent access-token refresh on 401)
- Recharts for bar/pie charts
- react-toastify for error toasts

## Features

- Register / login / logout, backed by the API's JWT auth (cookie-based and/or localStorage-based sessions)
- Auto-login on page load — tries the current session first, falls back to a refresh-token exchange
- Generate and view your own LegacyLens breakdown (`/me`)
- Browse every registered user's LegacyLens summary and drill into an individual user's breakdown (`/dashboard`)
- One shared responsive navbar (desktop + mobile) across every route

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root (see `.env.sample`):

   ```
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

App runs at `http://localhost:5173`.

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`      | Start the Vite dev server       |
| `npm run build`    | Production build to `dist/`     |
| `npm run preview`  | Preview the production build    |
| `npm run lint`     | Run Oxlint                      |

## Project Structure

```
src/
├── App.jsx                # Routes + session bootstrap
├── axiosInstance.js        # Axios instance with auth interceptors
├── components/
│   ├── nav/                # Desktop/mobile navbar variants
│   └── charts/              # Bar/pie chart components
├── hooks/
│   └── useIsDesktop.js      # JS-driven responsive breakpoint hook
├── layouts/                 # PublicLayout / DashboardLayout
├── store/
│   ├── index.js
│   └── slices/               # userSlice, legacySlice (thunks + reducers)
└── utils/
    └── computeLegacy.js      # Date formatting helpers
```

## Deployment (Vercel)

1. Import this repo as a new Vercel project. Framework preset: **Vite**.
2. Build command: `npm run build` · Output directory: `dist`.
3. Environment variable: `VITE_API_BASE_URL` = your deployed backend's URL + `/api/v1`.
4. `vercel.json` in this repo already adds the SPA rewrite needed for React Router (`/*` → `/index.html`), so deep links won't 404 on refresh.
5. Env var changes require a redeploy — Vite bakes them in at build time, they aren't read at runtime.
