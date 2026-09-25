'use client';

import { useRef, useState } from 'react';
import { ProfilePicture, type ProfilePictureProps } from '@/components/ProfilePicture';
import { useFeatureFlag } from '@/lib/feature-flags';
import { announceEasterEgg, usePrefersReducedMotion } from '@/lib/easter-eggs';

const CLICKS_TO_UNLOCK = 7;
const CLICK_WINDOW_MS = 3000;

/**
 * Wraps the About page portrait. Seven quick clicks make it wobble and, when
 * NEXT_PUBLIC_PROFILE_PICTURE_ALT_URL is set, flip to a second photo. Single
 * clicks do nothing, so the picture behaves normally for everyone else.
 */
export function AvatarEgg(props: ProfilePictureProps) {
  const enabled = useFeatureFlag('easterEggs');
  const reducedMotion = usePrefersReducedMotion();
  const clickTimes = useRef<number[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [wobbleKey, setWobbleKey] = useState(0);
  const altPicture = process.env.NEXT_PUBLIC_PROFILE_PICTURE_ALT_URL;

  if (!enabled) return <ProfilePicture {...props} />;

  const handleClick = () => {
    const now = Date.now();
    clickTimes.current = clickTimes.current.filter((t) => now - t < CLICK_WINDOW_MS).concat(now);
    if (clickTimes.current.length < CLICKS_TO_UNLOCK) return;
    clickTimes.current = [];
    if (!reducedMotion) setWobbleKey((k) => k + 1);
    if (altPicture) {
      setFlipped((f) => !f);
      announceEasterEgg({ id: 'avatar', message: 'Behind the scenes. Seven more clicks flips it back.' });
    } else {
      announceEasterEgg({ id: 'avatar', message: "Yes, that's really me. Thanks for checking." });
    }
  };

  return (
    <div
      key={wobbleKey}
      onClick={handleClick}
      className={`inline-block shrink-0 ${wobbleKey > 0 ? 'egg-wobble' : ''}`}
    >
      <ProfilePicture {...props} src={flipped && altPicture ? altPicture : undefined} />
    </div>
  );
}
