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