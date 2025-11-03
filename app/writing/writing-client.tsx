'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { BlogPost } from '@/types';
import { BlogPostCard } from '@/components/BlogPostCard';

interface WritingClientProps {
  posts: BlogPost[];
  initialTag?: string;
  initialSearch?: string;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function WritingClient({ posts, initialTag, initialSearch }: WritingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedTag, setSelectedTag] = useState(initialTag || '');
  const [showFilters, setShowFilters] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode detection
  useEffect(() => {
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

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Update URL with search params
  const updateSearchParams = (search: string, tag: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (tag) params.set('tag', tag);
    
    const queryString = params.toString();
    const newUrl = queryString ? `/writing?${queryString}` : '/writing';
    router.push(newUrl, { scroll: false });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateSearchParams(value, selectedTag);
  };

  const handleTagSelect = (tag: string) => {
    const newTag = tag === selectedTag ? '' : tag;
    setSelectedTag(newTag);
    updateSearchParams(searchQuery, newTag);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
    router.push('/writing', { scroll: false });
  };

  const hasActiveFilters = searchQuery || selectedTag;

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div 
        className="rounded-lg shadow-sm p-6"
        style={{
          backgroundColor: isDarkMode ? 'rgb(17, 24, 39)' : 'white',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
        }}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              style={{
                backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'white',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(209, 213, 219)',
                color: isDarkMode ? 'white' : 'rgb(17, 24, 39)'
              }}
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'white',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(209, 213, 219)',
              color: isDarkMode ? 'white' : 'rgb(55, 65, 81)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(249, 250, 251)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? 'rgb(55, 65, 81)' : 'white';
            }}
          >
            <Filter className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 transition-colors"
              style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isDarkMode ? 'white' : 'rgb(17, 24, 39)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)';
              }}
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Tag Filters */}
        <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
                style={{
                  backgroundColor: selectedTag === tag 
                    ? '#2563eb' 
                    : (isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)'),
                  color: selectedTag === tag 
                    ? 'white' 
                    : (isDarkMode ? 'white' : 'rgb(55, 65, 81)')
                }}
                onMouseEnter={(e) => {
                  if (selectedTag !== tag) {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTag !== tag) {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)';
                  }
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)' }}>
          {filteredPosts.length === posts.length 
            ? `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`
            : `${filteredPosts.length} of ${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`
          }
        </p>
        
        {hasActiveFilters && (
          <div 
            className="flex items-center gap-2 text-sm"
            style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
          >
            <Filter className="w-4 h-4" />
            Filtered
          </div>
        )}
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPosts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <Search 
              className="w-12 h-12 mx-auto" 
              style={{ color: isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)' }}
            />
          </div>
          <h3 
            className="text-lg font-medium mb-2"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            No posts found
          </h3>
          <p 
            className="mb-4"
            style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)' }}
          >
            {hasActiveFilters 
              ? "Try adjusting your search or filters to find what you're looking for."
              : "No blog posts have been published yet."
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}