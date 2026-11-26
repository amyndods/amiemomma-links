import { site } from "@/lib/config";

export function GET() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${site.name}`,
    `NOTE:${site.tagline}`,
    site.contact.email && `EMAIL:${site.contact.email}`,
    site.contact.phone && `TEL:${site.contact.phone}`,
    site.contact.url && `URL:${site.contact.url}`,
    "END:VCARD",
  ].filter(Boolean);
  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${site.name.replace(/[^\w]+/g, "-")}.vcf"`,
    },
  });
}
