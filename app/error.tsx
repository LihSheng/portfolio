'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="py-24">
      <h1 className="text-3xl mb-4">Something went wrong</h1>
      <p className="text-body-secondary mb-8">
        An unexpected error occurred while loading this page.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <p className="mb-8 font-mono text-sm text-body-secondary break-all">
          {error.message}
          {error.digest ? ` (${error.digest})` : ''}
        </p>
      )}

      <div className="flex flex-wrap gap-6 text-[15px]">
        <button onClick={reset} className="text-ink underline underline-offset-4">
          Try again
        </button>
        <Link href="/">Go home</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </div>
  );
}
