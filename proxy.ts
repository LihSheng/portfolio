import { NextRequest, NextResponse } from 'next/server';
import { getFeatureFlags } from './lib';
import type { FeatureFlags } from './types';

const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</about>; rel="service-doc"; type="text/html"',
  '</.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
  '</.well-known/oauth-protected-resource>; rel="service-desc"; type="application/json"',
  '</robots.txt>; rel="robots"; type="text/plain"',
];

const LINK_HEADER = LINK_HEADERS.join(', ');

/**
 * Route to feature flag mapping
 * Maps route patterns to their corresponding feature flags
 */
const routeFlags: Record<string, keyof FeatureFlags> = {
  '/about': 'about',
  '/projects': 'projects',
  '/writing': 'blog',
  '/contact': 'contact',
  '/rss.xml': 'rss',
};

function withAgentDiscoveryHeaders(response: NextResponse): NextResponse {
  response.headers.set('Link', LINK_HEADER);
  response.headers.append('Vary', 'Accept');
  return response;
}

function wantsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get('accept') || '';
  return accept
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .some((entry) => entry === 'text/markdown' || entry.startsWith('text/markdown;'));
}

function getMarkdownResponse(pathname: string): NextResponse | null {
  const markdown = getMarkdownForPath(pathname);

  if (!markdown) {
    return null;
  }

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'Link': LINK_HEADER,
      'Vary': 'Accept',
      'x-markdown-tokens': String(markdown.split(/\s+/).filter(Boolean).length),
    },
  });
}

function getMarkdownForPath(pathname: string): string | null {
  switch (pathname) {
    case '/':
      return `# Ng Lih Sheng

Software Developer building enterprise web applications, automation systems, and practical AI-driven workflows with TypeScript, PHP, React, Next.js, Laravel, and AWS.

## Agent Resources

- [API catalog](/.well-known/api-catalog)
- [Agent skills index](/.well-known/agent-skills/index.json)
- [MCP server card](/.well-known/mcp/server-card.json)
- [OAuth protected resource metadata](/.well-known/oauth-protected-resource)
- [Robots policy](/robots.txt)

## Site Navigation

- [About](/about)
- [Projects](/projects)
- [Writing](/writing)
- [Contact](/contact)
`;
    case '/about':
      return `# About Ng Lih Sheng

Software Developer focused on enterprise web applications, workflow automation, and practical AI-driven solutions.

## Focus Areas

- TypeScript, React, Next.js, PHP, Laravel, and AWS
- AI agent workflows and automation
- Enterprise web application delivery
`;
    case '/projects':
      return `# Projects

Selected software projects and practical systems by Ng Lih Sheng.

Use the HTML version of this page for the full project list and visual summaries.
`;
    case '/writing':
      return `# Writing

Articles and notes about development, technology, performance, accessibility, and practical engineering.
`;
    case '/contact':
      return `# Contact

Use the contact form on the HTML page or the public contact options listed on the site.
`;
    default:
      return null;
  }
}

/**
 * Proxy function to protect routes based on feature flags
 * Redirects to 404 page when accessing disabled features
 */
export default function proxy(request: NextRequest) {
  const flags = getFeatureFlags();
  const pathname = request.nextUrl.pathname;

  // Check if route requires a feature flag
  for (const [route, flag] of Object.entries(routeFlags)) {
    if (pathname.startsWith(route) && !flags[flag]) {
      // Redirect to 404 page for disabled features
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }

  if (wantsMarkdown(request)) {
    const markdownResponse = getMarkdownResponse(pathname);

    if (markdownResponse) {
      return markdownResponse;
    }
  }

  return withAgentDiscoveryHeaders(NextResponse.next());
}

/**
 * Proxy configuration.
 * Matches public page routes where agents should discover site capabilities.
 */
export const config = {
  matcher: [
    '/',
    '/about/:path*',
    '/projects/:path*',
    '/writing/:path*',
    '/contact/:path*',
    '/rss.xml',
  ],
};
