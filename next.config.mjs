import createMDX from '@next/mdx';

const isDev = process.env.NODE_ENV === 'development';

// Third-party origins the site loads from. Analytics is the only one.
const analyticsOrigins = ['https://plausible.io', 'https://analytics.umami.is', 'https://cloud.umami.is'];

// 'unsafe-inline' for scripts is required by the App Router's inline flight
// data and next-themes' no-flash script; a nonce would force every page to
// render dynamically. Dev mode also needs eval and the HMR websocket.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} ${analyticsOrigins.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? ' ws:' : ''} ${analyticsOrigins.join(' ')}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  // The legacy XSS auditor is removed from modern browsers and could be abused
  // in old ones; '0' is the current recommendation. CSP does the real work.
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    // Only local images are served. Add a remotePatterns entry here if a
    // project screenshot or profile picture ever comes from another host.
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

const withMDX = createMDX({
  // We'll handle plugins programmatically in the MDX processing
});

export default withMDX(nextConfig);
