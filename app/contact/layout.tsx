import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me for opportunities, collaborations, or just to say hello.',
  openGraph: {
    title: 'Contact - ' + siteConfig.name,
    description: 'Get in touch with me for opportunities, collaborations, or just to say hello.',
    url: siteConfig.url + '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}