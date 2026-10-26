# GapFinder AI

GapFinder AI is a responsive study companion prototype that turns course notes into a diagnostic workflow and focused revision checklist.

## Stack
- **Next.js App Router**
- React + TypeScript
- Lucide icons
- CSS

## Run locally
Node.js 20.9+ recommended.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production
```bash
npm run build
npm run start
```

## Render deployment
This repository is configured for a Render Node Web Service:
- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Branch: `main`

Render should redeploy automatically after changes are pushed to `main`.

## Demo features
- Dashboard with study snapshot
- Material list and in-session TXT/Markdown note loading
- Topic map with illustrative mastery estimates
- Five-question diagnostic quiz with scoring and per-topic status estimates
- Revision checklist
- Study assistant using local keyword matching against currently loaded notes

## Limitations to disclose
This is a demo prototype. Built-in questions and topic estimates are illustrative. PDF files are not parsed to extract their text in this browser-only version; use TXT/Markdown or paste notes. The assistant uses local keyword matching, not an external LLM or vector database. Data is held in React component state for the current browser session. There is no production authentication or shared database. Do not store sensitive material.

## Security
Never commit API keys, `.env` files, access tokens, user data, or uploaded course documents. Configure future backend secrets in Render environment settings.
