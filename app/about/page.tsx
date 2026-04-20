import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import AboutContent from './about-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.author.name}, a software developer working across enterprise web applications, automation systems, and practical AI-driven tooling.`,
  openGraph: {
    title: `About ${siteConfig.author.name}`,
    description: `Learn more about ${siteConfig.author.name}, a software developer working across enterprise web applications, automation systems, and practical AI-driven tooling.`,
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
