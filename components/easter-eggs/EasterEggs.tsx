'use client';

import { useEffect, useRef, useState } from 'react';
import { useFeatureFlag } from '@/lib/feature-flags';
import { onEasterEgg, usePrefersReducedMotion, useSecretKeys } from '@/lib/easter-eggs';
import { fireConfetti } from './confetti';

const CONSOLE_GREETING_KEY = 'lihsheng:console-greeted';
const TOAST_MS = 3500;

/**
 * Global easter egg host, mounted once from the root layout.
 *
 * Owns the keyboard listener, the DevTools greeting, the small toast and the
 * confetti burst. It renders an empty, non-interactive container until an
 * egg is found, so it has no visible effect for normal visitors. It is
 * rendered statically on purpose: mounting it later from a state update can
 * coincide with a navigation click and drop that navigation.
 */
export default function EasterEggs() {
  const enabled = useFeatureFlag('easterEggs');
  const reducedMotion = usePrefersReducedMotion();
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useSecretKeys(enabled);

  // Console greeting, once per tab session
  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem(CONSOLE_GREETING_KEY)) return;
      sessionStorage.setItem(CONSOLE_GREETING_KEY, '1');
    } catch {
      // Storage blocked; greet anyway.
    }
    console.log('%cHello, curious developer.', 'font-size:16px;font-weight:600;color:#2E5B4C;');
    console.log(
      '%cYou found the first egg. There are more.\n' +
        'Hint: this site remembers the Konami code, and /terminal is not in the menu.',
      'color:#6E6A60;'
    );
  }, [enabled]);

  // React to eggs found anywhere on the site
  useEffect(() => {
    if (!enabled) return;
    return onEasterEgg((detail) => {
      if (detail.message) {
        setToast(detail.message);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setToast(null), TOAST_MS);
      }
      if (detail.id === 'konami' && !reducedMotion) {
        fireConfetti();
      }
    });
  }, [enabled, reducedMotion]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-5"
      role="status"
      aria-live="polite"
      data-testid="easter-egg-host"
    >
      {toast && (
        <div
          key={toast}
          className="egg-toast max-w-[560px] border border-hairline-strong bg-ink px-4 py-2 text-center font-mono text-[13px] text-paper"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
