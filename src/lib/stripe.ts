/**
 * Stripe-ready stubs — no keys required for this MVP.
 *
 * Where Checkout + webhook plug in once Origin repo exists and we want paid Pro:
 *
 * 1) Env (Vercel + local .env.local, never commit):
 *    STRIPE_SECRET_KEY=
 *    STRIPE_WEBHOOK_SECRET=
 *    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
 *    STRIPE_PRICE_PRO_MONTHLY=          // $9/mo Price ID
 *
 * 2) Checkout — POST /api/stripe/checkout
 *    - Create a Stripe Checkout Session in `mode: "subscription"`
 *    - `line_items: [{ price: process.env.STRIPE_PRICE_PRO_MONTHLY, quantity: 1 }]`
 *    - success_url / cancel_url back to /app?pro=1 or /app?canceled=1
 *    - Wire the "Upgrade to Pro — $9/mo" button in ScoreTool to this route
 *      (currently a no-op that scrolls to the upgrade stub copy)
 *
 * 3) Webhook — POST /api/stripe/webhook
 *    - Verify signature with STRIPE_WEBHOOK_SECRET
 *    - Handle checkout.session.completed, customer.subscription.updated/deleted
 *    - Persist entitlement (email → Pro) — swap local JSON waitlist for a real
 *      store (Postgres / KV) before going live on Vercel (serverless FS is ephemeral)
 *
 * 4) Client entitlement
 *    - Today: free tier is 3/day via localStorage (see src/lib/usage.ts)
 *    - After Stripe: skip the gate when the signed-in (or emailed) user is Pro
 *
 * Do not add stripe npm package until keys + Price ID exist.
 */

export const PRO_PRICE_DISPLAY = "$9/mo";
export const STRIPE_READY = false;
