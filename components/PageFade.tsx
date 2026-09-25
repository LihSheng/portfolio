'use client';

import { usePathname } from 'next/navigation';

interface PageFadeProps {
  children: React.ReactNode;
}

/**
 * Fades and slightly rises the main column on every route load. Re-keyed by
 * pathname so it replays on navigation; the animation itself is defined in
 * globals.css and disabled under prefers-reduced-motion there, so there is
 * no motion flash before hydration.
 */
export function PageFade({ children }: PageFadeProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-fade-rise">
      {children}
    </div>
  );
}
