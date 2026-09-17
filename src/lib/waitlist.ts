export type WaitlistEntry = {
  email: string;
  platform?: string;
  source?: string;
  createdAt: string;
};

type GlobalWaitlist = typeof globalThis & {
  __hooklineWaitlist?: Map<string, WaitlistEntry>;
};

function store(): Map<string, WaitlistEntry> {
  const g = globalThis as GlobalWaitlist;
  if (!g.__hooklineWaitlist) g.__hooklineWaitlist = new Map();
  return g.__hooklineWaitlist;
}

export async function addWaitlistEntry(
  entry: Omit<WaitlistEntry, "createdAt">
): Promise<{ ok: true; duplicate?: boolean } | { ok: false; error: string }> {
  const email = entry.email.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  const allowedPlatforms = ["Twitch", "Kick", "YouTube", "Other", ""];
  const platform = entry.platform?.trim() || undefined;
  if (platform && !allowedPlatforms.includes(platform)) {
    return { ok: false, error: "Invalid platform." };
  }

  const list = store();
  if (list.has(email)) {
    return { ok: true, duplicate: true };
  }

  const row: WaitlistEntry = {
    email,
    platform: platform || undefined,
    source: entry.source?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
  list.set(email, row);
  // Serverless-safe capture for MVP; swap to KV/DB when Prize adds one.
  console.log("[hookline-waitlist]", JSON.stringify(row));
  return { ok: true, duplicate: false };
}
