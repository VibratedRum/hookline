# Hookline MVP — status

## Done

- Landing `/` built from `LANDING-COPY.md` (meta, nav, hero, benefits, how-it-works, who-it’s-for, pricing, final CTA, footer).
- Waitlist form: email required; optional platform (Twitch/Kick/YouTube/Other); hidden `source` from UTM / `?ref=`.
- `POST /api/waitlist` writes `data/waitlist.json`; duplicate email → “You’re already on the list.”; success → “You’re on the list. We’ll email when Hookline opens.”
- Static before/after demo card under hero (score 28 / “Playing games lol”).
- `/app` tool: paste title → 0–100 score, short rationale, exactly 3 heuristic rewrites.
- Scorer factors: length, power words, numbers, curiosity, clarity, clickbait penalties. No LLM.
- Free tier: 3 scores per calendar day via `localStorage`; over limit shows Upgrade to Pro $9/mo + waitlist link.
- Platforms framing: YouTube / Twitch / Kick.
- Dark-friendly Lumen Labs / Hookline branding; mobile-usable layout.
- Stripe plug-in comments in `src/lib/stripe.ts` + README (no keys).
- `data/waitlist.json` gitignored.

## Stubbed

- Stripe Checkout + webhook (documented only). Upgrade button no-ops / scrolls to stub copy.
- Pro entitlement (everyone is free-tier; gate is client `localStorage` only — trivially bypassable, fine for MVP).
- Waitlist persistence on Vercel (local JSON; needs KV/DB for production).
- Footer contact: `TBD (Prize to set)` until a real address is chosen.
- Auth / accounts: none.
- Email send (Resend/Loops): none; capture only.

## Blockers

- None for local MVP. `npm run build` is the gate.
- Do not create git remote / GitHub / Vercel from this box until Origin repo exists.
