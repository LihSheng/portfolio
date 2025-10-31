import { Suspense } from 'react';
import { getAllProjects } from '@/lib/content';
import { ProjectsClient } from './projects-client';
import { Project } from '@/types';

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my development projects, featuring web applications, tools, and experiments built with modern technologies.',
  openGraph: {
    title: 'Projects | Developer Portfolio',
    description: 'A showcase of my development projects, featuring web applications, tools, and experiments built with modern technologies.',
  },
};

interface ProjectsPageProps {
  searchParams: { 
    tag?: string;
    search?: string;
  };
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const allProjects = await getAllProjects();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my development projects, featuring web applications, tools, and experiments 
            built with modern technologies.
          </p>
        </div>

        {/* Projects Grid with Client-side Filtering */}
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsClient 
            projects={allProjects} 
            initialTag={searchParams.tag}
            initialSearch={searchParams.search}
          />
        </Suspense>
      </div>
    </div>
  );
}

function ProjectsLoading() {
  return (
    <div className="space-y-8">
      {/* Filter skeleton */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4" />
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}