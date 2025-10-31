# Technology Stack

## Build System

- **Next.js**: 16.0.1+ with App Router and Turbopack
- **TypeScript**: 5.9.3+ for type safety
- **Package Manager**: npm

## Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js 16 (App Router)
- **Runtime**: Node.js (via Vercel)
- **Styling**: Tailwind CSS 4.1.16
- **Animations**: Framer Motion 12.23.24
- **Content**: MDX with @next/mdx, next-mdx-remote
- **Theme**: next-themes 0.4.6

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
- `@playwright/test` - E2E testing

## Common Commands

```cmd
# Development
npm run dev              # Start dev server (localhost:3000)

# Build
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Testing
npx playwright test      # Run E2E tests
```

## Development Environment

- **Platform**: Windows (win32)
- **Shell**: cmd
- **IDE**: Kiro
- **Node Version**: 18+ recommended
- **Deployment**: Vercel (recommended)

## Configuration Files

- `next.config.mjs` - Next.js configuration with MDX support
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier formatting rules

## Performance Considerations

- Static generation (SSG) for most pages
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Tailwind CSS purging for minimal bundle size
- Framer Motion tree-shaking for animations
- MDX compilation at build time

## Browser Support

- Modern browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile Safari and Chrome
- No IE11 support
