# GapFinder AI

A responsive study companion prototype that turns course notes into a diagnostic workflow and focused revision checklist.

## Current demo features
- Dashboard with a high-level study snapshot
- Material list and in-session TXT/Markdown note loading
- Topic map with illustrative mastery estimates
- Five-question diagnostic quiz with scoring and per-topic status estimates
- Revision checklist with browser-session state
- Study assistant using local keyword matching against the notes currently loaded

## Technology
React, TypeScript, Vite, Lucide icons and CSS.

## Run locally
Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

## Render deployment
Create a **Web Service** connected to this repository and the `main` branch.
- Runtime: Node
- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Plan: Free is sufficient for a demo

The app is a Vite SPA and serves its built static bundle through `vite preview`. Render supplies `PORT` at runtime.

## Important limitations
This is a demo implementation. The built-in questions and topic estimates are illustrative. PDF files are not parsed to extract text in the current browser-only version; use TXT/Markdown or paste text into the notes area. The assistant uses local keyword matching, not an external LLM or vector database. Data is held in component state for the current browser session and there is no production authentication or shared database. Do not use it to store sensitive material.

## Security
Never commit API keys, `.env` files, access tokens, user data, or uploaded course documents. Configure any future backend secrets in Render's environment settings.
