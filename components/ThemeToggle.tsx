'use client';

import { useTheme } from 'next-themes';
import { useMounted } from '@/lib/hooks/useMounted';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const mounted = useMounted();
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : undefined;
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`text-muted no-underline hover:text-moss transition-colors ${className}`}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
      disabled={!mounted}
    >
      {mounted ? (isDark ? 'Light' : 'Dark') : 'Theme'}
    </button>
  );
}
