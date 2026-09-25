import { Metadata } from 'next';
import { getAllProjects } from '@/lib/content';
import { ProjectsClient } from './projects-client';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I have built on the side, newest first. Most are open on GitHub.',
  openGraph: {
    title: 'Projects',
    description: 'Things I have built on the side, newest first. Most are open on GitHub.',
  },
};

interface ProjectsPageProps {
  searchParams: Promise<{
    tag?: string;
    search?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const allProjects = await getAllProjects();
  const { tag, search } = await searchParams;

  return (
    <div className="pb-20">
      <section className="flex flex-col gap-5 pt-20 pb-12">
        <h1 className="font-serif text-[44px] font-normal leading-[1.1] text-ink">
          Projects
        </h1>
        <p className="max-w-[560px] text-[17px] leading-relaxed text-body-secondary">
          Things I have built on the side, newest first. Most are open on GitHub.
        </p>
      </section>

      <ProjectsClient projects={allProjects} initialTag={tag} initialSearch={search} />
    </div>
  );
}
