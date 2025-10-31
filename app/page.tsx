import { Metadata } from 'next';
import Hero from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogPostCard } from '@/components/BlogPostCard';
import { getFeaturedProjects, getRecentBlogPosts } from '@/lib/content';
import { FeaturedSection } from '../components/FeaturedSection';
import { AnimatedGrid } from '@/components/AnimatedGrid';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Full-stack developer specializing in modern web technologies. Building scalable applications with React, Next.js, and TypeScript.',
  openGraph: {
    title: 'Developer Portfolio - Full-stack Developer',
    description: 'Full-stack developer specializing in modern web technologies. Building scalable applications with React, Next.js, and TypeScript.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Portfolio - Full-stack Developer',
    description: 'Full-stack developer specializing in modern web technologies. Building scalable applications with React, Next.js, and TypeScript.',
  },
};

export default async function Home() {
  // Fetch featured content
  const [featuredProjects, recentPosts] = await Promise.all([
    getFeaturedProjects(),
    getRecentBlogPosts(3)
  ]);

  return (
    <main>
      <Hero />
      
      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
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
      {recentPosts.length > 0 && (
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
