// app/.well-known/mcp/server-card.json/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(): Promise<NextResponse> {
  const serverCard = {
    serverInfo: {
      name: 'LihSheng Portfolio MCP',
      version: '1.0.0',
    },
    capabilities: {
      tools: [
        {
          name: 'contact',
          description: 'Submit a contact message via the portfolio contact form',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Your full name' },
              email: { type: 'string', format: 'email', description: 'Your email address' },
              message: { type: 'string', description: 'Your message' },
            },
            required: ['name', 'email', 'message'],
          },
        },
      ],
    },
  };

  return NextResponse.json(serverCard, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}