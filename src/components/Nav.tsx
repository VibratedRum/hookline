import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          Hookline
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-400 sm:gap-6">
          <a href="#how-it-works" className="hidden hover:text-zinc-100 sm:inline">
            How it works
          </a>
          <a href="#pricing" className="hidden hover:text-zinc-100 sm:inline">
            Pricing
          </a>
          <Link href="/app" className="hover:text-zinc-100">
            Try app
          </Link>
          <a
            href="#waitlist"
            className="rounded-lg bg-violet-500 px-3 py-1.5 font-semibold text-white hover:bg-violet-400"
          >
            Join waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
