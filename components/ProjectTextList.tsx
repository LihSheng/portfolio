import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';

interface ProjectTextListProps {
  projects: Project[];
  compact?: boolean;
}

export function ProjectTextList({ projects, compact = false }: ProjectTextListProps) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          className={`group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5 ${
            compact ? 'py-6' : 'py-8 md:py-10'
          }`}
        >
          <span className="pt-1 font-mono text-xs tracking-widest text-gray-400 dark:text-gray-500">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-gray-950 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
              >
                <h3 className={`${compact ? 'text-xl' : 'text-2xl md:text-3xl'} font-semibold tracking-tight`}>
                  {project.title}
                </h3>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                  className="shrink-0 text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>

            <p
              className={`mt-3 max-w-3xl leading-relaxed text-gray-600 dark:text-gray-300 ${
                compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
              }`}
            >
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {project.techStack.length > 0 && (
                <span className="text-gray-500 dark:text-gray-400">
                  {project.techStack.slice(0, 3).join(' · ')}
                </span>
              )}

              <Link
                href={`/projects/${project.slug}`}
                className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read case study
              </Link>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-gray-600 transition-colors hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
                >
                  Live demo
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
