'use client';

import { useFeatureFlag } from '@/lib/feature-flags';
import { setPointingHandEnabled, usePointingHandEnabled } from '@/lib/pointing-hand/preference';

/** Plain text switch for the pointing hand, in the same style as ThemeToggle. Hidden below `sm`, where the hand is not drawn. */
export function PointingHandToggle({ className = '' }: { className?: string }) {
  const flagOn = useFeatureFlag('pointingHand');
  const enabled = usePointingHandEnabled();

  if (!flagOn) return null;

  return (
    <button
      type="button"
      onClick={() => setPointingHandEnabled(!enabled)}
      className={`hidden text-muted no-underline sm:inline transition-colors hover:text-moss ${className}`}
    >
      {enabled ? 'Hide hand' : 'Show hand'}
    </button>
  );
}
