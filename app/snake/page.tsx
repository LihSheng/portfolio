import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFeatureFlags } from '@/lib';
import { Snake } from '@/components/easter-eggs/Snake';

export const metadata: Metadata = {
  title: 'Snake',
  description: 'A small game of Snake. Use WASD or the arrow keys.',
  robots: { index: false, follow: false },
};

/**
 * Hidden route, like /terminal. Not linked from navigation or the sitemap.
 */
export default function SnakePage() {
  const flags = getFeatureFlags();
  if (!flags.easterEggs) notFound();

  return (
    <div className="py-16">
      <h1 className="mb-2 text-4xl">Snake</h1>
      <p className="mb-8 text-body-secondary">
        Use WASD or the arrow keys to move. Eat the squares, do not hit the walls or yourself.
      </p>
      <Snake />
    </div>
  );
}
