/** @type {import("next").NextConfig} */

// CSP built as an array then joined — easier to audit than a one-liner
const CSP = [
  "default-src 'self'",
  // Next.js inline hydration scripts + JSON-LD blocks require unsafe-inline.
  // Nonce-based CSP would be stricter but needs middleware; this is the
  // standard Next.js recommendation for static/SSR without middleware.
  "script-src 'self' 'unsafe-inline'",
  // Tailwind utility classes are inline; Next.js also injects inline styles.
  "style-src 'self' 'unsafe-inline'",
  // next/image serves via /_next/image; data: for inline SVG; blob: for
  // object URLs; https: for any OG / social images fetched by crawlers.
  "img-src 'self' data: blob: https:",
  // Fonts are self-hosted via next/font — no external font CDN needed.
  "font-src 'self'",
  // API routes are same-origin. Supabase realtime uses WebSocket.
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  // Calendly is embedded as an iframe on /local-ed.
  "frame-src https://calendly.com",
  // Block plugin embeds and eval-capable objects.
  "object-src 'none'",
  // Prevent base-tag hijacking.
  "base-uri 'self'",
  // Forms only submit to our own origin.
  "form-action 'self'",
  // Upgrade any accidental http sub-resource to https.
  "upgrade-insecure-requests",
].join("; ");

const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 44, 48, 64, 96, 128, 256],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        // All routes — security headers applied globally
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy",   value: CSP },
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // HTML pages — revalidate on every navigation, but allow bfcache
        source: "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
        headers: [
          { key: "Cache-Control", value: "no-cache, must-revalidate" },
        ],
      },
      {
        // Hashed static assets — cache forever (Next.js rotates hash on change)
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
