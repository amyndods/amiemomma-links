import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/config";
import { siteUrl } from "@/lib/util";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: `${site.name} | ${site.tagline}`,
  description: site.bio,
  openGraph: { title: site.name, description: site.tagline, type: "profile" },
  twitter: { card: "summary_large_image", title: site.name, description: site.tagline },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#2b3528" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={site.theme}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
