// app/.well-known/oauth-protected-resource/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(): Promise<NextResponse> {
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'https://lihsheng.space';

  const metadata = {
    resource: host,
    resource_name: 'Ng Lih Sheng Portfolio',
    scopes_supported: [],
    bearer_methods_supported: [],
  };

  return NextResponse.json(metadata, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
