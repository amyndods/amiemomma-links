// Tiny Upstash/Vercel-KV REST client. No dependency. If env vars are missing everything no-ops.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const storeEnabled = Boolean(URL_ && TOKEN);

export async function pipeline(cmds: (string | number)[][]): Promise<any[]> {
  if (!storeEnabled) return cmds.map(() => null);
  try {
    const res = await fetch(`${URL_}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmds),
      cache: "no-store",
    });
    const json = (await res.json()) as { result?: any; error?: string }[];
    return json.map((r) => r.result ?? null);
  } catch {
    return cmds.map(() => null);
  }
}

export const day = (d = new Date()) => d.toISOString().slice(0, 10);

export async function track(kind: "click" | "view", id: string, extra: { country?: string; ref?: string } = {}) {
  const cmds: (string | number)[][] = [
    ["INCR", `${kind}:${id}`],
    ["INCR", `${kind}:${id}:${day()}`],
  ];
  if (extra.country) cmds.push(["HINCRBY", `${kind}:country`, extra.country, 1]);
  if (extra.ref) cmds.push(["HINCRBY", `${kind}:ref`, extra.ref, 1]);
  await pipeline(cmds);
}
