# The Vault

Marketing site for The Vault — BC's 19+ verified vape terminal. Built with React 19, TypeScript, and Vite.

## Routes

| Path | Page |
|------|------|
| `/` | Home — hero, features, revenue calculator, venue application form |
| `/hardware` | Hardware specs and unit details |
| `/compliance` | TVPA compliance information |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

Build output goes to `dist/`.

## Deploy to GitHub

1. Create a new repository on GitHub (empty — no README or `.gitignore`).
2. Push this project:

```bash
git remote add origin https://github.com/YOUR_USERNAME/the-vault.git
git push -u origin main
```

## Deploy to Vercel

[Vercel](https://vercel.com) auto-detects Vite. Connect the GitHub repo and use these settings (defaults should match):

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

`vercel.json` includes SPA rewrites so client-side routes (`/hardware`, `/compliance`) work on refresh and direct links.

### Manual deploy (CLI)

```bash
npm i -g vercel
vercel
```

Follow the prompts; Vercel will detect the Vite project automatically.

## Project structure

```
src/
├── pages/           Route-level page components
├── components/      UI, layout, and section components
├── data/content.ts  Copy and static content
├── hooks/           Shared React hooks
└── assets/          Product images
```

## Notes

- Form submissions are emailed via [Resend](https://resend.com) using React Email templates and Vercel serverless functions. Nothing is stored locally or in a database.
- All submissions go to **thevaultvendr@gmail.com**.

### Email setup (Vercel)

1. Copy `.env.example` to `.env.local` for local testing.
2. Create a [Resend](https://resend.com) account and add an API key.
3. Verify your sending domain in Resend, then set `RESEND_FROM_EMAIL` (e.g. `The Vault Vending <hello@yourdomain.com>`).
4. In the Vercel project dashboard, add environment variables:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
5. Redeploy after adding env vars.

### Form endpoints

| Form | Page | API route |
|------|------|-----------|
| Partner application | `/`, `/apply` | `POST /api/application` |
| Contact message | `/contact` | `POST /api/contact` |
| FAQ inquiry | `/faq` | `POST /api/inquiry` |

### Local development with API routes

Vite serves the frontend only. To test form submissions locally, run:

```bash
npm run dev:vercel
```

This starts Vercel dev, which serves both the Vite app and `/api/*` serverless functions.
