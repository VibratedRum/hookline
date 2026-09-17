"use client";

import { useCallback, useEffect, useState } from "react";
import { scoreTitle, type ScoreResult } from "@/lib/scorer";
import {
  canScore,
  consumeScore,
  FREE_DAILY_LIMIT,
  getRemainingScores,
  getUsedScores,
} from "@/lib/usage";

export default function ScoreTool() {
  const [input, setInput] = useState("");
  const [platform, setPlatform] = useState<"YouTube" | "Twitch" | "Kick">("YouTube");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [remaining, setRemaining] = useState(FREE_DAILY_LIMIT);
  const [used, setUsed] = useState(0);
  const [gated, setGated] = useState(false);

  const refreshUsage = useCallback(() => {
    setRemaining(getRemainingScores());
    setUsed(getUsedScores());
    setGated(!canScore());
  }, []);

  useEffect(() => {
    refreshUsage();
  }, [refreshUsage]);

  function handleScore() {
    if (!input.trim()) return;
    if (!canScore()) {
      setGated(true);
      refreshUsage();
      return;
    }
    const ok = consumeScore();
    if (!ok) {
      setGated(true);
      refreshUsage();
      return;
    }
    const scored = scoreTitle(input);
    setResult(scored);
    refreshUsage();
  }

  function scoreColor(n: number) {
    if (n >= 75) return "text-emerald-400";
    if (n >= 50) return "text-amber-300";
    return "text-rose-300";
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-1 text-sm">
          {(["YouTube", "Twitch", "Kick"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                platform === p
                  ? "bg-violet-500 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <p className="text-sm text-zinc-400">
          Free:{" "}
          <span className="font-semibold text-zinc-200 tabular-nums">
            {remaining}/{FREE_DAILY_LIMIT}
          </span>{" "}
          left today
        </p>
      </div>

      {gated ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
          <p className="text-base font-semibold text-amber-100">
            You&apos;ve used today&apos;s free scores. Pro is $9/mo for unlimited — or come back
            tomorrow.
          </p>
          <p className="mt-2 text-sm text-amber-200/80">
            Used {used}/{FREE_DAILY_LIMIT} today ({platform} framing).
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-400"
              onClick={() => {
                // Stripe Checkout stub — plug in later
                const el = document.getElementById("upgrade-stub");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Upgrade to Pro — $9/mo
            </button>
            <a
              href="/#waitlist"
              className="rounded-xl border border-zinc-600 px-4 py-2.5 text-sm font-semibold text-zinc-200 hover:border-zinc-400"
            >
              Join waitlist
            </a>
          </div>
          <p id="upgrade-stub" className="mt-3 text-xs text-zinc-500">
            Stripe Checkout + webhook will plug in at launch. Waitlist gets first Pro access.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <label htmlFor="hook-input" className="block text-sm font-medium text-zinc-300">
              Title or hook
            </label>
            <textarea
              id="hook-input"
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a title or hook to score."
              className="w-full resize-y rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-base text-zinc-100 placeholder:text-zinc-500 outline-none ring-violet-500/40 focus:ring-2"
            />
            <button
              type="button"
              onClick={handleScore}
              disabled={!input.trim()}
              className="w-full rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Score title
            </button>
          </div>

          {!result && (
            <p className="text-center text-sm text-zinc-500">Paste a title or hook to score.</p>
          )}

          {result && (
            <div className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
              <div>
                <p className="text-sm text-zinc-400">
                  Score{" "}
                  <span className={`text-3xl font-bold tabular-nums ${scoreColor(result.score)}`}>
                    {result.score}
                  </span>
                  <span className="text-zinc-500">/100</span>
                  <span className="text-zinc-600"> · </span>
                  <span>3 rewrites</span>
                  <span className="text-zinc-600"> · </span>
                  <span className="text-zinc-500">{platform}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{result.rationale}</p>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Rewrites
                </h3>
                <ol className="space-y-3">
                  {result.rewrites.map((r, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3"
                    >
                      <span className="font-mono text-sm text-violet-400">{i + 1}.</span>
                      <span className="text-sm text-zinc-100 sm:text-base">{r}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
