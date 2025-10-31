'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';
import { Project } from '@/types';

interface ProjectsClientProps {
  projects: Project[];
  initialTag?: string;
  initialSearch?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function ProjectsClient({ projects, initialTag, initialSearch }: ProjectsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedTag, setSelectedTag] = useState<string>(initialTag || '');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tagSet.add(tag));
      project.techStack.forEach(tech => tagSet.add(tech));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  // Filter projects based on search and tag
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === '' || 
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
    setSelectedTag(selectedTag === tag ? '' : tag);
  };

  const clearFilters = () => {
    setSelectedTag('');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedTag || searchQuery;

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle (Mobile) */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                {(selectedTag ? 1 : 0) + (searchQuery ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>

        {/* Tag Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
        </p>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.slug} 
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ProjectCard 
                  project={project} 
                  priority={index < 3} // Prioritize first 3 images
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}