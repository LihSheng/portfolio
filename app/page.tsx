import { Metadata } from 'next';
import Hero from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { getFeaturedProjects } from '@/lib/content';
import { FeaturedSection } from '../components/FeaturedSection';
import { AnimatedGrid } from '@/components/AnimatedGrid';
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
  // Get feature flags
  const flags = getFeatureFlags();

  // Fetch featured content based on feature flags
  const featuredProjects = flags.projects ? await getFeaturedProjects() : [];

  return (
    <main>
      <Hero />
      <ProfessionalHighlightsSection />

      {/* Featured Projects Section */}
      {flags.projects && featuredProjects.length > 0 && (
        <FeaturedSection
          title="Featured Projects"
          subtitle="A selection of my recent work and side projects"
          viewAllHref="/projects"
          viewAllText="View All Projects"
        >
          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                priority={index === 0}
              />
            ))}
          </AnimatedGrid>
        </FeaturedSection>
      )}
    </main>
  );
}
