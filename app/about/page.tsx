import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import AboutContent from './about-content';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.author.name}, a passionate full-stack developer with expertise in modern web technologies.`,
  openGraph: {
    title: `About ${siteConfig.author.name}`,
    description: `Learn more about ${siteConfig.author.name}, a passionate full-stack developer with expertise in modern web technologies.`,
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}