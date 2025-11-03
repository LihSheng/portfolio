'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '@/types';
import { shimmerPlaceholderDataUrl } from '@/lib/image-utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const projectCardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

interface FeaturedProjectsSectionProps {
  projects?: Project[];
  limit?: number;
}

export default function FeaturedProjectsSection({ projects = [], limit = 3 }: FeaturedProjectsSectionProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Limit the projects to the specified number
  const displayProjects = projects.slice(0, limit);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <motion.div
        variants={fadeInUp}
        className="mt-12 pt-8 border-t"
        style={{ borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
      >
        <div className="text-center mb-8">
          <h3
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Featured Projects
          </h3>
          <p
            className="text-sm sm:text-base"
            style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
          >
            A showcase of my recent development work
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-lg border overflow-hidden"
              style={{
                borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
                backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(249, 250, 251)'
              }}
            >
              <div
                className="aspect-video"
                style={{ backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
              />
              <div className="p-4">
                <div
                  className="h-5 rounded mb-2"
                  style={{ backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
                />
                <div
                  className="h-4 rounded mb-3 w-3/4"
                  style={{ backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
                />
                <div className="flex gap-2">
                  <div
                    className="h-6 w-16 rounded"
                    style={{ backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
                  />
                  <div
                    className="h-6 w-20 rounded"
                    style={{ backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        variants={fadeInUp}
        className="mt-12 pt-8 border-t"
        style={{ borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
      >
        <div className="text-center mb-6">
          <h3
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Featured Projects
          </h3>
          <p
            className="text-sm sm:text-base text-red-500 dark:text-red-400"
          >
            {error}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-2 text-sm font-medium rounded-lg border transition-colors duration-200"
            style={{
              borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)',
              color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
              backgroundColor: 'transparent'
            }}
          >
            View All Projects →
          </Link>
        </div>
      </motion.div>
    );
  }

  if (displayProjects.length === 0) {
    return (
      <motion.div
        variants={fadeInUp}
        className="mt-12 pt-8 border-t"
        style={{ borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
      >
        <div className="text-center mb-6">
          <h3
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Featured Projects
          </h3>
          <p
            className="text-sm sm:text-base"
            style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
          >
            No featured projects available yet. Check back soon!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="mt-12 pt-8 border-t"
      style={{ borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
    >
      <div className="text-center mb-8">
        <h3
          className="text-xl sm:text-2xl font-semibold mb-2"
          style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
        >
          Featured Projects
        </h3>
        <p
          className="text-sm sm:text-base"
          style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
        >
          A showcase of my recent development work
        </p>
      </div>
      
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8"
      >
        {displayProjects.map((project) => (
          <motion.article
            key={project.slug}
            variants={projectCardVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative rounded-lg border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            style={{
              borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
              backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(249, 250, 251)'
            }}
          >
            {/* Project Image */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                placeholder="blur"
                blurDataURL={shimmerPlaceholderDataUrl}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay with links - appears on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                    Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={14} />
                    Code
                  </a>
                )}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h4
                className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
              >
                {project.title}
              </h4>
              
              <p
                className="text-sm mb-3 line-clamp-2"
                style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
              >
                {project.description}
              </p>
              
              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md font-medium"
                      style={{
                        backgroundColor: isDarkMode ? 'rgb(59, 130, 246, 0.2)' : 'rgb(219, 234, 254)',
                        color: isDarkMode ? 'rgb(147, 197, 253)' : 'rgb(29, 78, 216)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span
                      className="px-2 py-1 text-xs rounded-md font-medium"
                      style={{
                        backgroundColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)',
                        color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)'
                      }}
                    >
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <Link
              href={`/projects/${project.slug}`}
              className="absolute inset-0 z-10"
              aria-label={`View ${project.title} project details`}
            />
          </motion.article>
        ))}
      </motion.div>
      
      <div className="flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-lg border transition-colors duration-200"
          style={{
            borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)',
            color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            if (isDarkMode) {
              e.currentTarget.style.backgroundColor = 'rgb(55, 65, 81)';
              e.currentTarget.style.borderColor = 'rgb(107, 114, 128)';
              e.currentTarget.style.color = 'white';
            } else {
              e.currentTarget.style.backgroundColor = 'rgb(243, 244, 246)';
              e.currentTarget.style.borderColor = 'rgb(156, 163, 175)';
              e.currentTarget.style.color = 'rgb(55, 65, 81)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)';
            e.currentTarget.style.color = isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)';
          }}
        >
          View All Projects
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}