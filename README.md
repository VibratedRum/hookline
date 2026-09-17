# Hookline

Score and rewrite stream/YouTube titles + hooks. Product of **Lumen Labs**.

Free 3 scores/day → Pro $9/mo (Stripe at launch). Waitlist-first MVP.

## Run locally

```bash
cd hookline
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- Landing: `/`
- Tool UI: `/app`
- Waitlist API: `POST /api/waitlist` → `data/waitlist.json`

```bash
npm run build
npm start
```

Node 20+ recommended.

## Waitlist

Entries are stored in `data/waitlist.json` (gitignored). Create `data/` if missing — the API creates it on first POST.

Fields: `email` (required), `platform` (Twitch / Kick / YouTube / Other), `source` (UTM + `?ref=`).

Duplicate emails return a friendly “you’re already on the list.”

**Vercel note:** serverless filesystem is ephemeral. Keep JSON for local/dev; before public traffic, swap the waitlist store for Vercel KV, Postgres, or a sheet. The route handler stays the same shape.

## Deploy to Vercel (once Origin repo exists)

Do **not** push from this box unless Product Engineer / Prize creates the Origin repo.

When the GitHub origin exists:

1. Create an empty repo (e.g. `lumen-labs/hookline`).
2. From this app directory:

```bash
git init   # if not already a local repo
git add .
git commit -m "Hookline MVP"
git remote add origin git@github.com:ORG/hookline.git
git branch -M main
git push -u origin main
```

3. In [Vercel](https://vercel.com): Import the repo → Framework: Next.js → Deploy.
4. After Stripe is ready, add env vars from `src/lib/stripe.ts` (Checkout + webhook). No Stripe keys are required for this MVP.

Free Hobby deploy URL is fine for waitlist traffic.

## Stripe

See comments in `src/lib/stripe.ts`. Checkout session + webhook routes are **not** implemented yet; the Upgrade button is a stub.

## Stack

Next.js App Router, TypeScript, Tailwind CSS. Heuristic scorer (no LLM API).
