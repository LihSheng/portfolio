# Developer Portfolio Website

A modern, responsive developer portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features a clean design, dark/light theme support, MDX-powered blog and projects, contact form integration, and optimized performance.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9.3+ (strict mode)
- **Styling**: Tailwind CSS 4.1.16
- **Font**: Inter (Google Fonts)
- **Animations**: Framer Motion 12.23.24
- **Theme**: next-themes 0.4.6 (dark/light mode)
- **Icons**: Lucide React 0.548.0
- **Content**: MDX with @next/mdx, next-mdx-remote
- **Email**: Nodemailer for contact form
- **Testing**: Playwright (via MCP)
- **Linting**: ESLint + Prettier
- **Deployment**: Vercel

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm (recommended package manager)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LihSheng/portfolio.git
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
   Fill in the required environment variables in `.env.local` (see [Environment Variables](#-environment-variables) section)

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

Create a `.env.local` file based on `.env.example` with the following variables:

### Required Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Contact Form (Required for contact functionality)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your-app-password
NEXT_PUBLIC_CONTACT_EMAIL=your.email@gmail.com
```

### Optional Variables

```env
# Profile Picture (optional - leave empty to use fallback initials)
NEXT_PUBLIC_PROFILE_PICTURE_URL=/images/profile.jpg

# Analytics (Choose one)
# Plausible Analytics
NEXT_PUBLIC_ANALYTICS_SITE_ID=your-site-id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=plausible.io

# Umami Analytics (alternative)
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
# NEXT_PUBLIC_UMAMI_URL=https://your-umami-instance.com

# Alternative Contact Form (instead of SMTP)
# FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

# Feature Flags (default: true, set to 'false' to disable)
NEXT_PUBLIC_FEATURE_BLOG=true
NEXT_PUBLIC_FEATURE_PROJECTS=true
NEXT_PUBLIC_FEATURE_CONTACT=true
NEXT_PUBLIC_FEATURE_ABOUT=true
NEXT_PUBLIC_FEATURE_ANALYTICS=true
NEXT_PUBLIC_FEATURE_RSS=false

# Development
NODE_ENV=development
```

### Environment Variable Details

#### Contact Form Setup
You have two options for the contact form:

**Option 1: SMTP (Recommended)**
- Set up SMTP credentials (Gmail, Outlook, etc.)
- Use app-specific passwords for Gmail
- Configure `SMTP_*` variables

**Option 2: Formspree**
- Create account at [Formspree](https://formspree.io)
- Set `FORMSPREE_ENDPOINT` instead of SMTP variables

#### Analytics Setup
Choose one analytics provider:

**Plausible (Privacy-focused)**
- Sign up at [Plausible](https://plausible.io)
- Set `NEXT_PUBLIC_ANALYTICS_SITE_ID`

**Umami (Self-hosted option)**
- Set up Umami instance
- Configure `NEXT_PUBLIC_UMAMI_*` variables

#### Feature Flags

Control which sections of the website are visible:

- `NEXT_PUBLIC_FEATURE_BLOG` - Controls blog/writing section visibility
- `NEXT_PUBLIC_FEATURE_PROJECTS` - Controls projects section visibility  
- `NEXT_PUBLIC_FEATURE_CONTACT` - Controls contact form and page visibility
- `NEXT_PUBLIC_FEATURE_ABOUT` - Controls about page visibility
- `NEXT_PUBLIC_FEATURE_ANALYTICS` - Controls analytics integration
- `NEXT_PUBLIC_FEATURE_RSS` - Controls RSS feed generation (disabled by default)

Set any flag to `'false'` to disable that feature. All other values (including undefined) will enable the feature.

## 📝 Content Management

### Adding New Blog Posts

1. **Create a new MDX file** in `content/blog/`:
   ```bash
   touch content/blog/my-new-post.mdx
   ```

2. **Add frontmatter and content**:
   ```mdx
   ---
   title: "Your Blog Post Title"
   excerpt: "A brief description of your post"
   date: "2024-01-20"
   tags: ["Next.js", "React", "Tutorial"]
   author:
     name: "Your Name"
     avatar: "data:image/svg+xml;base64,..." # Optional
   published: true
   coverImage: "/images/blog/post-cover.jpg" # Optional
   ---

   # Your Blog Post Title

   Your content goes here. You can use:

   - **Markdown syntax**
   - `Code snippets`
   - Images: ![Alt text](/images/blog/image.jpg)
   - And more!

   ## Code Blocks

   ```javascript
   const example = "Syntax highlighting works!";
   console.log(example);
   ```
   ```

3. **Blog post frontmatter fields**:
   - `title` (required): Post title
   - `excerpt` (required): Brief description for cards and SEO
   - `date` (required): Publication date (YYYY-MM-DD format)
   - `tags` (optional): Array of tags for filtering
   - `author` (optional): Author information
   - `published` (optional): Set to `false` to hide post
   - `coverImage` (optional): Cover image URL

4. **The post will automatically appear** in the blog listing and be available at `/writing/filename-without-extension`

### Adding New Projects

1. **Create a new MDX file** in `content/projects/`:
   ```bash
   touch content/projects/my-awesome-project.mdx
   ```

2. **Add frontmatter and content**:
   ```mdx
   ---
   title: "My Awesome Project"
   description: "A brief description of what this project does"
   image: "https://images.unsplash.com/photo-example" # or "/images/projects/project.jpg"
   tags: ["React", "TypeScript", "API"]
   techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"]
   demoUrl: "https://demo.example.com" # Optional
   repoUrl: "https://github.com/username/repo" # Optional
   featured: true # Set to true to show on homepage
   date: "2024-01-20"
   ---

   # My Awesome Project

   ## Project Overview
   Describe what your project does and why it's interesting.

   ## Key Features
   - Feature 1
   - Feature 2
   - Feature 3

   ## Technical Implementation
   Explain the technical details, challenges, and solutions.

   ## Screenshots
   ![Project Screenshot](/images/projects/screenshot.jpg)
   ```

3. **Project frontmatter fields**:
   - `title` (required): Project name
   - `description` (required): Brief description for cards and SEO
   - `image` (required): Main project image/screenshot
   - `tags` (required): Array of technology tags
   - `techStack` (required): Array of technologies used
   - `demoUrl` (optional): Live demo URL
   - `repoUrl` (optional): GitHub repository URL
   - `featured` (optional): Show on homepage (true/false)
   - `date` (required): Project completion date

4. **The project will automatically appear** in the projects listing and be available at `/projects/filename-without-extension`

### Managing Images

1. **Organize images** in the `public/images/` directory:
   ```
   public/images/
   ├── blog/           # Blog post images
   ├── projects/       # Project screenshots
   ├── profile.jpg     # Profile picture (optional)
   └── ...
   ```

2. **Image optimization** is handled automatically by Next.js Image component

3. **Use relative paths** in your MDX content:
   ```markdown
   ![Alt text](/images/projects/screenshot.jpg)
   ```

4. **External images** (like Unsplash) work too:
   ```markdown
   ![Alt text](https://images.unsplash.com/photo-...)
   ```

### Updating Site Information

Edit `lib/site-config.ts` to update:

```typescript
export const siteConfig: SiteConfig = {
  name: 'Your Name',
  title: 'Your Name - Full Stack Developer',
  description: 'Your professional description',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com',
  author: {
    name: 'Your Name',
    email: 'your.email@domain.com',
    bio: 'Your professional bio',
    social: {
      github: 'https://github.com/yourusername',
      linkedin: 'https://www.linkedin.com/in/yourprofile/',
    },
  },
  // ... other config
};
```

### Content Workflow

1. **Development**: Create and edit content locally
2. **Preview**: Use `npm run dev` to see changes immediately
3. **Build**: Run `npm run build` to generate static pages
4. **Deploy**: Push to main branch for automatic Vercel deployment

### Content Guidelines

- **Use descriptive filenames** (they become URLs)
- **Optimize images** before adding them
- **Write meaningful alt text** for accessibility
- **Use consistent date formats** (YYYY-MM-DD)
- **Tag content appropriately** for filtering
- **Test locally** before deploying

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

#### Initial Setup

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project**:
   ```bash
   vercel link
   ```

#### Deployment Process

1. **Run pre-deployment checks**:
   ```bash
   npm run pre-deploy
   ```
   This validates:
   - TypeScript compilation
   - ESLint rules
   - Build process
   - Environment variables

2. **Deploy to preview** (for testing):
   ```bash
   npm run deploy:preview
   ```
   - Creates a preview deployment
   - Generates a unique URL for testing
   - Safe to test changes before production

3. **Deploy to production**:
   ```bash
   npm run deploy
   ```
   - Deploys to your production domain
   - Runs pre-deployment checks automatically
   - Updates live site

#### Environment Variables in Vercel

1. **Via Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from your `.env.local`

2. **Via Vercel CLI**:
   ```bash
   vercel env add NEXT_PUBLIC_SITE_URL
   vercel env add SMTP_HOST
   # ... add all required variables
   ```

3. **Required for production**:
   - `NEXT_PUBLIC_SITE_URL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - Analytics variables (if using)

#### Automatic Deployments

1. **Connect GitHub repository** in Vercel dashboard
2. **Enable automatic deployments**:
   - Production deployments: `main` branch
   - Preview deployments: Pull requests
3. **Every push to main** triggers automatic deployment

### Alternative Hosting Providers

#### Netlify

1. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment variables**: Add in Netlify dashboard

3. **Deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

#### Self-Hosted (VPS/Server)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm run start
   ```

3. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 startup
   pm2 save
   ```

4. **Set up reverse proxy** (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Deployment Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Contact form tested and working
- [ ] All content reviewed and published
- [ ] Images optimized and loading correctly
- [ ] Analytics configured (if enabled)
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Performance tested (Lighthouse score >90)
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked

### Troubleshooting Deployment

#### Common Issues

1. **Build failures**:
   ```bash
   # Check TypeScript errors
   npm run type-check
   
   # Check linting errors
   npm run lint
   
   # Test build locally
   npm run build
   ```

2. **Environment variable issues**:
   - Verify all required variables are set
   - Check variable names (case-sensitive)
   - Ensure `NEXT_PUBLIC_` prefix for client-side variables

3. **Contact form not working**:
   - Verify SMTP credentials
   - Check email provider settings
   - Test with a simple email client first

4. **Images not loading**:
   - Check file paths and extensions
   - Verify images exist in `public/` directory
   - Check Next.js image configuration

#### Performance Optimization

1. **Analyze bundle size**:
   ```bash
   npm run build:analyze
   ```

2. **Optimize images**:
   - Use WebP format when possible
   - Compress images before uploading
   - Use appropriate sizes for different devices

3. **Monitor performance**:
   - Use Vercel Analytics
   - Run Lighthouse audits regularly
   - Monitor Core Web Vitals

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

## 🔧 Troubleshooting

### Common Issues

#### Development Server Won't Start

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### Theme Toggle Not Working

1. **Check ThemeProvider setup** in `app/layout.tsx`
2. **Verify suppressHydrationWarning** is set on html/body tags
3. **Clear browser localStorage**:
   ```javascript
   localStorage.removeItem('theme')
   ```

#### Contact Form Issues

1. **SMTP Configuration**:
   ```bash
   # Test SMTP credentials
   node test-contact-api.js
   ```

2. **Gmail App Passwords**:
   - Enable 2FA on Gmail account
   - Generate app-specific password
   - Use app password instead of regular password

3. **Formspree Alternative**:
   - Sign up at formspree.io
   - Set `FORMSPREE_ENDPOINT` in environment variables
   - Remove SMTP variables

#### Build Errors

1. **TypeScript Errors**:
   ```bash
   npm run type-check
   ```

2. **ESLint Errors**:
   ```bash
   npm run lint --fix
   ```

3. **Missing Dependencies**:
   ```bash
   npm install
   ```

#### Image Loading Issues

1. **Check file paths** (case-sensitive)
2. **Verify images exist** in `public/images/`
3. **Check Next.js image configuration** in `next.config.mjs`
4. **External images**: Ensure domains are configured

#### Performance Issues

1. **Large Bundle Size**:
   ```bash
   npm run build:analyze
   ```

2. **Slow Loading**:
   - Optimize images
   - Check for large dependencies
   - Use dynamic imports for heavy components

### Getting Help

1. **Check the documentation** in the `docs/` folder
2. **Review existing issues** on GitHub
3. **Create a new issue** with:
   - Clear description of the problem
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)
   - Error messages or screenshots

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   npm run git:feature
   # Follow the prompts to create a new branch
   ```

3. **Make your changes**
4. **Run quality checks**:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

6. **Push and create pull request**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- **TypeScript**: Use strict mode, avoid `any` types
- **Components**: Use functional components with TypeScript
- **Styling**: Use Tailwind CSS utilities, avoid custom CSS when possible
- **Imports**: Use absolute imports with `@/` prefix
- **Naming**: Use PascalCase for components, camelCase for functions

### Commit Message Format

Follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📄 License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.

## 🔗 Links

- **Live Site**: [lihsheng.space](https://lihsheng.space)
- **GitHub**: [LihSheng](https://github.com/LihSheng)
- **LinkedIn**: [lihshengng](https://www.linkedin.com/in/lihshengng/)

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Unsplash** - For placeholder images

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
