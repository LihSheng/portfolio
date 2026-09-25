import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Instrument_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { FeatureFlagProvider } from '@/components/FeatureFlagProvider';
import { Analytics } from '@/components/Analytics';
import { WebMCPProvider } from '@/components/WebMCPProvider';
import { StructuredData } from '@/components/StructuredData';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageColumn } from '@/components/PageColumn';
import EasterEggs from '@/components/easter-eggs/EasterEggs';
import { siteConfig } from '@/lib/site-config';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'developer',
    'portfolio',
    'full stack',
    'web development',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${geistMono.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased" suppressHydrationWarning>
        <FeatureFlagProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <main className="flex-1">
              <PageColumn>{children}</PageColumn>
            </main>
            <Footer />
            <EasterEggs />
          </ThemeProvider>
        </FeatureFlagProvider>
        <WebMCPProvider />
        <Analytics />
      </body>
    </html>
  );
}
