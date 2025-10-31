# Deployment Guide

This guide covers deploying your portfolio website to Vercel with your custom domain `lihsheng.space`.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Domain**: You have `lihsheng.space` ready to configure
3. **Environment Variables**: Set up your production environment variables

## Quick Deployment

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Deploy via Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and configure build settings

### 3. Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to preview
npm run deploy:preview

# Deploy to production
npm run deploy
```

## Environment Variables Setup

In your Vercel dashboard, go to Project Settings > Environment Variables and add:

### Required Variables

```env
NEXT_PUBLIC_SITE_URL=https://lihsheng.space
```

### Contact Form (Choose one method)

**Option 1: SMTP (Gmail/Outlook)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your.email@gmail.com
```

**Option 2: Formspree**
```env
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

### Analytics (Optional)

**Plausible Analytics**
```env
NEXT_PUBLIC_ANALYTICS_SITE_ID=lihsheng.space
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=plausible.io
```

**Umami Analytics**
```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_URL=https://your-umami-instance.com
```

## Custom Domain Configuration

### 1. Add Domain in Vercel

1. Go to your project dashboard
2. Click "Settings" > "Domains"
3. Add `lihsheng.space` and `www.lihsheng.space`

### 2. Configure DNS Records

Add these DNS records in your domain registrar:

**For apex domain (lihsheng.space):**
```
Type: A
Name: @
Value: 76.76.19.19
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Alternative (if your registrar supports ALIAS/ANAME):**
```
Type: ALIAS/ANAME
Name: @
Value: cname.vercel-dns.com
```

### 3. SSL Certificate

Vercel automatically provisions SSL certificates for your custom domain. This may take a few minutes after DNS propagation.

## Build Configuration

The project uses these build settings (configured in `vercel.json`):

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Framework**: Next.js
- **Node.js Version**: 18.x (default)

## Performance Optimizations

### Headers Configuration

The `vercel.json` includes:
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Cache headers for RSS feed and sitemap
- Content-Type headers for XML files

### Redirects & Rewrites

- `/blog/*` redirects to `/writing/*` (permanent)
- `/feed` and `/feed.xml` rewrite to `/rss.xml`

## Monitoring & Analytics

### 1. Vercel Analytics

Enable in your Vercel dashboard:
1. Go to your project
2. Click "Analytics" tab
3. Enable Web Analytics

### 2. External Analytics

If using Plausible or Umami, add the script to your site by setting the environment variables listed above.

## Troubleshooting

### Build Failures

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set correctly

### Domain Issues

1. Verify DNS records are correct
2. Wait for DNS propagation (up to 48 hours)
3. Check SSL certificate status in Vercel dashboard

### Contact Form Issues

1. Verify SMTP credentials or Formspree endpoint
2. Check environment variables in production
3. Test with a simple console log first

## Deployment Checklist

- [ ] Code pushed to repository
- [ ] Environment variables configured in Vercel
- [ ] Custom domain added and DNS configured
- [ ] SSL certificate active
- [ ] Contact form tested in production
- [ ] Analytics tracking verified
- [ ] RSS feed accessible at `/rss.xml`
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] All pages loading correctly
- [ ] Mobile responsiveness verified

## Continuous Deployment

Once connected to your Git repository, Vercel will automatically:
- Deploy preview builds for pull requests
- Deploy to production when you push to main branch
- Run build checks and tests

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Custom Domain Setup](https://vercel.com/docs/concepts/projects/custom-domains)