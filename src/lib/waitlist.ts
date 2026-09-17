import { promises as fs } from "fs";
import path from "path";

export type WaitlistEntry = {
  email: string;
  platform?: string;
  source?: string;
  createdAt: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "waitlist.json");

async function ensureFile(): Promise<void> {
  const dir = path.dirname(DATA_PATH);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, "[]", "utf8");
  }
}

export async function readWaitlist(): Promise<WaitlistEntry[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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

  const list = await readWaitlist();
  if (list.some((e) => e.email === email)) {
    return { ok: true, duplicate: true };
  }

  list.push({
    email,
    platform: platform || undefined,
    source: entry.source?.trim() || undefined,
    createdAt: new Date().toISOString(),
  });

  await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2), "utf8");
  return { ok: true, duplicate: false };
}
