import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/content';
import { WritingClient } from './writing-client';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Technical articles, tutorials, and insights on web development, programming, and technology.',
  openGraph: {
    title: 'Writing | Developer Portfolio',
    description: 'Technical articles, tutorials, and insights on web development, programming, and technology.',
    type: 'website',
  },
};

interface WritingPageProps {
  searchParams: Promise<{
    tag?: string;
    search?: string;
  }>;
}

export default async function WritingPage({ searchParams }: WritingPageProps) {
  const allPosts = await getAllBlogPosts();
  const { tag, search } = await searchParams;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Writing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technical articles, tutorials, and insights on web development, programming, and technology.
          </p>
        </div>

        <Suspense fallback={<div className="text-center">Loading posts...</div>}>
          <WritingClient 
            posts={allPosts} 
            initialTag={tag}
            initialSearch={search}
          />
        </Suspense>
      </div>
    </div>
  );
}