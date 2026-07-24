import { Metadata } from 'next';
import { ProjectTextList } from '@/components/ProjectTextList';
import { getAllProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected products, engineering systems, and practical experiments I have designed and built.',
  openGraph: {
    title: 'Projects | Ng Lih Sheng',
    description: 'Selected products, engineering systems, and practical experiments I have designed and built.',
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <header className="mb-14 max-w-3xl sm:mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-5xl">
            Projects
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            A focused selection of products and engineering systems I have designed, built, and operated.
          </p>
        </header>

        <section aria-labelledby="selected-work-heading">
          <h2
            id="selected-work-heading"
            className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400"
          >
            Selected work
          </h2>
          <ProjectTextList projects={projects} />
        </section>
      </div>
    </main>
  );
}
