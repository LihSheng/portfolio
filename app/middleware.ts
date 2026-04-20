// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="skills"; type="application/json"',
  '</robots.txt>; rel="robots"',
];

function appendLinkHeaders(response: NextResponse): NextResponse {
  for (const linkHeader of LINK_HEADERS) {
    response.headers.append('Link', linkHeader);
  }
  response.headers.append('Vary', 'Accept');
  return response;
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const accept = request.headers.get('accept') || '';

  // Markdown for Agents content negotiation
  if (accept.includes('text/markdown')) {
    try {
      const htmlResponse = await fetch(request.url, {
        headers: {
          ...Object.fromEntries(request.headers.entries()),
          'Accept': 'text/html',
        },
      });

      if (htmlResponse.ok) {
        const html = await htmlResponse.text();
        const markdown = htmlToMarkdown(html);
        return new NextResponse(markdown, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'private, max-age=60',
            'Vary': 'Accept',
            'Link': LINK_HEADERS.join(', '),
          },
        });
      }
    } catch {
      // Fall through to normal response
    }
  }

  // Normal HTML response — add Link headers
  const response = NextResponse.next();
  // Manually set headers on the response
  response.headers.set('X-Middleware-Test', 'worked');
  response.headers.append('Link', LINK_HEADERS.join(', '));
  response.headers.append('Vary', 'Accept');
  return response;
}

function htmlToMarkdown(html: string): string {
  let m = html
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')

    // Headers
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n')

    // Paragraphs and line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')

    // Links
    .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')

    // Bold and italic
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')

    // Lists
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')

    // Blockquotes
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n')

    // Code blocks and inline code
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')

    // Strip remaining HTML tags
    .replace(/<[^>]+>/g, '')

    // Decode HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')

    // Collapse excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return m;
}