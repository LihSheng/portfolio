# Image Optimization Guidelines

## Next.js Image Component Usage

Always use the Next.js Image component instead of regular `<img>` tags for optimal performance.

### Basic Usage

```tsx
import Image from 'next/image';

<Image
  src="/images/example.jpg"
  alt="Descriptive alt text"
  width={800}
  height={400}
  className="object-cover"
/>
```

### For Dynamic/Fill Images

```tsx
<div className="relative aspect-video">
  <Image
    src={imageSrc}
    alt="Descriptive alt text"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

## Image Optimization Features

### Blur Placeholders

All images should include blur placeholders for better UX:

```tsx
import { shimmerPlaceholderDataUrl } from '@/lib/image-utils';

<Image
  src={imageSrc}
  alt="Alt text"
  fill
  placeholder="blur"
  blurDataURL={shimmerPlaceholderDataUrl}
  sizes="..."
/>
```

### Responsive Sizing

Always include `sizes` attribute for responsive images:

- **Full width mobile, half on tablet, third on desktop**: `"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- **Full width mobile, 80% on larger screens**: `"(max-width: 768px) 100vw, 80vw"`
- **Hero images**: `"(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"`

### Priority Loading

Use `priority` prop for above-the-fold images:

```tsx
<Image
  src={imageSrc}
  alt="Hero image"
  fill
  priority
  placeholder="blur"
  blurDataURL={shimmerPlaceholderDataUrl}
/>
```

## Image Utilities

### Available Utilities (`lib/image-utils.ts`)

- `shimmerPlaceholderDataUrl` - Default shimmer loading placeholder
- `generateBlurPlaceholder()` - Generate custom blur placeholders
- `generateDarkBlurPlaceholder()` - Dark theme blur placeholders

### OptimizedImage Component

Use the `OptimizedImage` component for enhanced error handling:

```tsx
import { OptimizedImage } from '@/components/OptimizedImage';

<OptimizedImage
  src={imageSrc}
  alt="Alt text"
  fill
  fallbackSrc="/images/placeholder.jpg"
  showFallback={true}
/>
```

## Configuration

### Next.js Image Configuration (`next.config.mjs`)

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
}
```

## Best Practices

### Image Organization

- **Project images**: Store in `public/images/projects/`
- **Blog images**: Store in `public/images/blog/` (optional)
- **Static assets**: Store in `public/images/`

### Fallback Handling

- Always provide meaningful alt text
- Use conditional rendering for optional images: `{imageUrl && <Image ... />}`
- Implement graceful fallbacks with OptimizedImage component
- Use SVG data URLs for avatars and icons when possible

### Performance

- Use `priority` for above-the-fold images
- Always include `sizes` attribute for responsive images
- Prefer WebP/AVIF formats (handled automatically by Next.js)
- Use blur placeholders for better perceived performance
- Implement proper aspect ratios to prevent layout shift

### Content Management

- Blog posts can work without cover images (conditional rendering)
- Project images should always be provided
- Use external services (Unsplash) for placeholder content
- Replace placeholder images with actual content when available

## Common Patterns

### Blog Post Cover Images

```tsx
{post.coverImage && (
  <div className="relative aspect-video overflow-hidden">
    <Image
      src={post.coverImage}
      alt={post.title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      placeholder="blur"
      blurDataURL={shimmerPlaceholderDataUrl}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
)}
```

### Project Screenshots

```tsx
<div className="relative aspect-video overflow-hidden bg-muted">
  <Image
    src={project.image}
    alt={project.title}
    fill
    className="object-cover"
    priority
    placeholder="blur"
    blurDataURL={shimmerPlaceholderDataUrl}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
  />
</div>
```

### Avatar Images

```tsx
// Use SVG data URLs for consistent avatars
const avatarDataUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K";
```