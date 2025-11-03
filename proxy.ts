import { NextRequest, NextResponse } from 'next/server';
import { getFeatureFlags } from './lib';
import type { FeatureFlags } from './types';

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
  
  return NextResponse.next();
}

/**
 * Proxy configuration
 * Matches all feature-gated routes including nested paths
 */
export const config = {
  matcher: [
    '/about/:path*',
    '/projects/:path*', 
    '/writing/:path*',
    '/contact/:path*',
    '/rss.xml'
  ]
};