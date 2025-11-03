# Development Guidelines

## Current Implementation Status

### Completed Features ✅
- **Core Infrastructure**: Next.js 16 setup with TypeScript, Tailwind CSS 4, and App Router
- **Layout Components**: Navigation, Footer, Theme Provider with dark/light mode
- **Homepage**: Hero section with animated featured content sections
- **About Page**: Personal information, skills timeline, and experience
- **Contact System**: Contact form with validation, API endpoint, and email integration
- **SEO & Metadata**: Comprehensive meta tags, OpenGraph, Twitter cards, structured data
- **Image Optimization**: Next.js Image component with blur placeholders and responsive sizing
- **Typography**: Inter font integration with proper CSS variables
- **Animations**: Framer Motion integration with performance optimizations
- **Development Tools**: ESLint, Prettier, TypeScript strict mode, git workflow scripts

### In Progress 🚧
- **Content Management**: MDX configuration and content loading utilities
- **Project Showcase**: Project cards and detail pages
- **Blog System**: Blog post cards and MDX rendering

### Next Priorities 📋
1. Complete MDX configuration and content utilities
2. Implement project showcase with filtering
3. Build blog system with syntax highlighting
4. Add RSS feed generation
5. Implement search functionality

## Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `dev` - Development integration branch  
- `feature/*` - Feature development branches

### Git Workflow Scripts
Use the npm scripts for consistent git workflow:
```cmd
npm run git:feature     # Create new feature branch
npm run git:dev          # Switch to dev branch
npm run git:merge-dev    # Merge current branch to dev
npm run git:merge-main   # Merge dev to main
npm run git:status       # Show current status
```

### Code Quality
- **TypeScript**: Strict mode enabled, no implicit any
- **ESLint**: Next.js recommended rules with custom additions
- **Prettier**: Consistent code formatting with Tailwind plugin
- **Type Checking**: Run `npm run type-check` before commits

### Testing Strategy
- **E2E Testing**: Playwright via MCP for UI testing
- **Component Testing**: Planned with React Testing Library
- **API Testing**: Manual testing with `test-contact-api.js`

### Performance Guidelines
- Use Server Components by default (Next.js App Router)
- Client Components only when needed (interactivity, hooks)
- Optimize images with Next.js Image component
- Implement proper loading states and error boundaries
- Use dynamic imports for code splitting when appropriate

### Deployment Process
1. Run pre-deployment checks: `npm run pre-deploy`
2. Deploy preview: `npm run deploy:preview`
3. Test preview deployment
4. Deploy to production: `npm run deploy`

## Environment Setup

### Required Environment Variables
```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://lihsheng.space

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_SITE_ID=your-site-id

# Contact Form (Required for contact functionality)
CONTACT_EMAIL=your-email@domain.com
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

### Local Development
1. Copy `.env.example` to `.env.local`
2. Fill in required environment variables
3. Run `npm run dev` to start development server
4. Access at `http://localhost:3000`

## MCP (Model Context Protocol) Setup

### Playwright MCP Configuration
Located in `.kiro/settings/mcp.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server@latest"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Troubleshooting MCP
If you encounter "Executable doesn't exist" errors:
1. Check Chromium version needed from error message
2. Install matching Playwright version: `npx playwright@1.53.1 install chromium`
3. Restart MCP server in Kiro: Command Palette → "MCP: Reconnect Servers"

## Content Management

### File Organization
- **Projects**: Store MDX files in `content/projects/`
- **Blog Posts**: Store MDX files in `content/blog/`
- **Images**: Store in `public/images/` with organized subdirectories

### MDX Frontmatter Structure
```yaml
---
title: "Project/Post Title"
description: "Brief description"
date: "2024-01-01"
tags: ["tag1", "tag2"]
featured: true
image: "/images/projects/project-name.jpg"
---
```

### Image Guidelines
- Always use Next.js Image component
- Include blur placeholders for better UX
- Use proper `sizes` attribute for responsive images
- Store images in organized directories under `public/images/`
- Optimize images before adding to project

## Common Issues & Solutions

### Theme Toggle Issues
If theme toggle stops working:
1. Check ThemeProvider is properly wrapped around app
2. Verify `suppressHydrationWarning` is set on html and body
3. Ensure theme persistence with localStorage

### Build Errors
Common build issues:
1. **TypeScript errors**: Run `npm run type-check` to identify issues
2. **Import errors**: Check file paths and exports
3. **Environment variables**: Ensure all required vars are set

### Performance Issues
1. **Large bundle size**: Use `npm run build:analyze` to identify large dependencies
2. **Slow page loads**: Check image optimization and component lazy loading
3. **Layout shift**: Ensure proper aspect ratios for images and containers