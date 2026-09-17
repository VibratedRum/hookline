/**
 * Free tier: 3 scores per calendar day via localStorage.
 * Client-only helpers.
 */

const STORAGE_KEY = "hookline_free_usage_v1";
export const FREE_DAILY_LIMIT = 3;

type UsageRecord = {
  date: string; // YYYY-MM-DD local
  count: number;
};

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function read(): UsageRecord {
  if (typeof window === "undefined") return { date: todayKey(), count: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed = JSON.parse(raw) as UsageRecord;
    if (parsed.date !== todayKey()) return { date: todayKey(), count: 0 };
    return { date: parsed.date, count: Number(parsed.count) || 0 };
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

function write(rec: UsageRecord) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rec));
}

export function getRemainingScores(): number {
  const rec = read();
  return Math.max(0, FREE_DAILY_LIMIT - rec.count);
}

export function getUsedScores(): number {
  return read().count;
}

export function canScore(): boolean {
  return getRemainingScores() > 0;
}

/** Increments usage; returns false if already at limit. */
export function consumeScore(): boolean {
  const rec = read();
  if (rec.count >= FREE_DAILY_LIMIT) return false;
  write({ date: todayKey(), count: rec.count + 1 });
  return true;
}
