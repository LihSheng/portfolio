/**
 * Generates a simple blur placeholder for images
 */
export function generateBlurPlaceholder(width: number = 8, height: number = 8): string {
  // Create a simple gradient blur placeholder
  const canvas = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  const base64 = Buffer.from(canvas).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Generates a blur placeholder for dark theme
 */
export function generateDarkBlurPlaceholder(width: number = 8, height: number = 8): string {
  const canvas = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1f2937;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  const base64 = Buffer.from(canvas).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Simple shimmer placeholder for loading states
 */
export const shimmerPlaceholder = `
  <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#e5e7eb;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:1" />
        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          values="-100 0;100 0;-100 0"
          dur="2s"
          repeatCount="indefinite"
        />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#shimmer)" />
  </svg>
`;

export const shimmerPlaceholderDataUrl = `data:image/svg+xml;base64,${Buffer.from(shimmerPlaceholder).toString('base64')}`;

/**
 * Generate fallback initials from a name
 */
export function generateFallbackInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate a blur placeholder specifically for profile pictures
 */
export function generateProfilePicturePlaceholder(size: number = 128): string {
  const canvas = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="profileGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </radialGradient>
      </defs>
      <circle cx="50%" cy="50%" r="50%" fill="url(#profileGrad)" />
    </svg>
  `;
  
  const base64 = Buffer.from(canvas).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Validate profile picture configuration
 */
export function validateProfilePictureConfig(src?: string): {
  isValid: boolean;
  error?: string;
} {
  if (!src) {
    return { isValid: false, error: 'No profile picture source provided' };
  }

  // Check if it's a valid URL or data URL
  try {
    if (src.startsWith('data:')) {
      return { isValid: true };
    }
    
    if (src.startsWith('/') || src.startsWith('http')) {
      return { isValid: true };
    }
    
    return { isValid: false, error: 'Invalid profile picture URL format' };
  } catch {
    return { isValid: false, error: 'Invalid profile picture URL' };
  }
}

/**
 * Profile picture configuration interface
 */
export interface ProfilePictureConfig {
  src: string;
  alt: string;
  fallbackInitials: string;
  sizes: {
    small: { width: number; height: number };
    medium: { width: number; height: number };
    large: { width: number; height: number };
  };
}

/**
 * Get profile picture configuration from site config
 */
export function getProfilePictureConfig(
  profilePicture?: string,
  profilePictureAlt?: string,
  authorName?: string,
  fallbackAvatar?: string
): ProfilePictureConfig {
  const fallbackInitials = authorName ? generateFallbackInitials(authorName) : 'U';
  
  return {
    src: profilePicture || fallbackAvatar || '',
    alt: profilePictureAlt || `Profile picture of ${authorName || 'User'}`,
    fallbackInitials,
    sizes: {
      small: { width: 64, height: 64 },
      medium: { width: 128, height: 128 },
      large: { width: 192, height: 192 },
    },
  };
}

/**
 * Generate profile picture blur placeholder with proper sizing
 */
export function generateProfilePictureBlurPlaceholder(size: 'small' | 'medium' | 'large' = 'medium'): string {
  const dimensions = {
    small: 64,
    medium: 128,
    large: 192,
  };
  
  return generateProfilePicturePlaceholder(dimensions[size]);
}

/**
 * Handle profile picture loading errors
 */
export function handleProfilePictureError(
  error: Error,
  fallbackSrc?: string
): { shouldShowFallback: boolean; fallbackSrc?: string; errorMessage: string } {
  console.warn('Profile picture loading failed:', error.message);
  
  return {
    shouldShowFallback: true,
    fallbackSrc,
    errorMessage: error.message,
  };
}

/**
 * Generate initials avatar as SVG data URL
 */
export function generateInitialsAvatar(
  initials: string,
  size: number = 128,
  backgroundColor: string = '#6366F1',
  textColor: string = 'white'
): string {
  const fontSize = Math.floor(size * 0.4);
  
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${backgroundColor}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="Inter, system-ui, sans-serif" font-size="${fontSize}" font-weight="600">
        ${initials}
      </text>
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Performance monitoring for profile picture loading
 */
export interface ProfilePictureMetrics {
  loadTime: number;
  size: 'small' | 'medium' | 'large';
  success: boolean;
  error?: string;
  timestamp: number;
}

/**
 * Log profile picture performance metrics
 */
export function logProfilePictureMetrics(metrics: ProfilePictureMetrics): void {
  if (process.env.NODE_ENV === 'development') {
    const status = metrics.success ? '✅' : '❌';
    console.log(
      `${status} ProfilePicture [${metrics.size}]: ${metrics.loadTime}ms`,
      metrics.error ? `- Error: ${metrics.error}` : ''
    );
  }
  
  // In production, you could send metrics to analytics service
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Example: Send to analytics
    // analytics.track('profile_picture_load', metrics);
  }
}

/**
 * Get optimal image quality based on size and connection
 */
export function getOptimalImageQuality(size: 'small' | 'medium' | 'large'): number {
  // Check for slow connection
  const connection = (navigator as any)?.connection;
  const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
  
  if (isSlowConnection) {
    return size === 'small' ? 70 : size === 'medium' ? 75 : 80;
  }
  
  // Default quality settings
  return size === 'small' ? 85 : size === 'medium' ? 90 : 95;
}

/**
 * Preload profile picture for better performance
 */
export function preloadProfilePicture(src: string, priority: boolean = false): void {
  if (typeof window === 'undefined' || !src) return;
  
  const link = document.createElement('link');
  link.rel = priority ? 'preload' : 'prefetch';
  link.as = 'image';
  link.href = src;
  
  // Add to head
  document.head.appendChild(link);
  
  // Clean up after load
  link.onload = () => {
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }, 1000);
  };
}

/**
 * Generate responsive sizes attribute for profile pictures
 */
export function getProfilePictureSizes(size: 'small' | 'medium' | 'large'): string {
  switch (size) {
    case 'small':
      return '64px';
    case 'medium':
      return '(max-width: 768px) 96px, 128px';
    case 'large':
      return '(max-width: 768px) 128px, (max-width: 1200px) 160px, 192px';
    default:
      return '128px';
  }
}

/**
 * Cache profile picture in browser cache
 */
export function cacheProfilePicture(src: string): Promise<void> {
  if (typeof window === 'undefined' || !src || !('caches' in window)) {
    return Promise.resolve();
  }
  
  return caches.open('profile-pictures-v1').then(cache => {
    return cache.add(src).catch(error => {
      console.warn('Failed to cache profile picture:', error);
    });
  });
}