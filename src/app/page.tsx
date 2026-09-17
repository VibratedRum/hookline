import Nav from "@/components/Nav";
import WaitlistForm from "@/components/WaitlistForm";
import DemoCard from "@/components/DemoCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_55%)]"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-violet-300">
              Lumen Labs · Hookline
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl sm:leading-tight">
              Stop losing clicks to a weak title.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-300">
              Paste any stream or YouTube title. Get a <strong className="font-semibold text-white">0–100 score</strong> and{" "}
              <strong className="font-semibold text-white">3 sharper rewrites</strong> — built for live and VOD, not blog
              posts.
            </p>
            <div className="mx-auto mt-8 max-w-md text-left">
              <WaitlistForm id="waitlist" />
              <p className="mt-3 text-center text-xs text-zinc-500">
                Free when we launch: 3 scores/day. No spam — launch invite only.
              </p>
            </div>
            <p className="mt-6 text-sm font-medium text-zinc-400">
              Titles that stop the scroll before the thumbnail does.
            </p>
            <DemoCard />
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-zinc-800/80 px-4 py-6 text-center sm:px-6">
          <p className="text-sm text-zinc-500">Early access for creators who care about CTR.</p>
        </section>

        {/* Benefits */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h2 className="text-lg font-semibold text-white">Score what matters</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Know if a title will get ignored <strong className="font-semibold text-zinc-200">before</strong> you go
                live — not after the VOD dies.
              </p>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h2 className="text-lg font-semibold text-white">Three rewrites, not one</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Pick the hook that fits your voice, game, and platform. Ship the winner.
              </p>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h2 className="text-lg font-semibold text-white">Built for streams</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Titles and cold-open hooks for Twitch, Kick, and YouTube — not generic “AI writing.”
              </p>
            </article>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-zinc-800/80 bg-zinc-900/30 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold text-white">How it works</h2>
            <ol className="mt-10 space-y-6">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
                  1
                </span>
                <p className="pt-1 text-zinc-200">
                  <strong className="font-semibold text-white">Paste</strong> your title or hook
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
                  2
                </span>
                <p className="pt-1 text-zinc-200">
                  <strong className="font-semibold text-white">Get</strong> a score (0–100) + 3 rewrites
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
                  3
                </span>
                <p className="pt-1 text-zinc-200">
                  <strong className="font-semibold text-white">Ship</strong> the one that pulls viewers in
                </p>
              </li>
            </ol>
            <div className="mt-10 text-center">
              <a
                href="#waitlist"
                className="inline-flex rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400"
              >
                Join the waitlist
              </a>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-white">Who it’s for</h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            You’re a streamer or YouTuber who already creates. The content is fine — the{" "}
            <strong className="font-semibold text-white">packaging</strong> is what’s costing you clicks. Hookline is the
            30-second title check before you hit Go Live or Upload.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            Not for: agencies, brand social teams, or long-form SEO blogs (yet).
          </p>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-zinc-800/80 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-bold text-white">Pricing</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                <h3 className="text-xl font-semibold text-white">Free</h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  <li>3 scores/day</li>
                  <li>Score + 3 rewrites each run</li>
                  <li>Enough to feel the lift</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-violet-500/40 bg-violet-500/10 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Pro — <span className="text-violet-300">$9/mo</span>
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  <li>Unlimited scores + rewrites</li>
                  <li>Title testing as a habit, every stream/upload</li>
                  <li>Priority access to new hook styles (as we ship them)</li>
                </ul>
              </article>
            </div>
            <div className="mt-8 text-center">
              <a
                href="#waitlist"
                className="inline-flex rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400"
              >
                Join waitlist — Pro unlocks at launch
              </a>
              <p className="mt-3 text-xs text-zinc-500">
                Stripe checkout comes with launch; waitlist gets first access.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-zinc-800/80 bg-gradient-to-b from-violet-950/30 to-zinc-950 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Your next title shouldn’t be a coin flip.</h2>
            <p className="mt-4 text-zinc-300">
              Get early access. Free tier when we launch. Pro $9/mo when you’re ready to go unlimited.
            </p>
            <div className="mt-8 text-left">
              <WaitlistForm id="waitlist-final" />
            </div>
            <p className="mt-3 text-xs text-zinc-500">We’ll only email launch + early access. Unsubscribe anytime.</p>
            <p className="mt-6 text-sm text-zinc-500">
              Want to try the scorer now?{" "}
              <Link href="/app" className="font-medium text-violet-300 hover:text-violet-200">
                Open the app
              </Link>
            </p>
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-800 px-4 py-8 text-center text-xs text-zinc-500 sm:px-6">
        <p>© Lumen Labs · Hookline</p>
        <p className="mt-1">Product of Lumen Labs (not affiliated with Twitch, Kick, or YouTube)</p>
        <p className="mt-1">Contact: TBD (Prize to set)</p>
      </footer>
    </>
  );
}
