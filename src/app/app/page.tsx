import Link from "next/link";
import ScoreTool from "@/components/ScoreTool";

export const metadata = {
  title: "Score a title — Hookline | Lumen Labs",
  description: "Paste a title or hook. Get a 0–100 score and 3 sharper rewrites.",
};

export default function AppPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            Hookline
          </Link>
          <nav className="flex items-center gap-4 text-sm text-zinc-400">
            <Link href="/#pricing" className="hover:text-zinc-100">
              Pricing
            </Link>
            <Link
              href="/#waitlist"
              className="rounded-lg bg-violet-500 px-3 py-1.5 font-semibold text-white hover:bg-violet-400"
            >
              Join waitlist
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-300">
            Lumen Labs · Hookline
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Score a title</h1>
          <p className="mt-3 text-zinc-400">
            Paste a stream or YouTube title. Get a 0–100 score and 3 rewrites. Free: 3 scores/day.
          </p>
        </div>
        <ScoreTool />
      </main>
      <footer className="border-t border-zinc-800 px-4 py-6 text-center text-xs text-zinc-500">
        © Lumen Labs · Hookline · YouTube / Twitch / Kick
      </footer>
    </div>
  );
}
