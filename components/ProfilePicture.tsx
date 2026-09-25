'use client';

import { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { generateFallbackInitials } from '@/lib/image-utils';
import { ProfilePictureErrorBoundary } from './ProfilePictureErrorBoundary';

export interface ProfilePictureProps {
  size?: number;
  priority?: boolean;
  className?: string;
  /** Optional override for the configured profile picture. */
  src?: string;
}

function InitialsFallback({ size, className = '' }: { size: number; className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-screenshot-fill font-serif text-muted ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      role="img"
      aria-label={`Profile picture of ${siteConfig.author.name}`}
    >
      {generateFallbackInitials(siteConfig.author.name)}
    </div>
  );
}

function ProfilePictureImage({ size = 96, priority = false, className = '', src }: ProfilePictureProps) {
  const [imageError, setImageError] = useState(false);
  const profileSrc = src || siteConfig.author.profilePicture;

  if (!profileSrc || imageError) {
    return <InitialsFallback size={size} className={className} />;
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-screenshot-fill ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        key={profileSrc}
        src={profileSrc}
        alt={siteConfig.author.profilePictureAlt || `Profile picture of ${siteConfig.author.name}`}
        fill
        priority={priority}
        sizes={`${size}px`}
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

/**
 * Square profile picture with an initials fallback. No ring, shadow,
 * animation or glow — plain square image or placeholder.
 */
export function ProfilePicture(props: ProfilePictureProps) {
  return (
    <ProfilePictureErrorBoundary
      fallback={<InitialsFallback size={props.size ?? 96} className={props.className} />}
    >
      <ProfilePictureImage {...props} />
    </ProfilePictureErrorBoundary>
  );
}
