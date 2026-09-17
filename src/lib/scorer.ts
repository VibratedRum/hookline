/**
 * Heuristic title/hook scorer — no LLM.
 * Factors: length, power words, numbers, curiosity, clarity, clickbait penalties.
 */

export type ScoreResult = {
  score: number;
  rationale: string;
  factors: {
    length: number;
    powerWords: number;
    numbers: number;
    curiosity: number;
    clarity: number;
    clickbaitPenalty: number;
  };
  rewrites: string[];
};

const POWER_WORDS = [
  "insane",
  "epic",
  "clutch",
  "ranked",
  "finally",
  "first",
  "last",
  "only",
  "secret",
  "hidden",
  "crazy",
  "wild",
  "brutal",
  "unreal",
  "broken",
  "op",
  "meta",
  "pro",
  "vs",
  "challenge",
  "speedrun",
  "clutch",
  "comeback",
  "rage",
  "tilted",
  "carried",
  "sweaty",
  "godlike",
  "perfect",
  "impossible",
  "never",
  "always",
  "worst",
  "best",
  "new",
  "live",
  "going",
  "trying",
  "beating",
  "destroying",
  "winning",
  "losing",
  "surviving",
];

const CURIOSITY_MARKERS = [
  "?",
  "how",
  "why",
  "what",
  "when",
  "who",
  "which",
  "secret",
  "weird",
  "strange",
  "nobody",
  "everyone",
  "until",
  "before",
  "after",
  "without",
  "almost",
  "nearly",
  "barely",
];

const CLICKBAIT_PATTERNS = [
  /you won'?t believe/i,
  /gone (wrong|sexual|wrong)/i,
  /doctors hate/i,
  /one weird trick/i,
  /shocking/i,
  /must (see|watch)/i,
  /!{3,}/,
  /\?{3,}/,
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function scoreLength(text: string): { pts: number; note: string } {
  const len = text.trim().length;
  // Sweet spot ~35–70 chars for stream/YT titles
  if (len >= 35 && len <= 70) return { pts: 22, note: "length is in the click-friendly zone" };
  if (len >= 25 && len < 35) return { pts: 16, note: "a bit short — room to add specificity" };
  if (len > 70 && len <= 90) return { pts: 14, note: "a bit long — may truncate on some platforms" };
  if (len > 90) return { pts: 6, note: "too long — will get cut off" };
  if (len >= 10) return { pts: 8, note: "too short — weak specificity" };
  return { pts: 2, note: "almost empty" };
}

function scorePowerWords(text: string): { pts: number; note: string; hits: string[] } {
  const lower = text.toLowerCase();
  const hits = POWER_WORDS.filter((w) => {
    const re = new RegExp(`\\b${w}\\b`, "i");
    return re.test(lower);
  });
  const unique = [...new Set(hits)];
  if (unique.length >= 3) return { pts: 20, note: "strong energy words", hits: unique };
  if (unique.length === 2) return { pts: 15, note: "solid power-word presence", hits: unique };
  if (unique.length === 1) return { pts: 10, note: "one power word helps", hits: unique };
  return { pts: 3, note: "no punch words — flat energy", hits: [] };
}

function scoreNumbers(text: string): { pts: number; note: string } {
  const nums = text.match(/\d+/g) || [];
  if (nums.length >= 2) return { pts: 15, note: "numbers add concrete stakes" };
  if (nums.length === 1) return { pts: 12, note: "a number grounds the hook" };
  return { pts: 2, note: "no numbers — less specific" };
}

function scoreCuriosity(text: string): { pts: number; note: string } {
  const lower = text.toLowerCase();
  let hits = 0;
  for (const m of CURIOSITY_MARKERS) {
    if (m === "?") {
      if (text.includes("?")) hits++;
    } else {
      const re = new RegExp(`\\b${m}\\b`, "i");
      if (re.test(lower)) hits++;
    }
  }
  if (hits >= 2) return { pts: 18, note: "curiosity gap is working" };
  if (hits === 1) return { pts: 12, note: "some curiosity pull" };
  return { pts: 4, note: "no open loop — predictable" };
}

function scoreClarity(text: string): { pts: number; note: string } {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const vague = ["lol", "stuff", "things", "game", "games", "playing", "just", "idk", "misc"];
  const vagueHits = words.filter((w) => vague.includes(w.toLowerCase())).length;
  const hasNounish = words.some((w) => w.length >= 5 && !/^(playing|watching|trying)$/i.test(w));

  let pts = 10;
  if (words.length >= 4 && words.length <= 12) pts += 6;
  if (hasNounish) pts += 4;
  if (vagueHits >= 2) pts -= 8;
  else if (vagueHits === 1) pts -= 3;
  if (/^[a-z\s]+$/i.test(text) && words.length <= 3) pts -= 4;

  pts = clamp(pts, 0, 20);
  let note = "clear enough to parse at a glance";
  if (pts <= 6) note = "too vague — viewer can’t tell the payoff";
  else if (pts <= 12) note = "clarity is okay but could be sharper";
  return { pts, note };
}

function scoreClickbait(text: string): { pts: number; note: string } {
  // Returns penalty as negative contribution (0 = clean, up to -20)
  let penalty = 0;
  for (const p of CLICKBAIT_PATTERNS) {
    if (p.test(text)) penalty += 6;
  }
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length >= 8) {
    const upper = (text.match(/[A-Z]/g) || []).length;
    const ratio = upper / letters.length;
    if (ratio > 0.7) penalty += 10;
    else if (ratio > 0.45) penalty += 5;
  }
  const bangs = (text.match(/!/g) || []).length;
  if (bangs >= 3) penalty += 4;
  else if (bangs === 2) penalty += 2;

  penalty = clamp(penalty, 0, 20);
  if (penalty === 0) return { pts: 0, note: "no heavy clickbait smell" };
  if (penalty <= 8) return { pts: -penalty, note: "mild clickbait signals — trust cost" };
  return { pts: -penalty, note: "heavy clickbait — platforms and viewers punish this" };
}

function capitalizeTitle(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => {
      if (/^\d/.test(w)) return w;
      if (["vs", "of", "the", "a", "an", "and", "or", "to", "in", "on", "for"].includes(w.toLowerCase())) {
        return w.toLowerCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());
}

function extractGameOrTopic(text: string): string | null {
  // Prefer longer tokens that look like game/topic names
  const words = text.replace(/[?!.,]/g, "").split(/\s+/).filter(Boolean);
  const skip = new Set(
    "i me my we you the a an and or to in on for of is am are was were playing just lol stream live today tonight".split(
      " "
    )
  );
  const candidates = words.filter((w) => w.length >= 3 && !skip.has(w.toLowerCase()) && !/^\d+$/.test(w));
  if (candidates.length === 0) return null;
  // Prefer capitalized or longer words
  candidates.sort((a, b) => b.length - a.length);
  return candidates[0];
}

function generateRewrites(original: string, factors: ScoreResult["factors"]): string[] {
  const topic = extractGameOrTopic(original) || "This Run";
  const topicClean = topic.replace(/[^a-zA-Z0-9\-']/g, "");
  const hasNumber = /\d/.test(original);
  const num = hasNumber ? (original.match(/\d+/) || ["100"])[0] : "100";

  const variants: string[] = [];

  // 1) Number + stakes (boosts numbers + clarity)
  variants.push(
    capitalizeTitle(`${topicClean}: Can I Hit ${num === "100" && !hasNumber ? "Top 10" : num} Before I Rage Quit?`)
  );

  // 2) Curiosity / open loop
  variants.push(
    capitalizeTitle(`I Almost Quit ${topicClean} — Then This Happened Live`)
  );

  // 3) Power + specificity for streams
  if (factors.powerWords < 12) {
    variants.push(
      capitalizeTitle(`Clutch Comeback on ${topicClean} — Ranked Chaos Goes Live`)
    );
  } else {
    variants.push(
      capitalizeTitle(`Why Nobody Talks About This ${topicClean} Trick (Until Now)`)
    );
  }

  // Deduplicate vs original (case-insensitive) and ensure 3 unique
  const seen = new Set<string>();
  const out: string[] = [];
  const origLower = original.trim().toLowerCase();

  const extras = [
    capitalizeTitle(`${topicClean} Challenge: No Healing Until ${hasNumber ? num : "Round 10"}`),
    capitalizeTitle(`First Time Hitting ${hasNumber ? num : "Diamond"} on ${topicClean} — Watch This`),
    capitalizeTitle(`The ${topicClean} Mistake That Cost Me Everything Live`),
  ];

  for (const v of [...variants, ...extras]) {
    const key = v.toLowerCase();
    if (key === origLower || seen.has(key)) continue;
    seen.add(key);
    out.push(v);
    if (out.length === 3) break;
  }

  while (out.length < 3) {
    out.push(capitalizeTitle(`Live ${topicClean} — One More Try Before I Sleep`));
  }

  return out.slice(0, 3);
}

export function scoreTitle(input: string): ScoreResult {
  const text = (input || "").trim().replace(/\s+/g, " ");
  if (!text) {
    return {
      score: 0,
      rationale: "Paste a title or hook first — nothing to score.",
      factors: {
        length: 0,
        powerWords: 0,
        numbers: 0,
        curiosity: 0,
        clarity: 0,
        clickbaitPenalty: 0,
      },
      rewrites: [
        "Clutch Ranked Run — Can I Hit Top 10 Before I Rage?",
        "I Almost Quit This Game — Then This Happened Live",
        "First Diamond Push Tonight — Watch the Comeback",
      ],
    };
  }

  const length = scoreLength(text);
  const power = scorePowerWords(text);
  const numbers = scoreNumbers(text);
  const curiosity = scoreCuriosity(text);
  const clarity = scoreClarity(text);
  const clickbait = scoreClickbait(text);

  const raw =
    length.pts +
    power.pts +
    numbers.pts +
    curiosity.pts +
    clarity.pts +
    clickbait.pts;

  // Max theoretical ~22+20+15+18+20+0 = 95; floor/ceil to 0–100 with slight boost
  const score = clamp(Math.round(raw + 5), 0, 100);

  const factors = {
    length: length.pts,
    powerWords: power.pts,
    numbers: numbers.pts,
    curiosity: curiosity.pts,
    clarity: clarity.pts,
    clickbaitPenalty: clickbait.pts,
  };

  const notes = [length.note, power.note, numbers.note, curiosity.note, clarity.note];
  if (clickbait.pts < 0) notes.push(clickbait.note);

  // Pick top 2 most relevant notes for short rationale
  const rationaleParts = notes.slice(0, 2);
  let rationale = rationaleParts.join("; ") + ".";
  if (score >= 75) {
    rationale = `Strong hook — ${rationale} Small tweaks could still lift CTR.`;
  } else if (score >= 50) {
    rationale = `Mid pack — ${rationale} Rewrites below push the weak factors.`;
  } else {
    rationale = `Likely to get scrolled past — ${rationale} Use a rewrite before you go live.`;
  }

  const rewrites = generateRewrites(text, factors);

  return { score, rationale, factors, rewrites };
}
