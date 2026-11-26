import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
          padding: 90, color: "white",
          backgroundColor: "#2b3528",
          backgroundImage: "radial-gradient(circle at 20% 20%, #f2c81d 0%, transparent 50%), radial-gradient(circle at 85% 80%, #5f7352 0%, transparent 50%)",
        }}
      >
        <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: -3 }}>{site.name}</div>
        <div style={{ fontSize: 44, opacity: 0.85, marginTop: 16 }}>{site.tagline.replace(/[^\p{L}\p{N}\s·&|,.'-]/gu, "").replace(/\s+/g, " ").trim()}</div>
        <div style={{ fontSize: 32, opacity: 0.6, marginTop: 40 }}>{site.handle}</div>
      </div>
    ),
    size,
  );
}
