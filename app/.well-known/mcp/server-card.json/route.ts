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
              name: { type: 'string', minLength: 2, maxLength: 100, description: 'Your full name' },
              email: { type: 'string', format: 'email', maxLength: 255, description: 'Your email address' },
              subject: { type: 'string', minLength: 5, maxLength: 200, description: 'What the message is about' },
              message: { type: 'string', minLength: 10, maxLength: 2000, description: 'Your message' },
            },
            required: ['name', 'email', 'subject', 'message'],
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