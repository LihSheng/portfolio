# Design Document

## Overview

This design document outlines the architecture and implementation approach for a modern developer portfolio website built with Next.js 14+ using the App Router. The application will be a statically-generated site with dynamic capabilities, optimized for performance, SEO, and user experience. The design emphasizes modularity, maintainability, and scalability while keeping the codebase simple and focused.

## Architecture

### High-Level Architecture

The portfolio follows a modern JAMstack architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                         Vercel CDN                          │
│                    (Edge Network + Cache)                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  App Router  │  │  API Routes  │  │   Metadata   │     │
│  │   (Pages)    │  │  (Contact)   │  │     API      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Content Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  MDX Files   │  │  JSON Data   │  │   Assets     │     │
│  │  (Blog/Proj) │  │  (Projects)  │  │  (Images)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI/shadcn/ui components
- **Animations**: Framer Motion
- **Content**: MDX for blog posts and project case studies
- **Theme**: next-themes for dark/light mode
- **SEO**: next-seo, OpenGraph, Twitter cards
- **Analytics**: Plausible or Umami (privacy-focused)
- **Deployment**: Vercel
- **Email**: Nodemailer or Formspree for contact form

### Rendering Strategy

- **Static Generation (SSG)**: Home, About, Contact, Projects list, Blog list
- **Static with Dynamic Paths**: Individual project pages, blog posts
- **API Routes**: Contact form submission, RSS feed generation
- **Client Components**: Theme toggle, animations, interactive filters

## Components and Interfaces

### Core Layout Components

#### RootLayout (`app/layout.tsx`)
```typescript
interface RootLayoutProps {
  children: React.ReactNode;
}

// Responsibilities:
// - Wrap app with ThemeProvider
// - Include global metadata
// - Load global fonts
// - Include analytics scripts
```

#### Navigation (`components/Navigation.tsx`)
```typescript
interface NavigationProps {
  className?: string;
}

// Features:
// - Desktop horizontal nav
// - Mobile hamburger menu
// - Active route highlighting
// - Theme toggle button
```

#### Footer (`components/Footer.tsx`)
```typescript
interface FooterProps {
  className?: string;
}

// Features:
// - Social media links
// - Copyright info
// - Quick links
// - RSS feed link
```

### Page Components

#### HomePage (`app/page.tsx`)
```typescript
// Sections:
// - Hero with animated intro
// - Featured projects (3-4 cards)
// - Recent blog posts (2-3 cards)
// - CTA section
```

#### ProjectsPage (`app/projects/page.tsx`)
```typescript
interface ProjectsPageProps {
  searchParams: { tag?: string };
}

// Features:
// - Project grid with cards
// - Filter by technology/tags
// - Search functionality
// - Animated card entrance
```

#### ProjectDetailPage (`app/projects/[slug]/page.tsx`)
```typescript
interface ProjectDetailPageProps {
  params: { slug: string };
}

// Features:
// - MDX content rendering
// - Image gallery
// - Tech stack badges
// - Links to demo/repo
// - Previous/next navigation
```

#### BlogPage (`app/writing/page.tsx`)
```typescript
interface BlogPageProps {
  searchParams: { tag?: string };
}

// Features:
// - Blog post list
// - Filter by tags
// - Search functionality
// - Reading time estimates
```

#### BlogPostPage (`app/writing/[slug]/page.tsx`)
```typescript
interface BlogPostPageProps {
  params: { slug: string };
}

// Features:
// - MDX rendering with syntax highlighting
// - Table of contents
// - Reading progress indicator
// - Share buttons
// - Related posts
```

#### AboutPage (`app/about/page.tsx`)
```typescript
// Sections:
// - Introduction
// - Skills matrix
// - Experience timeline
// - Education
// - Downloadable resume
```

#### ContactPage (`app/contact/page.tsx`)
```typescript
// Features:
// - Contact form
// - Form validation
// - Success/error states
// - Social links
// - Email/LinkedIn direct links
```

### Reusable Components

#### ProjectCard (`components/ProjectCard.tsx`)
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
  demoUrl?: string;
  repoUrl?: string;
}
```

#### BlogPostCard (`components/BlogPostCard.tsx`)
```typescript
interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  tags: string[];
  slug: string;
}
```

#### SkillBadge (`components/SkillBadge.tsx`)
```typescript
interface SkillBadgeProps {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: React.ReactNode;
}
```

#### Timeline (`components/Timeline.tsx`)
```typescript
interface TimelineItem {
  date: string;
  title: string;
  organization: string;
  description: string;
  type: 'work' | 'education' | 'project';
}

interface TimelineProps {
  items: TimelineItem[];
}
```

#### ThemeToggle (`components/ThemeToggle.tsx`)
```typescript
// Features:
// - Sun/moon icon toggle
// - Smooth transition
// - Persist preference
```

#### ContactForm (`components/ContactForm.tsx`)
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}
```

## Data Models

### Project Data Structure

```typescript
interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  tags: string[];
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  date: string;
  content?: string; // MDX content
}
```

### Blog Post Data Structure

```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // MDX content
  date: string;
  updated?: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  readingTime: number;
  published: boolean;
  coverImage?: string;
}
```

### MDX Frontmatter

```typescript
interface MDXFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  published?: boolean;
  coverImage?: string;
  [key: string]: any;
}
```

### Site Configuration

```typescript
interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    avatar: string;
    bio: string;
    social: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      [key: string]: string | undefined;
    };
  };
  navigation: NavigationItem[];
  analytics: {
    provider: 'plausible' | 'umami';
    siteId: string;
  };
}

interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}
```

## Content Management

### File Structure

```
content/
├── projects/
│   ├── project-1.mdx
│   ├── project-2.mdx
│   └── projects.json (optional metadata)
├── blog/
│   ├── post-1.mdx
│   ├── post-2.mdx
│   └── index.ts (exports)
└── data/
    ├── skills.json
    ├── experience.json
    └── site-config.ts
```

### Content Utilities

```typescript
// lib/content.ts

export async function getAllProjects(): Promise<Project[]>;
export async function getProjectBySlug(slug: string): Promise<Project>;
export async function getFeaturedProjects(): Promise<Project[]>;

export async function getAllBlogPosts(): Promise<BlogPost[]>;
export async function getBlogPostBySlug(slug: string): Promise<BlogPost>;
export async function getRecentBlogPosts(limit: number): Promise<BlogPost[]>;

export function calculateReadingTime(content: string): number;
export function extractExcerpt(content: string, length: number): string;
```

### MDX Configuration

```typescript
// next.config.js with MDX support

import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypePrism,
      rehypeSlug,
      rehypeAutolinkHeadings,
    ],
  },
});
```

## Error Handling

### Error Boundaries

```typescript
// app/error.tsx - Route-level error boundary
interface ErrorProps {
  error: Error;
  reset: () => void;
}

// app/global-error.tsx - Global error boundary
```

### API Error Handling

```typescript
// lib/api-error.ts

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
  }
}

export function handleAPIError(error: unknown): Response {
  if (error instanceof APIError) {
    return Response.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

### Form Validation

```typescript
// lib/validation.ts

import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

## SEO Implementation

### Metadata API

```typescript
// app/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Developer Name - Portfolio',
    template: '%s | Developer Name',
  },
  description: 'Full-stack developer specializing in...',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    siteName: 'Developer Name',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle',
  },
};
```

### Dynamic Metadata

```typescript
// app/projects/[slug]/page.tsx

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}
```

### Structured Data

```typescript
// components/StructuredData.tsx

interface StructuredDataProps {
  type: 'Person' | 'Article' | 'WebSite';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## Styling Architecture

### Tailwind Configuration

```typescript
// tailwind.config.ts

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      typography: {
        // Custom prose styles for MDX
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
```

### Component Styling Patterns

- Use Tailwind utility classes for layout and spacing
- Use Radix UI/shadcn/ui for complex interactive components
- Create custom CSS modules only when necessary
- Use CSS variables for theme colors
- Leverage Tailwind's dark mode class strategy

## Animation Strategy

### Framer Motion Patterns

```typescript
// lib/animations.ts

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { type: 'spring', stiffness: 300 },
};
```

### Reduced Motion Support

```typescript
// hooks/useReducedMotion.ts

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  
  return prefersReducedMotion;
}
```

## API Routes

### Contact Form API

```typescript
// app/api/contact/route.ts

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate
  const validatedData = contactFormSchema.parse(body);
  
  // Send email via Nodemailer or Formspree
  await sendEmail(validatedData);
  
  return Response.json({ success: true });
}
```

### RSS Feed Generation

```typescript
// app/rss.xml/route.ts

export async function GET() {
  const posts = await getAllBlogPosts();
  
  const rss = generateRSSFeed(posts);
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
```

## Testing Strategy

### Unit Testing

- Test utility functions (content parsing, reading time calculation)
- Test form validation schemas
- Test data transformation functions
- Use Vitest for fast unit tests

### Component Testing

- Test interactive components (ContactForm, ThemeToggle, filters)
- Test component rendering with different props
- Use React Testing Library
- Focus on user interactions and accessibility

### Integration Testing

- Test API routes (contact form submission)
- Test content loading and parsing
- Test navigation flows
- Use Playwright for E2E tests (optional)

### Accessibility Testing

- Ensure keyboard navigation works
- Test with screen readers
- Validate ARIA labels
- Check color contrast ratios
- Use axe-core for automated a11y testing

## Performance Optimization

### Image Optimization

- Use Next.js Image component for all images
- Implement blur placeholders
- Use WebP format with fallbacks
- Lazy load images below the fold

### Code Splitting

- Use dynamic imports for heavy components
- Split animations into separate chunks
- Lazy load MDX components

### Caching Strategy

```typescript
// Revalidation times
export const revalidate = 3600; // 1 hour for blog/projects

// Cache headers for API routes
'Cache-Control': 's-maxage=3600, stale-while-revalidate'
```

### Bundle Optimization

- Tree-shake unused Framer Motion features
- Use barrel exports carefully
- Analyze bundle with @next/bundle-analyzer
- Keep client components minimal

## Security Considerations

### Environment Variables

```
# .env.local (never commit)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
FORMSPREE_ENDPOINT=
ANALYTICS_SITE_ID=
```

### API Security

- Implement rate limiting on contact form
- Validate and sanitize all inputs
- Use CORS headers appropriately
- Implement CSRF protection for forms

### Content Security

- Sanitize MDX content
- Use Content Security Policy headers
- Validate file uploads (if any)
- Escape user-generated content

## Deployment Configuration

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://yoursite.com"
  }
}
```

### Build Optimization

- Enable SWC minification
- Use output: 'standalone' for smaller builds
- Implement ISR where appropriate
- Configure image domains

## Monitoring and Analytics

### Analytics Integration

```typescript
// components/Analytics.tsx

export function Analytics() {
  const { theme } = useTheme();
  
  return (
    <Script
      defer
      data-domain="yoursite.com"
      src="https://plausible.io/js/script.js"
    />
  );
}
```

### Error Monitoring

- Consider Sentry for production error tracking
- Log errors to console in development
- Track failed form submissions
- Monitor 404 errors

## Future Enhancements

### Phase 2 Features (Optional)

- GitHub integration for automatic project updates
- CMS integration (Sanity/Contentful) for easier content management
- Newsletter subscription
- Comments system for blog posts
- Search functionality with Algolia or local search
- Internationalization (i18n)
- Progressive Web App (PWA) features

### Advanced Showcase Features

- Interactive demos/sandboxes
- Finance calculators (mortgage, EV cost, forex)
- Mini apps embedded in portfolio
- Client testimonials section
- Case study videos

## Design System

### Color Palette

```typescript
// Defined in Tailwind config and CSS variables
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
  --accent: 217.2 32.6% 17.5%;
  --muted: 217.2 32.6% 17.5%;
}
```

### Typography

- Headings: System font stack or custom font (Inter, Poppins)
- Body: System font stack for performance
- Code: JetBrains Mono or Fira Code
- Use Tailwind Typography plugin for prose content

### Spacing and Layout

- Use Tailwind's spacing scale consistently
- Max content width: 1280px
- Container padding: responsive (4-8-12)
- Grid system: 12-column for complex layouts

## Accessibility Guidelines

- Maintain WCAG 2.1 AA compliance
- Ensure all interactive elements are keyboard accessible
- Provide skip links for navigation
- Use semantic HTML elements
- Include alt text for all images
- Ensure sufficient color contrast
- Support screen reader announcements for dynamic content
- Test with keyboard-only navigation
- Respect prefers-reduced-motion
- Provide focus indicators

## Browser Support

- Modern browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile Safari and Chrome
- No IE11 support required
- Progressive enhancement approach
