import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock } from 'lucide-react';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { compileMDXWithPlugins } from '@/lib/mdx';
import { Project } from '@/types';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
      publishedTime: project.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

// Get navigation data for previous/next projects
async function getProjectNavigation(currentSlug: string) {
  const projects = await getAllProjects();
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }

  // Compile MDX content
  const { content: mdxContent } = await compileMDXWithPlugins<Project>(
    project.content || ''
  );

  // Get navigation
  const navigation = await getProjectNavigation(params.slug);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h3 className="font-semibold">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Demo
                  </Link>
                )}
                {project.repoUrl && (
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    View Source
                  </Link>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-gray dark:prose-invert max-w-none">
              {mdxContent}
            </article>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      {(navigation.previous || navigation.next) && (
        <section className="py-12 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Previous Project */}
                {navigation.previous && (
                  <Link
                    href={`/projects/${navigation.previous.slug}`}
                    className="group p-6 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">Previous Project</div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {navigation.previous.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {navigation.previous.description}
                      </p>
                    </div>
                  </Link>
                )}

                {/* Next Project */}
                {navigation.next && (
                  <Link
                    href={`/projects/${navigation.next.slug}`}
                    className="group p-6 border rounded-lg hover:bg-accent transition-colors md:text-right"
                  >
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">Next Project</div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {navigation.next.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {navigation.next.description}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}