import { SiteConfig, NavigationItem, NavigationItemWithFlag, SocialLink } from '@/types';
import { getContactEmail, getMailtoLink } from './contact-utils';

// Navigation items for the main menu with feature flag mapping
export const navigationItems: NavigationItemWithFlag[] = [
  {
    label: 'Home',
    href: '/',
    flag: null, // Always visible
  },
  {
    label: 'About',
    href: '/about',
    flag: 'about',
  },
  {
    label: 'Projects',
    href: '/projects',
    flag: 'projects',
  },
  {
    label: 'Writing',
    href: '/writing',
    flag: 'blog',
  },
  {
    label: 'Contact',
    href: '/contact',
    flag: 'contact',
  },
];

// Legacy navigation items for backward compatibility
export const legacyNavigationItems: NavigationItem[] = navigationItems.map(({ flag, ...item }) => item);

// Social media links
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/LihSheng',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lihshengng/',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: getMailtoLink(),
    icon: 'mail',
  },
];

// Main site configuration
export const siteConfig: SiteConfig = {
  name: 'Ng Lih Sheng',
  title: 'Ng Lih Sheng - Full Stack Developer',
  description: 'Results-oriented Software Developer with 3+ years of experience delivering robust web applications. Specializing in TypeScript, React, Next.js, and Laravel.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lihsheng.space',
  author: {
    name: 'Ng Lih Sheng',
    email: getContactEmail(),
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K',
    bio: 'Results-oriented Software Developer with 3+ years of experience delivering robust web applications. Adept at creating clean, scalable code using TypeScript, Laravel, and AWS. A committed team player with a passion for driving innovation and enhancing user experience.',
    social: {
      github: 'https://github.com/LihSheng',
      linkedin: 'https://www.linkedin.com/in/lihshengng/',
    },
  },
  navigation: legacyNavigationItems,
  analytics: {
    provider: 'plausible',
    siteId: process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID || '',
  },
};
