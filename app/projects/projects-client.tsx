'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectsClientProps {
  projects: Project[];
  initialTag?: string;
  initialSearch?: string;
}

export function ProjectsClient({ projects, initialTag, initialSearch }: ProjectsClientProps) {
  const router = useRouter();

  const [selectedTag, setSelectedTag] = useState<string>(initialTag || '');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tagSet.add(tag));
      project.techStack.forEach((tech) => tagSet.add(tech));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  // Filter projects based on search and tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === '' ||
        project.tags.includes(selectedTag) ||
        project.techStack.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set('search', searchQuery);
    }

    if (selectedTag) {
      params.set('tag', selectedTag);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/projects?${queryString}` : '/projects';

    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedTag, router]);

  const handleTagSelect = (tag: string) => {
    setSelectedTag((current) => (current === tag ? '' : tag));
  };

  return (
    <div>
      {/* Tag filters */}
      <div className="flex flex-wrap items-baseline gap-x-[22px] gap-y-1.5 pt-2 text-sm">
        <button
          type="button"
          onClick={() => setSelectedTag('')}
          className={
            selectedTag === ''
              ? 'text-ink underline underline-offset-4'
              : 'text-muted'
          }
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagSelect(tag)}
            className={
              selectedTag === tag
                ? 'text-ink underline underline-offset-4'
                : 'text-muted'
            }
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search projects…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border-0 border-b border-hairline bg-transparent pb-2 text-[15px] text-ink placeholder:text-faint focus:border-ink focus:outline-none"
        />
      </div>

      {/* Project rows */}
      <div className="flex flex-col">
        {filteredProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="grid grid-cols-[96px_minmax(0,1fr)] gap-6 border-t border-hairline py-[22px] no-underline"
          >
            <span className="pt-[3px] font-mono text-[13px] text-muted">
              {new Date(project.date).getFullYear()}
            </span>
            <span className="flex flex-col gap-1.5">
              <span className="text-[17px] font-medium text-ink">{project.title}</span>
              <span className="text-[15px] leading-relaxed text-muted">
                {project.description}
              </span>
              {project.techStack.length > 0 && (
                <span className="pt-0.5 font-mono text-xs text-faint">
                  {project.techStack.join(' · ')}
                </span>
              )}
            </span>
          </Link>
        ))}

        {filteredProjects.length === 0 && (
          <p className="border-t border-hairline py-10 text-[15px] text-muted">
            No projects match your search.
          </p>
        )}
      </div>
    </div>
  );
}
