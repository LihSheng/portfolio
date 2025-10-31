# Email Configuration Guide

This guide explains how email addresses are managed throughout the portfolio website.

## Environment Variables

The website uses environment variables to manage email addresses consistently:

### Required Variables

```env
# Public email address (used in client-side components)
NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com

# Server-side email address (used for SMTP and API routes)
CONTACT_EMAIL=your.email@example.com
```

**Note:** Both variables should typically have the same value. The `NEXT_PUBLIC_` prefix makes the email available to client-side components.

## Usage Throughout the Site

### 1. Site Configuration (`lib/site-config.ts`)

The main site configuration automatically uses the environment variable:

```typescript
import { getContactEmail, getMailtoLink } from './contact-utils';

export const siteConfig = {
  author: {
    email: getContactEmail(), // Uses NEXT_PUBLIC_CONTACT_EMAIL
  },
  // ...
};

export const socialLinks = [
  {
    name: 'Email',
    url: getMailtoLink(), // Creates mailto: link
    icon: 'mail',
  },
  // ...
];
```

### 2. Contact Page (`app/contact/page.tsx`)

The contact page displays the email and creates mailto links:

```typescript
// Email display
<a href={`mailto:${siteConfig.author.email}`}>
  {siteConfig.author.email}
</a>
```

### 3. About Page (`app/about/about-content.tsx`)

The about page includes a "Send Email" button:

```typescript
<a href={`mailto:${siteConfig.author.email}`}>
  Send Email
</a>
```

### 4. Footer Component (`components/Footer.tsx`)

The footer includes social links with email:

```typescript
// Automatically includes email from socialLinks configuration
{socialLinks.map((link) => (
  <a href={link.url}>{link.name}</a>
))}
```

## Utility Functions (`lib/contact-utils.ts`)

### `getContactEmail()`

Returns the contact email from environment variables with fallback:

```typescript
const email = getContactEmail();
// Returns: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'your.email@example.com'
```

### `getMailtoLink(subject?, body?)`

Creates a mailto link with optional subject and body:

```typescript
// Basic mailto link
const basicLink = getMailtoLink();
// Returns: "mailto:your.email@example.com"

// With subject and body
const detailedLink = getMailtoLink(
  "Portfolio Inquiry", 
  "Hi, I'd like to discuss a project..."
);
// Returns: "mailto:your.email@example.com?subject=Portfolio%20Inquiry&body=Hi%2C%20I'd%20like..."
```

### `isContactEmailConfigured()`

Checks if a real email is configured (not the default):

```typescript
if (isContactEmailConfigured()) {
  // Show email contact options
} else {
  // Show only contact form
}
```

## Server-Side Email (API Routes)

For server-side functionality like the contact form API (`app/api/contact/route.ts`), use the `CONTACT_EMAIL` environment variable:

```typescript
// In API routes or server components
const contactEmail = process.env.CONTACT_EMAIL;
```

## Development Setup

1. **Local Development** (`.env.local`):
```env
NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com
CONTACT_EMAIL=your.email@example.com
```

2. **Production** (Vercel Environment Variables):
```env
NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com
CONTACT_EMAIL=your.email@example.com
```

## Benefits of This Approach

1. **Centralized Configuration**: Change email in one place (environment variables)
2. **Environment-Specific**: Different emails for development/staging/production
3. **Type Safety**: Utility functions provide consistent interfaces
4. **Fallback Handling**: Graceful degradation if email not configured
5. **Security**: Server-side email separate from client-side display

## Migration from Hardcoded Emails

If you have hardcoded email addresses in your components:

```typescript
// ❌ Before (hardcoded)
<a href="mailto:hardcoded@example.com">Contact</a>

// ✅ After (environment variable)
import { siteConfig } from '@/lib/site-config';
<a href={`mailto:${siteConfig.author.email}`}>Contact</a>

// ✅ Or using utility function
import { getMailtoLink } from '@/lib/contact-utils';
<a href={getMailtoLink()}>Contact</a>
```

## Testing

To test email configuration:

1. **Check Environment Variables**:
```bash
npm run pre-deploy
```

2. **Verify Email Display**:
   - Visit `/contact` page
   - Check footer social links
   - Visit `/about` page and check "Send Email" button

3. **Test Mailto Links**:
   - Click email links to ensure they open email client
   - Verify correct email address is populated