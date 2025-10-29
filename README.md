# books_buy

A small React + Vite application for browsing and managing books. This project uses Vite, React, Tailwind, Supabase for backend/auth, React Query for data fetching, and Zod + React Hook Form for validation.

This README replaces the default Vite template copy with focused project setup and development instructions.

## Tech stack

- React 19
- Vite
- Tailwind CSS
- Supabase (JS client)
- React Router
- React Hook Form + Zod
- TanStack Query (React Query)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Create a local environment file

Create a `.env` file in the project root (do NOT commit it). The app expects the following variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These variable names come from `src/lib/supabaseClient.js` where the Supabase client is created from `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.

3. Start the dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser (or the port Vite reports).

## Available scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

The scripts are defined in `package.json`.

## Environment & deployment notes

- Keep Supabase keys secret in production. Use your hosting provider's environment variable settings (for example, Vercel's dashboard) instead of committing secrets.
- This project includes a `vercel.json` file; if you deploy to Vercel, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your Vercel project settings.

## Project structure (high level)

- `src/` — application source
	- `src/lib/supabaseClient.js` — Supabase client initialization
	- `src/pages/` — page components (Home, Books, Admin, Profile, etc.)
	- `src/components/` — shared UI and guards
	- `src/hooks/` — custom hooks (e.g., `useBooks.js`)
	- `src/schemas/` — Zod schemas for forms

## Contributing

Small changes and fixes are welcome. Please include a short description of the change and keep commits focused.

## License

This repository currently has no license file. Add one if you plan to share or publish this project.

---

If you'd like, I can also:
- add a `.env.example` file
- add a one-line CI/deploy workflow for Vercel/GitHub Actions
- add npm run scripts for formatting/tests if you want them

Tell me what you'd like next.
