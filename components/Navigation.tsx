'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/lib/site-config';
import { useFeatureFlags } from '@/lib/feature-flags';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navigation({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const flags = useFeatureFlags();

  const visibleNavigationItems = useMemo(() => {
    return navigationItems.filter((item) => {
      if (item.href === '/') return false;
      if (!item.flag) return true;
      return flags[item.flag];
    });
  }, [flags]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`mx-auto flex w-full max-w-[680px] flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-hairline px-5 py-6 ${className}`}
    >
      <Link href="/" className="text-[15px] font-medium text-ink no-underline">
        Ng Lih Sheng
      </Link>

      <nav className="flex flex-wrap items-baseline gap-6 text-[15px]">
        {visibleNavigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`no-underline ${isActive(item.href) ? 'text-ink' : 'text-muted'}`}
          >
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
