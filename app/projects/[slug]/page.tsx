import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, ExternalLink, Github } from 'lucide-react';
import { shimmerPlaceholderDataUrl } from '@/lib/image-utils';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { compileMDXWithPlugins } from '@/lib/mdx';
import { Project } from '@/types';

export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
      type: 'article',
      publishedTime: project.date,
      ...(project.image
        ? {
            images: [
              {
                url: project.image,
                width: 1200,
                height: 630,
                alt: project.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: project.image ? 'summary_large_image' : 'summary',
      title: project.title,
      description: project.description,
      ...(project.image ? { images: [project.image] } : {}),
    },
  };
}

async function getProjectNavigation(currentSlug: string) {
  const projects = await getAllProjects();
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);

  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { content: mdxContent } = await compileMDXWithPlugins<Project>(project.content || '');
  const navigation = await getProjectNavigation(slug);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </header>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={
              project.image
                ? 'mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2'
                : 'mx-auto max-w-4xl'
            }
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{project.title}</h1>
                <p className="text-xl leading-relaxed text-muted-foreground">{project.description}</p>
              </div>

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

              {project.techStack.length > 0 && (
                <div className="space-y-3">
                  <h2 className="font-semibold">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.tags.length > 0 && (
                <div className="space-y-3">
                  <h2 className="font-semibold">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.demoUrl || project.repoUrl) && (
                <div className="flex flex-wrap gap-4 pt-4">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-accent"
                    >
                      <Github className="h-4 w-4" />
                      View Source
                    </Link>
                  )}
                </div>
              )}
            </div>

            {project.image && (
              <div className="relative">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL={shimmerPlaceholderDataUrl}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-gray mx-auto max-w-5xl dark:prose-invert">{mdxContent}</article>
        </div>
      </section>

      {(navigation.previous || navigation.next) && (
        <section className="border-t py-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
              {navigation.previous && (
                <Link
                  href={`/projects/${navigation.previous.slug}`}
                  className="group rounded-lg border p-6 transition-colors hover:bg-accent"
                >
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">Previous Project</div>
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {navigation.previous.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {navigation.previous.description}
                    </p>
                  </div>
                </Link>
              )}

              {navigation.next && (
                <Link
                  href={`/projects/${navigation.next.slug}`}
                  className="group rounded-lg border p-6 transition-colors hover:bg-accent md:text-right"
                >
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">Next Project</div>
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {navigation.next.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{navigation.next.description}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
