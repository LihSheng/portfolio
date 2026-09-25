import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { compileMDXWithPlugins } from '@/lib/mdx';
import { useMDXComponents } from '@/mdx-components';
import { siteConfig } from '@/lib/site-config';
import { Project } from '@/types';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
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
    },
    twitter: {
      card: 'summary',
      title: project.title,
      description: project.description,
    },
  };
}

// Get navigation data for previous/next projects
async function getProjectNavigation(currentSlug: string) {
  const projects = await getAllProjects();
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);

  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next:
      currentIndex >= 0 && currentIndex < projects.length - 1
        ? projects[currentIndex + 1]
        : null,
  };
}

function MetaRow({
  label,
  children,
  bordered = false,
}: {
  label: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-3 text-sm leading-relaxed ${
        bordered ? 'border-t border-hairline' : ''
      }`}
    >
      <span className="text-muted">{label}</span>
      <span className="text-ink">{children}</span>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Compile MDX content. useMDXComponents is a Next.js naming convention, not a
  // React hook, so it's safe to call here despite the "use" prefix.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mdxComponents = useMDXComponents({});
  const { content: mdxContent } = await compileMDXWithPlugins<Project>(
    project.content || '',
    mdxComponents
  );

  // Get navigation
  const navigation = await getProjectNavigation(slug);
  const year = project.date ? new Date(project.date).getFullYear() : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
    programmingLanguage: project.techStack,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    dateCreated: project.date,
    url: `${siteConfig.url}/projects/${project.slug}`,
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="flex flex-col gap-5 pt-16 pb-10">
        <Link
          href="/projects"
          className="self-start font-mono text-xs uppercase tracking-[0.08em] text-muted no-underline"
        >
          Projects
        </Link>
        <h1 className="font-serif text-[48px] font-normal leading-[1.1] text-ink">
          {project.title}
        </h1>
        <p className="max-w-[600px] text-[19px] leading-relaxed text-body-secondary">
          {project.description}
        </p>
      </section>

      {/* Meta */}
      <section className="grid grid-cols-2 gap-x-8 border-t border-b border-hairline">
        <MetaRow label="Year">
          <span className="font-mono text-[13px]">{year ?? '—'}</span>
        </MetaRow>
        <MetaRow label="Role">Solo, design and build</MetaRow>
        <MetaRow label="Stack" bordered>
          {project.techStack.join(', ')}
        </MetaRow>
        <MetaRow label="Links" bordered>
          {project.demoUrl || project.repoUrl ? (
            <span className="flex gap-4">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Live site
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              )}
            </span>
          ) : (
            <span className="text-muted">Private repository</span>
          )}
        </MetaRow>
      </section>

      {/* Screenshot */}
      {project.screenshot && (
        <div className="relative mt-10 aspect-[1360/800] w-full border border-hairline bg-screenshot-fill">
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <article className="prose prose-neutral mt-14 max-w-none dark:prose-invert">
        {mdxContent}
      </article>

      {/* Project Navigation */}
      {(navigation.previous || navigation.next) && (
        <section className="mt-16 flex justify-between border-t border-hairline pt-16 text-[15px]">
          <span>
            {navigation.previous ? (
              <Link href={`/projects/${navigation.previous.slug}`}>
                Previous: {navigation.previous.title}
              </Link>
            ) : (
              <Link href="/projects" className="text-muted">
                All projects
              </Link>
            )}
          </span>
          <span>
            {navigation.next && (
              <Link href={`/projects/${navigation.next.slug}`}>
                Next: {navigation.next.title}
              </Link>
            )}
          </span>
        </section>
      )}
    </div>
  );
}
