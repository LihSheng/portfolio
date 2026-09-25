import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFeatureFlags } from '@/lib';
import { Terminal } from '@/components/easter-eggs/Terminal';

export const metadata: Metadata = {
  title: 'Terminal',
  description: 'A hidden corner of the site.',
  robots: { index: false, follow: false },
};

/**
 * Hidden route. Not linked from navigation or the sitemap; the console
 * greeting is the only breadcrumb.
 */
export default function TerminalPage() {
  const flags = getFeatureFlags();
  if (!flags.easterEggs) notFound();

  return (
    <div className="py-16">
      <Terminal flags={flags} />
    </div>
  );
}
