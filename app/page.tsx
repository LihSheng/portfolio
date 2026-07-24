import { Metadata } from 'next';
import Hero from '@/components/Hero';
import { ProjectTextList } from '@/components/ProjectTextList';
import { getFeaturedProjects } from '@/lib/content';
import { FeaturedSection } from '../components/FeaturedSection';
import { getFeatureFlags } from '@/lib';
import { ProfessionalHighlightsSection } from '@/components/ProfessionalHighlightsSection';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Software Developer building enterprise web applications, automation systems, and practical AI-driven workflows with TypeScript, React, Next.js, Laravel, and AWS.',
  openGraph: {
    title: 'Ng Lih Sheng - Software Developer',
    description: 'Software Developer building enterprise web applications, automation systems, and practical AI-driven workflows with TypeScript, React, Next.js, Laravel, and AWS.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ng Lih Sheng - Software Developer',
    description: 'Software Developer building enterprise web applications, automation systems, and practical AI-driven workflows with TypeScript, React, Next.js, Laravel, and AWS.',
  },
};

export default async function Home() {
  const flags = getFeatureFlags();
  const featuredProjects = flags.projects ? await getFeaturedProjects() : [];

  return (
    <main>
      <Hero />
      <ProfessionalHighlightsSection />

      {flags.projects && featuredProjects.length > 0 && (
        <FeaturedSection
          title="Featured Projects"
          subtitle="Selected systems and products focused on practical engineering outcomes"
          viewAllHref="/projects"
          viewAllText="View All Projects"
        >
          <ProjectTextList projects={featuredProjects.slice(0, 3)} compact />
        </FeaturedSection>
      )}
    </main>
  );
}
