export default function DemoCard() {
  return (
    <div className="mx-auto mt-10 w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl shadow-violet-950/20">
      <div className="border-b border-zinc-800 px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
        Demo · before / after
      </div>
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="border-b border-zinc-800 p-5 sm:border-b-0 sm:border-r">
          <p className="text-xs font-medium text-zinc-500">Before</p>
          <p className="mt-2 text-base font-medium text-zinc-200">&ldquo;Playing games lol&rdquo;</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-3 py-1 text-sm font-semibold text-rose-300">
            Score <span className="tabular-nums">28</span>
          </p>
        </div>
        <div className="p-5">
          <p className="text-xs font-medium text-zinc-500">After · 3 rewrites</p>
          <ul className="mt-2 space-y-2 text-sm text-zinc-200">
            <li className="flex gap-2">
              <span className="text-violet-400">1.</span>
              <span>Clutch Ranked Run — Can I Hit Top 10 Before I Rage?</span>
            </li>
            <li className="flex gap-2">
              <span className="text-violet-400">2.</span>
              <span>I Almost Quit This Game — Then This Happened Live</span>
            </li>
            <li className="flex gap-2">
              <span className="text-violet-400">3.</span>
              <span>First Diamond Push Tonight — Watch the Comeback</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
