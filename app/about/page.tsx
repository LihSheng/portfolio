import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import AboutContent from './about-content';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.author.name}, a full stack software developer working across enterprise web applications, analytics platforms, and agentic AI systems.`,
  openGraph: {
    title: `About ${siteConfig.author.name}`,
    description: `Learn more about ${siteConfig.author.name}, a full stack software developer working across enterprise web applications, analytics platforms, and agentic AI systems.`,
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
