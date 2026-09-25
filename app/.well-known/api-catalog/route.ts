// app/.well-known/api-catalog/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(): Promise<NextResponse> {
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'https://lihsheng.space';

  const catalog = {
    linkset: [
      {
        anchor: host,
        rel: 'service-doc',
        href: '/about',
      },
      {
        anchor: host,
        rel: 'api-catalog',
        href: '/.well-known/api-catalog',
      },
      {
        anchor: `${host}/about`,
        rel: 'service-doc',
        href: '/about',
      },
      {
        anchor: host,
        rel: 'service-desc',
        href: '/.well-known/oauth-protected-resource',
      },
    ],
  };

  return NextResponse.json(catalog, {
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
