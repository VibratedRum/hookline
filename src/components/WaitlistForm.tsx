"use client";

import { useEffect, useState, FormEvent } from "react";

type Props = {
  id?: string;
  compact?: boolean;
  buttonLabel?: string;
};

export default function WaitlistForm({
  id = "waitlist",
  compact = false,
  buttonLabel = "Get early access",
}: Props) {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "duplicate" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const ref = params.get("ref");
    const parts: string[] = [];
    if (ref) parts.push(`ref=${ref}`);
    if (utmSource) parts.push(`utm_source=${utmSource}`);
    if (utmMedium) parts.push(`utm_medium=${utmMedium}`);
    if (utmCampaign) parts.push(`utm_campaign=${utmCampaign}`);
    setSource(parts.join("&") || "");
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, platform: platform || undefined, source: source || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      if (data.status === "duplicate") {
        setStatus("duplicate");
        setMessage(data.message || "You're already on the list.");
        return;
      }
      setStatus("ok");
      setMessage(data.message || "You're on the list. We'll email when Hookline opens.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error — try again.");
    }
  }

  if (status === "ok") {
    return (
      <div
        id={id}
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
        role="status"
      >
        You&apos;re on the list. We&apos;ll email when Hookline opens.
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} className="w-full space-y-3">
      <div className={`flex flex-col gap-2 ${compact ? "" : "sm:flex-row"}`}>
        <label className="sr-only" htmlFor={`${id}-email`}>
          Email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@creator.email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none ring-violet-500/40 focus:ring-2"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : buttonLabel}
        </button>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor={`${id}-platform`}>
          Platform
        </label>
        <select
          id={`${id}-platform`}
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-300 outline-none ring-violet-500/40 focus:ring-2"
        >
          <option value="">Platform (optional)</option>
          <option value="Twitch">Twitch</option>
          <option value="Kick">Kick</option>
          <option value="YouTube">YouTube</option>
          <option value="Other">Other</option>
        </select>
        <input type="hidden" name="source" value={source} readOnly />
      </div>
      {(status === "duplicate" || status === "error") && (
        <p
          className={`text-sm ${status === "duplicate" ? "text-amber-300" : "text-rose-300"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
