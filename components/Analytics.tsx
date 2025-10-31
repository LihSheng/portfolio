'use client';

import Script from 'next/script';
import { siteConfig } from '@/lib/site-config';

export function Analytics() {
  if (!siteConfig.analytics.siteId) {
    return null;
  }

  if (siteConfig.analytics.provider === 'plausible') {
    return (
      <Script
        defer
        data-domain={siteConfig.analytics.siteId}
        src="https://plausible.io/js/script.js"
      />
    );
  }

  if (siteConfig.analytics.provider === 'umami') {
    return (
      <Script
        defer
        data-website-id={siteConfig.analytics.siteId}
        src="https://analytics.umami.is/script.js"
      />
    );
  }

  return null;
}
