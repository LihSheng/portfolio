'use client';

import { useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useMounted } from '@/lib/hooks/useMounted';
import { useFeatureFlag } from '@/lib/feature-flags';
import { announceEasterEgg } from '@/lib/easter-eggs';

/** Easter egg: flip light/dark this many times within the window for a third theme. */
const SECRET_THEME_CLASS = 'theme-terminal';
const SECRET_THEME_CLICKS = 10;
const SECRET_THEME_WINDOW_MS = 5000;

export function ThemeToggle({ className = '' }: { className?: string }) {
  const mounted = useMounted();
  const { theme, setTheme, systemTheme } = useTheme();
  const easterEggs = useFeatureFlag('easterEggs');
  const clickTimes = useRef<number[]>([]);
  const [secretTheme, setSecretTheme] = useState(false);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : undefined;
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => {
    // Leaving the secret theme takes one normal click
    if (secretTheme) {
      setSecretTheme(false);
      document.documentElement.classList.remove(SECRET_THEME_CLASS);
      clickTimes.current = [];
      return;
    }

    setTheme(isDark ? 'light' : 'dark');

    if (!easterEggs) return;
    const now = Date.now();
    clickTimes.current = clickTimes.current
      .filter((t) => now - t < SECRET_THEME_WINDOW_MS)
      .concat(now);
    if (clickTimes.current.length >= SECRET_THEME_CLICKS) {
      clickTimes.current = [];
      setSecretTheme(true);
      document.documentElement.classList.add(SECRET_THEME_CLASS);
      announceEasterEgg({
        id: 'secret-theme',
        message: 'Terminal mode unlocked. Click the toggle once to go back.',
      });
    }
  };

  const label = secretTheme ? 'Exit terminal mode' : `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <button
      onClick={toggleTheme}
      className={`text-muted no-underline hover:text-moss transition-colors ${className}`}
      aria-label={mounted ? label : 'Toggle theme'}
      disabled={!mounted}
    >
      {mounted ? (secretTheme ? 'Exit' : isDark ? 'Light' : 'Dark') : 'Theme'}
    </button>
  );
}
