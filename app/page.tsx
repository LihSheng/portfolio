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
  description: 'Full Stack Software Developer building enterprise web, analytics, LLM, and agentic AI systems with React, TypeScript, Angular, Laravel, PostgreSQL, Python, and cloud platforms.',
  openGraph: {
    title: 'Ng Lih Sheng - Full Stack Software Developer',
    description: 'Full Stack Software Developer building enterprise web, analytics, LLM, and agentic AI systems with React, TypeScript, Angular, Laravel, PostgreSQL, Python, and cloud platforms.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ng Lih Sheng - Full Stack Software Developer',
    description: 'Full Stack Software Developer building enterprise web, analytics, LLM, and agentic AI systems with React, TypeScript, Angular, Laravel, PostgreSQL, Python, and cloud platforms.',
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
