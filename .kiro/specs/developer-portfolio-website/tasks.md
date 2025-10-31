# Implementation Plan

- [x] 1. Initialize Next.js project with TypeScript and core dependencies
  - Run create-next-app with TypeScript and App Router
  - Install Tailwind CSS, Framer Motion, next-themes, and core UI libraries
  - Configure TypeScript with strict mode
  - Set up ESLint and Prettier configurations
  - _Requirements: 1.1, 11.1-11.5_

- [x] 2. Configure Tailwind CSS and design system
  - Set up Tailwind config with custom theme colors and dark mode
  - Install and configure @tailwindcss/typography plugin
  - Create CSS variables for theme colors in globals.css
  - Configure font families (system fonts and code fonts)
  - _Requirements: 8.1-8.5, 11.1-11.5_

- [x] 3. Create site configuration and type definitions
  - Create lib/site-config.ts with site metadata and author info
  - Define TypeScript interfaces for Project, BlogPost, and SiteConfig in types/index.ts
  - Create constants for navigation items and social links
  - _Requirements: 1.1, 9.1-9.6_

- [x] 4. Implement root layout with theme provider
  - Create app/layout.tsx with metadata and ThemeProvider
  - Add global fonts and analytics scripts
  - Implement StructuredData component for Person schema
  - Configure viewport and manifest metadata
  - _Requirements: 8.1-8.5, 9.1-9.6, 12.2_

- [x] 5. Build navigation component with mobile support
  - Create components/Navigation.tsx with desktop horizontal nav
  - Implement mobile hamburger menu with animation
  - Add active route highlighting using usePathname
  - Integrate ThemeToggle button in navigation
  - Make navigation responsive with Tailwind breakpoints
  - _Requirements: 1.1-1.5, 8.2_

- [x] 6. Create ThemeToggle component





  - Build components/ThemeToggle.tsx using next-themes
  - Add sun/moon icon toggle with smooth transition
  - Implement theme persistence in localStorage
  - Handle system theme detection
  - Add animation for theme switch
  - _Requirements: 8.1-8.5_

- [x] 7. Build Footer component





  - Create components/Footer.tsx with social links
  - Add copyright info and quick navigation links
  - Include RSS feed link
  - Make footer responsive
  - _Requirements: 1.1, 10.1_

- [-] 8. Set up MDX configuration and content utilities
  - Install and configure @next/mdx with remark and rehype plugins
  - Add remarkGfm, rehypePrism, rehypeSlug, and rehypeAutolinkHeadings
  - Create lib/mdx.ts with MDX parsing utilities
  - Implement reading time calculation function
  - Create excerpt extraction utility
  - _Requirements: 6.3, 13.1-13.5_

- [x] 9. Create content management utilities
  - Implement lib/content.ts with getAllProjects function
  - Add getProjectBySlug and getFeaturedProjects functions
  - Implement getAllBlogPosts and getBlogPostBySlug functions
  - Add getRecentBlogPosts function with limit parameter
  - Create content directory structure (content/projects, content/blog)
  - _Requirements: 13.1-13.5_

- [x] 10. Build Hero section for homepage
  - Create components/Hero.tsx with name, tagline, and CTA
  - Implement Framer Motion entrance animations
  - Add responsive layout for mobile/desktop
  - Include call-to-action button linking to projects or contact
  - _Requirements: 2.1-2.5_

- [x] 11. Create ProjectCard component


  - Build components/ProjectCard.tsx with image, title, description, and tags
  - Add hover animations with Framer Motion
  - Include links to demo and repository
  - Make card responsive with proper image aspect ratios
  - Add tech stack badges
  - _Requirements: 3.1, 3.5, 3.6_

- [ ] 12. Implement homepage with featured content
  - Create app/page.tsx with Hero section
  - Display featured projects using ProjectCard components
  - Show recent blog posts with BlogPostCard components
  - Add stagger animations for card entrance
  - Implement static generation with proper metadata
  - _Requirements: 2.1-2.5_

- [ ] 13. Build projects listing page with filtering
  - Create app/projects/page.tsx with project grid
  - Implement client-side filtering by technology tags
  - Add search functionality for project titles
  - Use searchParams for filter state
  - Animate project cards on load with Framer Motion
  - _Requirements: 3.1-3.6_

- [ ] 14. Create project detail page with MDX support
  - Implement app/projects/[slug]/page.tsx with dynamic routing
  - Add generateStaticParams for all project slugs
  - Render MDX content with syntax highlighting
  - Display project metadata, tech stack, and links
  - Add previous/next project navigation
  - Implement generateMetadata for SEO
  - _Requirements: 4.1-4.5, 9.1-9.6_

- [ ] 15. Create sample project MDX files
  - Add 3-4 sample projects in content/projects/
  - Include frontmatter with title, date, tags, images, and links
  - Write project descriptions with challenges and solutions
  - Add code snippets to demonstrate syntax highlighting
  - _Requirements: 13.1-13.5_

- [ ] 16. Build BlogPostCard component
  - Create components/BlogPostCard.tsx with title, excerpt, date, and tags
  - Display reading time estimate
  - Add hover effects and animations
  - Make card responsive
  - _Requirements: 6.1, 6.4_

- [ ] 17. Implement blog listing page
  - Create app/writing/page.tsx with blog post list
  - Add filtering by tags using searchParams
  - Display posts in reverse chronological order
  - Show reading time for each post
  - Implement search functionality
  - _Requirements: 6.1, 6.5, 6.6_

- [ ] 18. Create blog post detail page with MDX
  - Implement app/writing/[slug]/page.tsx with dynamic routing
  - Add generateStaticParams for all blog post slugs
  - Render MDX content with syntax highlighting
  - Display post metadata (date, tags, reading time)
  - Add table of contents component
  - Implement generateMetadata for OpenGraph and Twitter cards
  - _Requirements: 6.2-6.4, 9.1-9.6_

- [ ] 19. Create sample blog post MDX files
  - Add 3-4 sample blog posts in content/blog/
  - Include frontmatter with title, date, excerpt, tags, and coverImage
  - Write posts with code examples to test syntax highlighting
  - Add headings for table of contents generation
  - _Requirements: 13.1-13.5_

- [ ] 20. Build About page with skills and timeline
  - Create app/about/page.tsx with introduction section
  - Implement SkillBadge component for skills matrix
  - Create Timeline component for experience and education
  - Add professional photo/avatar
  - Make layout responsive
  - Add animations for section entrance
  - _Requirements: 5.1-5.5_

- [ ] 21. Create skills and experience data files
  - Create content/data/skills.json with categorized skills
  - Create content/data/experience.json with work history and education
  - Define TypeScript interfaces for data structures
  - _Requirements: 5.2, 5.3_

- [ ] 22. Implement ContactForm component with validation
  - Create components/ContactForm.tsx with name, email, subject, and message fields
  - Add form validation using Zod schema
  - Implement client-side validation with error messages
  - Add loading and success/error states
  - Make form accessible with proper labels and ARIA attributes
  - _Requirements: 7.1-7.6_

- [ ] 23. Build Contact page
  - Create app/contact/page.tsx with ContactForm
  - Display social media links and alternative contact methods
  - Add email and LinkedIn direct links
  - Make layout responsive
  - _Requirements: 7.1, 7.6_

- [ ] 24. Create contact form API route
  - Implement app/api/contact/route.ts with POST handler
  - Validate form data using Zod schema
  - Integrate Nodemailer or Formspree for email sending
  - Add rate limiting to prevent spam
  - Return proper success/error responses
  - Handle errors gracefully
  - _Requirements: 7.2-7.5_

- [ ] 25. Implement RSS feed generation
  - Create app/rss.xml/route.ts with GET handler
  - Generate RSS XML from all published blog posts
  - Include proper metadata and formatting
  - Add cache headers for performance
  - _Requirements: 10.1-10.4_

- [ ] 26. Create sitemap generation
  - Implement app/sitemap.ts with sitemap generation
  - Include all static and dynamic routes
  - Add lastModified dates for content pages
  - _Requirements: 9.3_

- [ ] 27. Create robots.txt
  - Implement app/robots.ts with robots configuration
  - Allow all crawlers
  - Reference sitemap location
  - _Requirements: 9.4_

- [ ] 28. Add 404 and error pages
  - Create app/not-found.tsx with custom 404 page
  - Implement app/error.tsx for route-level errors
  - Add helpful navigation links
  - Make error pages visually consistent with site design
  - _Requirements: 1.5_

- [ ] 29. Implement SEO metadata for all pages
  - Add generateMetadata to all dynamic pages
  - Include OpenGraph and Twitter card metadata
  - Add structured data (JSON-LD) for relevant pages
  - Ensure canonical URLs are set correctly
  - _Requirements: 9.1-9.6_

- [ ] 30. Set up analytics integration
  - Install Plausible or Umami analytics script
  - Create components/Analytics.tsx
  - Add analytics to root layout
  - Configure analytics with environment variables
  - _Requirements: 12.2_

- [ ] 31. Optimize images and implement Next.js Image
  - Replace all img tags with Next.js Image component
  - Add blur placeholders for images
  - Configure image domains in next.config.js
  - Optimize image sizes and formats
  - _Requirements: 11.4, 12.3_

- [ ] 32. Implement animations with reduced motion support
  - Create lib/animations.ts with reusable animation variants
  - Add useReducedMotion hook
  - Apply animations to page transitions and component entrances
  - Ensure animations respect prefers-reduced-motion
  - _Requirements: 14.1-14.5_

- [ ] 33. Add accessibility improvements
  - Ensure all interactive elements have focus indicators
  - Add skip links for navigation
  - Verify semantic HTML usage
  - Add ARIA labels where needed
  - Test keyboard navigation
  - _Requirements: 11.5, 14.4_

- [ ] 34. Configure environment variables
  - Create .env.local with SMTP credentials and API keys
  - Add .env.example with placeholder values
  - Configure Vercel environment variables
  - Document required environment variables in README
  - _Requirements: 7.3, 12.2, 15.4_

- [ ] 35. Set up Vercel deployment configuration
  - Create vercel.json with build and deployment settings
  - Configure build command and output directory
  - Set up preview deployments for pull requests
  - Configure custom domain (if applicable)
  - _Requirements: 15.1-15.5_

- [ ] 36. Create comprehensive README
  - Document project setup and installation steps
  - Add instructions for adding new blog posts and projects
  - Include environment variable documentation
  - Add deployment instructions
  - Document content management workflow
  - _Requirements: 13.1-13.5_

- [ ] 37. Performance optimization and testing
  - Run Lighthouse audit and address issues
  - Analyze bundle size with @next/bundle-analyzer
  - Implement code splitting for heavy components
  - Add caching headers for static assets
  - Test on multiple devices and browsers
  - _Requirements: 12.1, 12.3-12.5_

- [ ]* 38. Write unit tests for utilities
  - Test content parsing functions
  - Test reading time calculation
  - Test form validation schemas
  - Test data transformation functions
  - _Requirements: 8.3, 13.4_

- [ ]* 39. Write component tests
  - Test ContactForm validation and submission
  - Test ThemeToggle functionality
  - Test project and blog filtering
  - Test navigation and routing
  - _Requirements: 7.2, 8.2, 3.3, 6.5_

- [ ] 40. Final integration and deployment
  - Deploy to Vercel production
  - Verify all routes work correctly
  - Test contact form in production
  - Verify analytics tracking
  - Test RSS feed and sitemap
  - Perform final accessibility audit
  - _Requirements: 15.1-15.5_
