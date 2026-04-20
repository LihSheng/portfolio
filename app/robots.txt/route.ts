// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(): Promise<NextResponse> {
  const content = `# robots.txt for Lih Sheng Portfolio

User-agent: *
Allow: /
Disallow: /api/

# AI Crawler rules
User-agent: GPTBot
Disallow: /

User-agent: GPTBot-Classic
Disallow: /

User-agent: OAI-SearchBot
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /

# Content Signals (contentsignals.org)
Content-Signal: ai-train=no, search=yes, ai-input=no
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}