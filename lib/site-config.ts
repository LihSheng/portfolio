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
    avatar: '/images/avatar.jpg',
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
