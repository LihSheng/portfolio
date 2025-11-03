import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import AboutContent from './about-content';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.author.name}, a results-oriented software developer with 3+ years of experience in TypeScript, Laravel, and AWS.`,
  openGraph: {
    title: `About ${siteConfig.author.name}`,
    description: `Learn more about ${siteConfig.author.name}, a results-oriented software developer with 3+ years of experience in TypeScript, Laravel, and AWS.`,
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}