import { items, type LinkItem } from "./config";

export function isVisible(item: LinkItem, now = Date.now()) {
  if (item.type !== "link") return true;
  if (item.showFrom && now < Date.parse(item.showFrom)) return false;
  if (item.showUntil && now > Date.parse(item.showUntil)) return false;
  return true;
}

export function findLink(id: string) {
  return items.find((i): i is Extract<LinkItem, { type: "link" }> => i.type === "link" && i.id === id);
}

export function refFromHeader(ref: string | null) {
  if (!ref) return "direct";
  try {
    return new URL(ref).hostname.replace(/^www\./, "");
  } catch {
    return "direct";
  }
}

export const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
