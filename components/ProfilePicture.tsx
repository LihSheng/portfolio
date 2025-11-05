'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  shimmerPlaceholderDataUrl, 
  logProfilePictureMetrics, 
  getOptimalImageQuality,
  preloadProfilePicture,
  cacheProfilePicture,
  getProfilePictureSizes
} from '@/lib/image-utils';
import { siteConfig } from '@/lib/site-config';
import { ProfilePictureErrorBoundary } from './ProfilePictureErrorBoundary';

export interface ProfilePictureProps {
  size: 'small' | 'medium' | 'large';
  priority?: boolean;
  className?: string;
  showFallback?: boolean;
  animate?: boolean;
  src?: string;
  alt?: string;
  quality?: number;
  unoptimized?: boolean;
  onLoadingComplete?: () => void;
  onError?: (error: Error) => void;
  // Accessibility props
  role?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  tabIndex?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  // Screen reader support
  includeScreenReaderText?: boolean;
  screenReaderText?: string;
}

interface SizeConfig {
  width: number;
  height: number;
  className: string;
  sizes: string;
}

const sizeVariants: Record<ProfilePictureProps['size'], SizeConfig> = {
  small: {
    width: 64,
    height: 64,
    className: 'w-16 h-16',
    sizes: '64px',
  },
  medium: {
    width: 128,
    height: 128,
    className: 'w-32 h-32',
    sizes: '(max-width: 768px) 96px, 128px',
  },
  large: {
    width: 192,
    height: 192,
    className: 'w-48 h-48',
    sizes: '(max-width: 768px) 128px, (max-width: 1200px) 160px, 192px',
  },
};

/**
 * Generate fallback initials from author name
 */
function generateInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate comprehensive alt text for profile pictures
 */
function generateProfileAltText(
  authorName: string,
  customAlt?: string,
  size?: 'small' | 'medium' | 'large',
  isLoading?: boolean,
  hasError?: boolean
): string {
  if (customAlt) return customAlt;
  
  if (hasError) {
    return `Profile picture of ${authorName} failed to load`;
  }
  
  if (isLoading) {
    return `Loading profile picture of ${authorName}`;
  }
  
  const sizeText = size === 'large' ? 'large ' : size === 'small' ? 'small ' : '';
  return `${sizeText}Profile picture of ${authorName}`;
}

/**
 * Generate ARIA label for profile picture container
 */
function generateAriaLabel(
  authorName: string,
  customAriaLabel?: string,
  isInteractive?: boolean
): string {
  if (customAriaLabel) return customAriaLabel;
  
  const baseLabel = `Profile picture of ${authorName}`;
  return isInteractive ? `${baseLabel}, interactive element` : baseLabel;
}

/**
 * Handle keyboard navigation for profile picture
 */
function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  onKeyDown?: (event: React.KeyboardEvent) => void
) {
  // Handle Enter and Space keys for interactive profile pictures
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onKeyDown?.(event);
  }
  
  // Handle Escape key to remove focus
  if (event.key === 'Escape') {
    (event.target as HTMLElement).blur();
  }
}

/**
 * ProfilePicture component with responsive sizing, animations, and fallback support
 */
export function ProfilePicture({
  size,
  priority = false,
  className = '',
  showFallback = true,
  animate = true,
  src,
  alt,
  quality = 85,
  unoptimized = false,
  onLoadingComplete,
  onError,
  // Accessibility props
  role = 'img',
  ariaLabel,
  ariaDescribedBy,
  tabIndex,
  onFocus,
  onBlur,
  onKeyDown,
  // Screen reader support
  includeScreenReaderText = true,
  screenReaderText,
}: ProfilePictureProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadStartTime] = useState(() => Date.now());
  const shouldReduceMotion = useReducedMotion();
  
  const sizeConfig = sizeVariants[size];
  const profileSrc = src || siteConfig.author.profilePicture;
  const initials = generateInitials(siteConfig.author.name);
  const optimalQuality = quality === 85 ? getOptimalImageQuality(size) : quality;
  
  // Generate comprehensive accessibility attributes
  const profileAlt = generateProfileAltText(
    siteConfig.author.name,
    alt || siteConfig.author.profilePictureAlt,
    size,
    !imageLoaded && !imageError,
    imageError
  );
  
  const profileAriaLabel = generateAriaLabel(
    siteConfig.author.name,
    ariaLabel,
    Boolean(onKeyDown || tabIndex !== undefined)
  );
  
  const defaultScreenReaderText = screenReaderText || 
    `This is the profile picture of ${siteConfig.author.name}, a ${siteConfig.author.bio?.split('.')[0] || 'developer'}.`;
  
  // Determine if the component should be focusable
  const isFocusable = tabIndex !== undefined || onKeyDown || onFocus || onBlur;
  const computedTabIndex = isFocusable ? (tabIndex ?? 0) : undefined;

  // Preload and cache profile picture for better performance
  useEffect(() => {
    if (profileSrc && priority) {
      preloadProfilePicture(profileSrc, true);
      cacheProfilePicture(profileSrc);
    }
  }, [profileSrc, priority]);

  // Animation variants
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    },
    hover: shouldReduceMotion ? {} : {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const fallbackVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  // Handle image loading error
  const handleImageError = (error?: Error) => {
    const loadTime = Date.now() - loadStartTime;
    const errorObj = error || new Error('Image failed to load');
    
    // Log performance metrics
    logProfilePictureMetrics({
      loadTime,
      size,
      success: false,
      error: errorObj.message,
      timestamp: Date.now(),
    });
    
    setImageError(true);
    onError?.(errorObj);
  };

  // Handle image load success
  const handleImageLoad = () => {
    const loadTime = Date.now() - loadStartTime;
    
    // Log performance metrics
    logProfilePictureMetrics({
      loadTime,
      size,
      success: true,
      timestamp: Date.now(),
    });
    
    setImageLoaded(true);
    onLoadingComplete?.();
  };

  // Determine what to render
  const shouldShowImage = profileSrc && !imageError;
  const shouldShowFallback = !shouldShowImage && showFallback;

  const containerClasses = `
    relative overflow-hidden rounded-full bg-gradient-to-br from-primary/10 to-primary/20 
    border-2 border-primary/20 dark:border-primary/30
    ${sizeConfig.className} 
    ${className}
    ${isFocusable ? 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900' : ''}
    ${isFocusable ? 'cursor-pointer' : ''}
  `.trim();

  const MotionDiv = animate ? motion.div : 'div';
  const MotionImage = animate ? motion(Image) : Image;

  return (
    <MotionDiv 
      className={containerClasses}
      variants={animate ? imageVariants : undefined}
      initial={animate ? 'hidden' : undefined}
      animate={animate ? 'visible' : undefined}
      whileHover={animate ? 'hover' : undefined}
      role={role}
      aria-label={profileAriaLabel}
      aria-describedby={ariaDescribedBy}
      tabIndex={computedTabIndex}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown ? (e) => handleKeyboardNavigation(e, onKeyDown) : undefined}
    >
      {shouldShowImage && (
        <MotionImage
          src={profileSrc}
          alt={profileAlt}
          width={sizeConfig.width}
          height={sizeConfig.height}
          sizes={sizeConfig.sizes}
          priority={priority}
          quality={optimalQuality}
          placeholder="blur"
          blurDataURL={shimmerPlaceholderDataUrl}
          className="object-cover w-full h-full"
          unoptimized={unoptimized}
          onError={() => handleImageError()}
          onLoad={handleImageLoad}
          variants={animate ? imageVariants : undefined}
          initial={animate ? 'hidden' : undefined}
          animate={animate && imageLoaded ? 'visible' : animate ? 'hidden' : undefined}
          style={{
            maxWidth: '100%',
            height: 'auto',
            aspectRatio: '1 / 1',
          }}
        />
      )}

      {shouldShowFallback && (
        <motion.div
          className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold"
          style={{ fontSize: `${sizeConfig.width * 0.3}px` }}
          variants={animate ? fallbackVariants : undefined}
          initial={animate ? 'hidden' : undefined}
          animate={animate ? 'visible' : undefined}
          aria-label={`${siteConfig.author.name} initials: ${initials}`}
          role="img"
        >
          {initials}
          {includeScreenReaderText && (
            <span className="sr-only">
              Fallback initials for {siteConfig.author.name}. {defaultScreenReaderText}
            </span>
          )}
        </motion.div>
      )}

      {/* Loading state when image is loading */}
      {shouldShowImage && !imageLoaded && !imageError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse"
          role="status"
          aria-label="Loading profile picture"
        >
          <div 
            className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
          <span className="sr-only">Loading profile picture of {siteConfig.author.name}</span>
        </div>
      )}

      {/* Screen reader text for additional context */}
      {includeScreenReaderText && shouldShowImage && imageLoaded && (
        <span className="sr-only">
          {defaultScreenReaderText}
        </span>
      )}

      {/* Error state announcement for screen readers */}
      {imageError && (
        <span className="sr-only">
          Profile picture failed to load. Showing initials fallback: {initials}
        </span>
      )}
    </MotionDiv>
  );
}

/**
 * ProfilePicture component wrapped with error boundary for enhanced error handling
 */
export function ProfilePictureWithErrorBoundary(props: ProfilePictureProps) {
  return (
    <ProfilePictureErrorBoundary
      onError={(error, errorInfo) => {
        console.error('ProfilePicture Error Boundary:', error, errorInfo);
        props.onError?.(error);
      }}
      fallback={
        <div 
          className={`
            relative overflow-hidden rounded-full bg-gradient-to-br from-destructive/10 to-destructive/20 
            border-2 border-destructive/20 dark:border-destructive/30
            ${sizeVariants[props.size].className} 
            ${props.className || ''}
          `.trim()}
          role="img"
          aria-label={`Profile picture of ${siteConfig.author.name} failed to load`}
        >
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground font-semibold">
            {generateInitials(siteConfig.author.name)}
            <span className="sr-only">
              Profile picture failed to load due to an error. Showing initials fallback.
            </span>
          </div>
        </div>
      }
    >
      <ProfilePicture {...props} />
    </ProfilePictureErrorBoundary>
  );
}

// Export the wrapped version as default for better error handling
export default ProfilePictureWithErrorBoundary;