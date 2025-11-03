import { Metadata } from 'next';
import Hero from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogPostCard } from '@/components/BlogPostCard';
import { getFeaturedProjects, getRecentBlogPosts } from '@/lib/content';
import { FeaturedSection } from '../components/FeaturedSection';
import { AnimatedGrid } from '@/components/AnimatedGrid';
import { getFeatureFlags } from '@/lib';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Results-oriented Software Developer with 3+ years of experience delivering robust web applications. Specializing in TypeScript, React, Next.js, and Laravel.',
  openGraph: {
    title: 'Ng Lih Sheng - Full Stack Developer',
    description: 'Results-oriented Software Developer with 3+ years of experience delivering robust web applications. Specializing in TypeScript, React, Next.js, and Laravel.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ng Lih Sheng - Full Stack Developer',
    description: 'Results-oriented Software Developer with 3+ years of experience delivering robust web applications. Specializing in TypeScript, React, Next.js, and Laravel.',
  },
};

export default async function Home() {
  // Get feature flags
  const flags = getFeatureFlags();

  // Fetch featured content based on feature flags
  const featuredProjects = flags.projects ? await getFeaturedProjects() : [];
  const recentPosts = flags.blog ? await getRecentBlogPosts(3) : [];

  return (
    <main>
      <Hero />

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

      {/* Recent Blog Posts Section */}
      {flags.blog && recentPosts.length > 0 && (
        <FeaturedSection
          title="Latest Writing"
          subtitle="Recent thoughts on development, technology, and best practices"
          viewAllHref="/writing"
          viewAllText="View All Posts"
        >
          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                post={post}
              />
            ))}
          </AnimatedGrid>
        </FeaturedSection>
      )}
    </main>
  );
}
