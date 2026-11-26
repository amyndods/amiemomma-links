import { siInstagram, siTiktok, siYoutube, siX, siGithub, siSpotify, siThreads, siSubstack, siDiscord, siTwitch, siPatreon, siKick } from "simple-icons";

const brands: Record<string, { path: string }> = {
  instagram: siInstagram, tiktok: siTiktok, youtube: siYoutube, x: siX, twitter: siX, github: siGithub,
  spotify: siSpotify, threads: siThreads, substack: siSubstack, discord: siDiscord, twitch: siTwitch, patreon: siPatreon, kick: siKick,
  linkedin: { path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" },
};

export function Social({ network }: { network: string }) {
  const b = brands[network.toLowerCase()];
  if (!b) return <Globe />;
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
      <path d={b.path} />
    </svg>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const Globe = () => <svg viewBox="0 0 24 24" width="22" height="22" {...S} aria-hidden><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>;
export const Arrow = () => <svg viewBox="0 0 24 24" width="18" height="18" {...S} aria-hidden><path d="M7 17 17 7M8 7h9v9" /></svg>;
export const ShareIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" {...S} aria-hidden><path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" /></svg>;
export const UserPlus = () => <svg viewBox="0 0 24 24" width="18" height="18" {...S} aria-hidden><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6" /></svg>;
export const Pin = () => <svg viewBox="0 0 24 24" width="14" height="14" {...S} aria-hidden><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>;
export const Verified = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-label="Verified" role="img">
    <path fill="var(--accent)" d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3L2.6 15.8l1-3-1-3 2.6-1.9 1-3 3.2.1z" />
    <path fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M8 12.2l2.7 2.7L16 9.6" />
  </svg>
);
