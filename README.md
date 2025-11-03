# Developer Portfolio Website

A modern, responsive developer portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features a clean design, dark/light theme support, contact form integration, and optimized performance.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9.3+ (strict mode)
- **Styling**: Tailwind CSS 4.1.16
- **Font**: Inter (Google Fonts)
- **Animations**: Framer Motion 12.23.24
- **Theme**: next-themes 0.4.6 (dark/light mode)
- **Icons**: Lucide React 0.548.0
- **Content**: MDX with @next/mdx, next-mdx-remote
- **Testing**: Playwright (via MCP)
- **Linting**: ESLint + Prettier

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm (recommended package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables in `.env.local`

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### 📋 Available Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
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
```

## ✨ Features

### Implemented ✅
- **Core Infrastructure**: Next.js 16 with TypeScript strict mode and App Router
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Dark/Light Theme**: System-aware theme with smooth transitions
- **Navigation**: Mobile-friendly navigation with active route highlighting
- **Homepage**: Hero section with animated featured content sections
- **About Page**: Personal information, skills timeline, and experience
- **Contact System**: Validated contact form with email integration
- **SEO Optimized**: Meta tags, OpenGraph, Twitter cards, structured data
- **Image Optimization**: Next.js Image component with blur placeholders
- **Typography**: Inter font integration with proper CSS variables
- **Animations**: Framer Motion with performance optimizations
- **Development Tools**: ESLint, Prettier, git workflow automation

### In Development 🚧
- **Content Management**: MDX configuration and content loading utilities
- **Project Showcase**: Project cards with filtering and detail pages
- **Blog System**: MDX-powered blog with syntax highlighting

### Planned 📋
- **RSS Feed**: Automated RSS feed generation
- **Search**: Client-side search functionality
- **Analytics**: Plausible integration

## 📁 Project Structure

```
.
├── app/                      # Next.js App Router pages and layouts
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Homepage with hero and featured sections
│   ├── about/               # About page with personal info and timeline
│   ├── contact/             # Contact page with form
│   ├── projects/            # Projects listing and detail pages (planned)
│   ├── writing/             # Blog listing and post pages (planned)
│   ├── api/contact/         # Contact form API endpoint
│   ├── error.tsx            # Error boundary
│   ├── not-found.tsx        # 404 page
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── globals.css          # Global styles and CSS variables
├── components/              # Reusable React components
│   ├── Navigation.tsx       # Main navigation with mobile menu
│   ├── Footer.tsx           # Footer with social links
│   ├── Hero.tsx             # Homepage hero section
│   ├── ThemeProvider.tsx    # Theme context provider
│   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   ├── ContactForm.tsx      # Contact form with validation
│   ├── FeaturedSection.tsx  # Reusable section wrapper
│   ├── AnimatedGrid.tsx     # Animated grid container
│   ├── Timeline.tsx         # Timeline component for experience
│   ├── SkillBadge.tsx       # Skill badge component
│   ├── ProjectCard.tsx      # Project card with optimized images
│   ├── BlogPostCard.tsx     # Blog post card component
│   ├── OptimizedImage.tsx   # Enhanced Next.js Image wrapper
│   ├── Analytics.tsx        # Analytics integration
│   ├── StructuredData.tsx   # JSON-LD structured data
│   └── __tests__/           # Component tests
├── lib/                     # Utility functions and helpers
│   ├── site-config.ts       # Site metadata and configuration
│   ├── contact-utils.ts     # Contact form utilities
│   ├── email.ts             # Email service integration
│   ├── content.ts           # Content loading utilities (planned)
│   ├── image-utils.ts       # Image optimization utilities
│   └── validation.ts        # Form validation schemas
├── content/                 # Content files (planned)
│   ├── projects/            # Project MDX files
│   └── blog/                # Blog post MDX files
├── public/                  # Static assets
│   ├── images/              # Organized image assets
│   └── fonts/               # Custom fonts (if any)
├── scripts/                 # Build and deployment scripts
│   ├── pre-deploy-check.mjs # Pre-deployment validation
│   └── git-workflow.mjs     # Git workflow automation
├── docs/                    # Documentation
├── types/                   # TypeScript type definitions
├── .kiro/                   # Kiro IDE configuration
│   ├── settings/            # MCP and IDE settings
│   ├── specs/               # Feature specifications
│   └── steering/            # AI assistant guidance
└── .github/                 # GitHub workflows and templates
```

## ⚙️ Configuration Files

- `next.config.mjs` - Next.js configuration with MDX and image optimization
- `tsconfig.json` - TypeScript configuration (strict mode enabled)
- `tailwind.config.ts` - Tailwind CSS configuration with Inter font
- `postcss.config.mjs` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration with Next.js rules
- `.prettierrc` - Prettier configuration with Tailwind plugin
- `vercel.json` - Vercel deployment configuration
- `.env.example` - Environment variables template
- `mdx-components.tsx` - MDX component overrides

## 🌍 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Feature Flags (default: true, set to 'false' to disable)
NEXT_PUBLIC_FEATURE_BLOG=true
NEXT_PUBLIC_FEATURE_PROJECTS=true
NEXT_PUBLIC_FEATURE_CONTACT=true
NEXT_PUBLIC_FEATURE_ABOUT=true
NEXT_PUBLIC_FEATURE_ANALYTICS=true
NEXT_PUBLIC_FEATURE_RSS=false

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_SITE_ID=your-plausible-site-id

# Contact Form (Required for contact functionality)
CONTACT_EMAIL=your-email@domain.com
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

### Feature Flags

The website supports feature flags to control the visibility of different modules:

- `NEXT_PUBLIC_FEATURE_BLOG` - Controls blog/writing section visibility
- `NEXT_PUBLIC_FEATURE_PROJECTS` - Controls projects section visibility  
- `NEXT_PUBLIC_FEATURE_CONTACT` - Controls contact form and page visibility
- `NEXT_PUBLIC_FEATURE_ABOUT` - Controls about page visibility
- `NEXT_PUBLIC_FEATURE_ANALYTICS` - Controls analytics integration
- `NEXT_PUBLIC_FEATURE_RSS` - Controls RSS feed generation (disabled by default)

Set any flag to `'false'` to disable that feature. All other values (including undefined) will enable the feature.

## 🧪 Testing & Development Tools

### Playwright MCP Setup (for Kiro IDE)

This project uses Playwright MCP (Model Context Protocol) for automated browser testing and UI verification.

#### Configuration
The Playwright MCP server is configured in `.kiro/settings/mcp.json`:

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

#### Quick Setup
1. Install Playwright: `npm install -D @playwright/test`
2. Install browser: `npx playwright@1.53.1 install chromium`
3. Restart MCP server in Kiro: Command Palette → "MCP: Reconnect Servers"

#### Troubleshooting
If you get "Executable doesn't exist" errors:
- Check Chromium version from error message (e.g., `chromium-1179`)
- Install matching Playwright version: `npx playwright@1.53.1 install chromium`
- Restart MCP server in Kiro

### Git Workflow Automation

Custom git workflow scripts for consistent development:

```bash
npm run git:feature     # Create new feature branch
npm run git:dev         # Switch to dev branch  
npm run git:merge-dev   # Merge current branch to dev
npm run git:merge-main  # Merge dev to main
npm run git:status      # Show current status
npm run git:help        # Show available commands
```

### Code Quality Tools

- **TypeScript**: Strict mode enabled, run `npm run type-check`
- **ESLint**: Next.js recommended rules, run `npm run lint`
- **Prettier**: Consistent formatting, run `npm run format`
- **Pre-deployment**: Validation script `npm run pre-deploy`

## 🚀 Deployment

### Vercel (Recommended)

1. **Prepare for deployment**
   ```bash
   npm run pre-deploy    # Run validation checks
   ```

2. **Deploy to preview**
   ```bash
   npm run deploy:preview
   ```

3. **Deploy to production**
   ```bash
   npm run deploy
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Test production build locally**
   ```bash
   npm run start
   ```

3. Deploy the `.next` folder to your hosting provider

## 📈 Performance Features

- **Static Generation**: Most pages are statically generated for optimal performance
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Code Splitting**: Automatic code splitting with dynamic imports
- **Font Optimization**: Inter font with proper loading and fallbacks
- **Bundle Analysis**: Use `npm run build:analyze` to analyze bundle size
- **Caching**: Long-term caching strategies for static assets

## 🎨 Customization

### Updating Site Information
Edit `lib/site-config.ts` to update:
- Personal information and bio
- Social media links
- Site metadata and SEO information
- Navigation items

### Styling
- **Colors**: Modify theme colors in `tailwind.config.ts`
- **Typography**: Update font settings in `app/layout.tsx`
- **Components**: Customize component styles in respective files

### Content
- **Projects**: Add MDX files to `content/projects/` (when implemented)
- **Blog Posts**: Add MDX files to `content/blog/` (when implemented)
- **Images**: Store optimized images in `public/images/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `npm run git:feature`
3. Make your changes
4. Run quality checks: `npm run lint && npm run type-check`
5. Commit your changes
6. Push to your fork and submit a pull request

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 🔗 Links

- **Live Site**: [lihsheng.space](https://lihsheng.space)
- **GitHub**: [LihSheng](https://github.com/LihSheng)
- **LinkedIn**: [lihshengng](https://www.linkedin.com/in/lihshengng/)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
