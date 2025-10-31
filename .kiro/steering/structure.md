# Project Structure

## Current Organization

```
.
├── app/                      # Next.js App Router pages and layouts
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Home page
│   ├── about/               # About page
│   ├── projects/            # Projects listing and detail pages
│   │   └── [slug]/          # Dynamic project detail pages
│   ├── writing/             # Blog listing and post pages
│   │   └── [slug]/          # Dynamic blog post pages
│   ├── contact/             # Contact page
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form endpoint
│   ├── error.tsx            # Error boundary
│   └── not-found.tsx        # 404 page
├── components/              # Reusable React components
│   ├── Navigation.tsx       # Main navigation with mobile menu
│   ├── Footer.tsx           # Site footer
│   ├── ThemeToggle.tsx      # Dark/light mode toggle (temporarily hidden)
│   ├── ProjectCard.tsx      # Project card component with optimized images
│   ├── BlogPostCard.tsx     # Blog post card component with optimized images
│   ├── OptimizedImage.tsx   # Wrapper component for Next.js Image with fallbacks
│   ├── ContactForm.tsx      # Contact form with validation
│   └── ui/                  # shadcn/ui components
├── content/                 # Content files
│   ├── projects/            # Project MDX files
│   └── blog/                # Blog post MDX files
├── lib/                     # Utility functions and helpers
│   ├── content.ts           # Content loading utilities
│   ├── mdx.ts               # MDX parsing and utilities
│   ├── animations.ts        # Framer Motion animation configs
│   ├── image-utils.ts       # Image optimization utilities and placeholders
│   └── validation.ts        # Form validation schemas
├── public/                  # Static assets
│   ├── images/              # Image assets
│   │   ├── projects/        # Project screenshots and images
│   │   └── blog/            # Blog post cover images (optional)
│   └── fonts/               # Custom fonts (if any)
├── styles/                  # Global styles
│   └── globals.css          # Global CSS and Tailwind imports
├── .kiro/                   # Kiro configuration
│   ├── specs/               # Feature specifications
│   └── steering/            # AI assistant guidance
└── .vscode/                 # VSCode settings
```

## Conventions

### File Organization

- **Pages**: Use Next.js App Router conventions in `app/` directory
- **Components**: Organize by feature or type in `components/`
- **Content**: Store MDX files in `content/` organized by type
- **Utilities**: Place helper functions in `lib/` with clear naming
- **Styles**: Use Tailwind utilities; global styles in `styles/globals.css`

### Naming Conventions

- **Files**: PascalCase for components (`ProjectCard.tsx`), kebab-case for utilities (`reading-time.ts`)
- **Components**: PascalCase for component names
- **Functions**: camelCase for function names
- **Constants**: UPPER_SNAKE_CASE for constants
- **Types/Interfaces**: PascalCase with descriptive names
- **CSS Classes**: Use Tailwind utilities; custom classes in kebab-case

### Code Organization

- **Component Structure**: Props interface → Component → Exports
- **Imports Order**: React → Next.js → Third-party → Local components → Utilities → Types → Styles
- **File Exports**: Named exports for utilities, default exports for pages/components
- **Type Definitions**: Co-locate with components or in separate `.types.ts` files for shared types

## Architecture Patterns

### JAMstack Architecture
- Static generation for performance
- API routes for dynamic functionality
- Content stored as files (MDX/JSON)
- Deployed to CDN (Vercel)

### Component Patterns
- Server Components by default (Next.js App Router)
- Client Components only when needed (interactivity, hooks)
- Composition over inheritance
- Props drilling avoided with proper component structure

### Data Flow
- Content loaded at build time via file system
- Static generation with ISR for content updates
- Client-side state for UI interactions (theme, filters)
- Form submissions via API routes

### Styling Strategy
- Tailwind utility-first approach
- shadcn/ui for complex components
- CSS variables for theming
- Responsive design with mobile-first approach
