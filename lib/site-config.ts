import { SiteConfig, NavigationItem, SocialLink } from '@/types';

// Navigation items for the main menu
export const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Writing',
    href: '/writing',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

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
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter',
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'mail',
  },
];

// Main site configuration
export const siteConfig: SiteConfig = {
  name: 'Lih Sheng',
  title: 'Lih Sheng - Full Stack Developer',
  description: 'Full-stack developer specializing in modern web technologies. Building scalable applications with React, Next.js, and TypeScript.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com',
  author: {
    name: 'Lih Sheng',
    email: 'your.email@example.com',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K',
    bio: 'Full-stack developer passionate about creating elegant solutions to complex problems. Experienced in React, Next.js, TypeScript, and Node.js.',
    social: {
      github: 'https://github.com/LihSheng',
      linkedin: 'https://www.linkedin.com/in/lihshengng/',
    },
  },
  navigation: navigationItems,
  analytics: {
    provider: 'plausible',
    siteId: process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID || '',
  },
};
