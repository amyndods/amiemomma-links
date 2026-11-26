/**
 * THIS IS THE ONLY FILE YOU NEED TO EDIT.
 * Change it, push to git, Vercel redeploys in ~20 seconds.
 */

export type LinkItem =
  | {
      type: "link";
      id: string;
      title: string;
      url: string;
      description?: string;
      /** Big hero card with image */
      featured?: boolean;
      image?: string;
      /** Small pill like "New" or "50% off" */
      badge?: string;
      /** Auto show/hide. ISO dates, e.g. "2026-12-01T09:00:00-05:00" */
      showFrom?: string;
      showUntil?: string;
      /** Gentle pulse to pull the eye. Use on ONE link. */
      highlight?: boolean;
    }
  | { type: "header"; title: string }
  | { type: "embed"; provider: "youtube" | "spotify"; id: string; title?: string }
  | { type: "email"; id: string; title: string; description?: string; button?: string };

export type Social = { network: string; url: string };

export const site = {
  name: "AmieMomma",
  handle: "@amiemomma",
  tagline: "Navy Vet 🌻 Single Mom 🌻 Gamer",
  bio: "Owner of Uncharted RP. Advocate for childhood cancer and autism awareness.",
  avatar: "/logo.png", // file lives in /public. Empty = generated initials.
  verified: false,
  location: "",
  /** sunflower (deep sage) | cream (light) */
  theme: "sunflower" as "sunflower" | "cream",
  footer: "Made with sunshine",
  /** Fill any of these in to show a "Save contact" button */
  contact: { email: "", phone: "", url: "" },
  socials: [
    { network: "tiktok", url: "https://www.tiktok.com/@amiemomma" },
    { network: "twitch", url: "https://www.twitch.tv/amiemomma" },
    { network: "kick", url: "https://kick.com/amiemomma" },
    { network: "discord", url: "https://discord.gg/x6EfwzznzG" },
  ] as Social[],
};

export const items: LinkItem[] = [
  { type: "header", title: "Watch Live" },
  { type: "link", id: "twitch", title: "Twitch", description: "Live streams", url: "https://www.twitch.tv/amiemomma", highlight: true },
  { type: "link", id: "kick", title: "Kick", description: "Live streams", url: "https://kick.com/amiemomma" },
  { type: "link", id: "tiktok", title: "TikTok", description: "@amiemomma", url: "https://www.tiktok.com/@amiemomma" },
  { type: "header", title: "Join the Community" },
  { type: "link", id: "moms-house", title: "Mom's House", description: "My Discord", url: "https://discord.gg/x6EfwzznzG" },
  { type: "link", id: "ucrp", title: "UCRP Discord", description: "Uncharted RP", url: "https://discord.gg/unchartedrp" },
];
