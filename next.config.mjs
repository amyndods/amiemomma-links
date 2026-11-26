/** @type {import('next').NextConfig} */
export default {
  poweredByHeader: false,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
};
