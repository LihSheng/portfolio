import { Metadata } from 'next';
import Link from 'next/link';
import { getFeatureFlags } from '@/lib';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  const flags = getFeatureFlags();

  return (
    <div className="py-24">
      <h1 className="text-3xl mb-4">Page not found</h1>
      <p className="text-body-secondary mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-wrap gap-6 text-[15px]">
        <Link href="/">Home</Link>
        {flags.about && <Link href="/about">About</Link>}
        {flags.projects && <Link href="/projects">Projects</Link>}
        {flags.contact && <Link href="/contact">Contact</Link>}
      </div>
    </div>
  );
}
