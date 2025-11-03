# Technology Stack

## Build System

- **Next.js**: 16.0.1+ with App Router and Turbopack
- **TypeScript**: 5.9.3+ for type safety (strict mode enabled)
- **Package Manager**: npm

## Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js 16 (App Router)
- **Runtime**: Node.js (via Vercel)
- **Styling**: Tailwind CSS 4.1.16
- **Animations**: Framer Motion 12.23.24
- **Content**: MDX with @next/mdx, next-mdx-remote
- **Theme**: next-themes 0.4.6
- **Icons**: Lucide React 0.548.0
- **Email**: Contact form with API route integration

## Libraries & Dependencies

### Core Dependencies
- `next` - React framework with App Router
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Animation library
- `next-themes` - Dark/light mode management

### Content & MDX
- `@next/mdx` - MDX support for Next.js
- `@mdx-js/loader` & `@mdx-js/react` - MDX processing
- `next-mdx-remote` - Remote MDX rendering
- `gray-matter` - Frontmatter parsing
- `remark-gfm` - GitHub Flavored Markdown
- `rehype-prism-plus` - Syntax highlighting
- `rehype-slug` - Heading IDs
- `rehype-autolink-headings` - Auto-linked headings

### UI & Styling
- `@tailwindcss/typography` - Prose styling for MDX
- `@tailwindcss/postcss` - PostCSS integration
- `autoprefixer` - CSS vendor prefixes

### Development Tools
- `eslint` & `eslint-config-next` - Code linting
- `prettier` & `prettier-plugin-tailwindcss` - Code formatting
- `@playwright/test` - E2E testing (via MCP)

### Email & Contact
- Contact form with validation
- API route for form submission
- Email integration utilities

## Common Commands

```cmd
# Development
npm run dev              # Start dev server (localhost:3000)

# Build
npm run build            # Production build
npm run start            # Start production server
npm run preview          # Build and start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking

# Analysis & Deployment
npm run build:analyze    # Analyze bundle size
npm run pre-deploy       # Pre-deployment checks
npm run deploy           # Deploy to Vercel production
npm run deploy:preview   # Deploy preview to Vercel

# Git Workflow (Custom Scripts)
npm run git:feature      # Create new feature branch
npm run git:dev          # Switch to dev branch
npm run git:main         # Switch to main branch
npm run git:merge-dev    # Merge current branch to dev
npm run git:merge-main   # Merge dev to main
npm run git:status       # Show git status
npm run git:help         # Show git workflow help

# Testing
npx playwright test      # Run E2E tests (via MCP)
```

## Development Environment

- **Platform**: Windows (win32)
- **Shell**: cmd
- **IDE**: Kiro
- **Node Version**: 18+ recommended
- **Deployment**: Vercel (recommended)

## Configuration Files

- `next.config.mjs` - Next.js configuration with MDX support and image optimization
- `tailwind.config.ts` - Tailwind CSS configuration with Inter font
- `tsconfig.json` - TypeScript configuration (strict mode enabled)
- `postcss.config.mjs` - PostCSS configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `vercel.json` - Vercel deployment configuration
- `.env.example` - Environment variables template
- `.env.local` - Local environment variables (not in git)

## Image Optimization

- **Next.js Image Component**: All images use optimized Next.js Image component
- **Format Support**: WebP and AVIF formats with automatic fallbacks
- **Responsive Loading**: Proper `sizes` attributes for different screen sizes
- **Blur Placeholders**: Shimmer loading effects for better UX
- **Remote Patterns**: Configured for Unsplash and other external image sources
- **Caching**: Long-term caching (1 year) for optimal performance
- **Device Sizes**: Optimized for common device breakpoints

## Performance Considerations

- Static generation (SSG) for most pages
- Advanced image optimization with Next.js Image component
- Blur placeholders and progressive loading
- WebP/AVIF format optimization with fallbacks
- Code splitting with dynamic imports
- Tailwind CSS purging for minimal bundle size
- Framer Motion tree-shaking for animations
- MDX compilation at build time
- Long-term image caching strategies

## Browser Support

- Modern browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile Safari and Chrome
- No IE11 support
