// app/.well-known/agent-skills/index.json/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const SKILLS_SCHEMA = 'https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schema.json';

function sha256OfEmptyString(): string {
  return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
}

export async function GET(): Promise<NextResponse> {
  const skillsIndex = {
    '$schema': SKILLS_SCHEMA,
    skills: [
      {
        name: 'robots-txt',
        type: 'robots',
        description: 'Crawl rules, AI crawler directives, and Content-Signals for this portfolio',
        url: '/robots.txt',
        sha256: sha256OfEmptyString(),
      },
      {
        name: 'api-catalog',
        type: 'api',
        description: 'RFC 9727 API catalog listing available services and endpoints',
        url: '/.well-known/api-catalog',
        sha256: sha256OfEmptyString(),
      },
      {
        name: 'mcp-server-card',
        type: 'mcp',
        description: 'SEP-1649 MCP Server Card describing available Model Context Protocol tools',
        url: '/.well-known/mcp/server-card.json',
        sha256: sha256OfEmptyString(),
      },
    ],
  };

  return NextResponse.json(skillsIndex, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}