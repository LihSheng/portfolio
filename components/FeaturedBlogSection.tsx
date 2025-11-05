'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';
import { getRecentBlogPosts } from '@/lib/content';
import { useMotionVariants, useMotionTransition } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, staggerContainer, reducedMotionVariants, defaultTransition } from '@/lib/animations';

interface FeaturedBlogSectionProps {
  limit?: number;
}

export default function FeaturedBlogSection({ limit = 3 }: FeaturedBlogSectionProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const recentPosts = await getRecentBlogPosts(limit);
        setPosts(recentPosts);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, [limit]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const sectionVariants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);
  const containerVariants = useMotionVariants(staggerContainer, reducedMotionVariants.fadeIn);
  const itemVariants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);
  const transition = useMotionTransition(defaultTransition);

  if (loading) {
    return (
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        transition={transition}
        className="mt-12 pt-8 border-t"
        style={{ borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
      >
        <div className="text-center mb-8">
          <h3
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Latest Writing
          </h3>
          <p
            className="text-sm sm:text-base"
            style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
          >
            Thoughts on development, technology, and more
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-lg border p-4"
              style={{
                borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
                backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(249, 250, 251)'
              }}
            >
              <div
                className="h-4 rounded mb-2"
                style={{ backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
              />
              <div
                className="h-3 rounded mb-4 w-3/4"
                style={{ backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
              />
              <div
                className="h-3 rounded w-1/2"
                style={{ backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        transition={transition}
        className="mt-12 pt-8 border-t"
        style={{ borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
      >
        <div className="text-center mb-6">
          <h3
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Latest Writing
          </h3>
          <p
            className="text-sm sm:text-base text-red-500 dark:text-red-400"
          >
            {error}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link
            href="/writing"
            className="inline-flex items-center px-6 py-2 text-sm font-medium rounded-lg border transition-colors duration-200"
            style={{
              borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)',
              color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
              backgroundColor: 'transparent'
            }}
          >
            View All Posts →
          </Link>
        </div>
      </motion.div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        transition={transition}
        className="mt-12 pt-8 border-t"
        style={{ borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
      >
        <div className="text-center mb-6">
          <h3
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Latest Writing
          </h3>
          <p
            className="text-sm sm:text-base"
            style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
          >
            No blog posts available yet. Check back soon!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      transition={transition}
      className="mt-12 pt-8 border-t"
      style={{ borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)' }}
    >
      <div className="text-center mb-8">
        <h3
          className="text-xl sm:text-2xl font-semibold mb-2"
          style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
        >
          Latest Writing
        </h3>
        <p
          className="text-sm sm:text-base"
          style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
        >
          Thoughts on development, technology, and more
        </p>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8"
      >
        {posts.map((post) => (
          <motion.article
            key={post.slug}
            variants={itemVariants}
            className="group relative rounded-lg border p-4 hover:shadow-md transition-all duration-200"
            style={{
              borderColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
              backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(249, 250, 251)'
            }}
          >
            <h4
              className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
              style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
            >
              {post.title}
            </h4>
            
            {post.excerpt && (
              <p
                className="text-sm mb-3 line-clamp-2"
                style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
              >
                {post.excerpt}
              </p>
            )}
            
            <div
              className="flex items-center gap-4 text-xs mb-3"
              style={{ color: isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)' }}
            >
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{post.readingTime} min</span>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md"
                    style={{
                      backgroundColor: isDarkMode ? 'rgb(59, 130, 246, 0.2)' : 'rgb(219, 234, 254)',
                      color: isDarkMode ? 'rgb(147, 197, 253)' : 'rgb(29, 78, 216)'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <Link
              href={`/writing/${post.slug}`}
              className="absolute inset-0 z-10"
              aria-label={`Read ${post.title}`}
            />
          </motion.article>
        ))}
      </motion.div>
      
      <div className="flex justify-center">
        <Link
          href="/writing"
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
          View All Posts
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}